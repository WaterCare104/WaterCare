var unityInstance = null;

function initializeUnity() {
    var canvas = document.querySelector("#unity-canvas");
    var loadingBar = document.querySelector("#unity-loading-bar");
    var progressBarFull = document.querySelector("#unity-progress-bar-full");
    var fullscreenButton = document.querySelector("#unity-fullscreen-button");

    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/water.loader.js";
    var config = {
        dataUrl: buildUrl + "/water.data",
        frameworkUrl: buildUrl + "/water.framework.js",
        codeUrl: buildUrl + "/water.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Central Interceptor",
        productVersion: "1.0",
        showBanner: unityShowBanner,
    };

    loadingBar.style.display = "block";

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            progressBarFull.style.width = 100 * progress + "%";
        }).then((instance) => {
            unityInstance = instance;
            loadingBar.style.display = "none";
            fullscreenButton.onclick = () => {
                unityInstance.SetFullscreen(1);
            };
        }).catch((message) => {
            alert(message);
        });
    };
    document.body.appendChild(script);
}

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        // If the device is in portrait mode
        document.getElementById('orientation-warning').style.display = 'block';
        if (unityInstance !== null) {
            unityInstance.Quit();
            unityInstance = null;
        }
    } else {
        // If the device is in landscape mode
        document.getElementById('orientation-warning').style.display = 'none';
        if (unityInstance === null) {
            initializeUnity();
        }
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);
