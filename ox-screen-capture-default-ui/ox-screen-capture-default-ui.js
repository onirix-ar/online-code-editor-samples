import OnirixEmbedSDK from "https://www.unpkg.com/@onirix/embed-sdk@1.14.0/dist/ox-embed-sdk.esm.js";
import OnirixScreenCaptureLib from "https://unpkg.com/@onirix/screen-capture@1.4.0/dist/ox-screencapture-lib.esm.js";

const embedSDK = new OnirixEmbedSDK();

embedSDK.connect();

const oxScreenCapture = new OnirixScreenCaptureLib(embedSDK);

// Remove UI and preview component
const removeScreenCaptureUI = () => {
    oxScreenCapture.removePreview();
    oxScreenCapture.removeUI();
}

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
    // Default: take photo and show it on preview component
    oxScreenCapture.addUI();
    
    // Take photo mode and download
    // oxScreenCapture.addUI(false, false);
    
    // Record video mode and download
    // oxScreenCapture.addUI(true);
});

// Activated when marker is lost
embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOST, (params) => {
    removeScreenCaptureUI();
});

// Activated when WebXR session ends
embedSDK.subscribe(OnirixEmbedSDK.Events.SESSION_ENDED, (params) => {
    removeScreenCaptureUI();
});