import OnirixEmbedSDK from "https://cdn.jsdelivr.net/npm/@onirix/embed-sdk@1.18.0/+esm";
import OxScreenCaptureLib from "https://cdn.jsdelivr.net/npm/@onirix/screen-capture@2.0.0/+esm";

const embedSDK = new OnirixEmbedSDK();

embedSDK.connect();

const oxScreenCapture = new OxScreenCaptureLib(embedSDK);

/** 
 * We assign each button to an action of the library
 */
document.getElementById("my-capture-preview").addEventListener("click", () => {
    oxScreenCapture.capturePhotoPreview();
});

document.getElementById("my-capture").addEventListener("click", () => {
    oxScreenCapture.capturePhoto();
});

document.getElementById("my-video-start").addEventListener("click", () => {
    oxScreenCapture.captureVideoStart();
});

document.getElementById("my-video-stop").addEventListener("click", () => {
    oxScreenCapture.captureVideoEnd();
});


/** 
 * We hide the controls and the preview component
 */
const removeScreenCaptureUI = () => {
    oxScreenCapture.removePreview();
    document.getElementById("my-custom-controls").classList.remove("my-custom-controls--show")
}

// Show our custom controls when scene is loaded
embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
    document.getElementById("my-custom-controls").classList.add("my-custom-controls--show");
});

// Activated when marker is lost
embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOST, (params) => {
    removeScreenCaptureUI();
});

// Activated when WebXR session ends
embedSDK.subscribe(OnirixEmbedSDK.Events.SESSION_ENDED, (params) => {
    removeScreenCaptureUI();
});
