import OnirixEmbedSDK from "https://cdn.jsdelivr.net/npm/@onirix/embed-sdk@1.18.0/+esm";
import OxScreenCaptureLib from "https://cdn.jsdelivr.net/npm/@onirix/screen-capture@2.0.0/+esm";

const embedSDK = new OnirixEmbedSDK();

embedSDK.connect();

const oxScreenCapture = new OxScreenCaptureLib(embedSDK);

// Remove UI and preview component
const removeScreenCaptureUI = () => {
    oxScreenCapture.removePreview();
    oxScreenCapture.removeUI();
}

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
    // Default: take photo and show it on preview component
    oxScreenCapture.init();
    
    // Take photo mode and download
    // oxScreenCapture.init(false, false);
    
    // Record video mode and download
    // oxScreenCapture.init(true);
});

// Activated when marker is lost
embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOST, (params) => {
    removeScreenCaptureUI();
});

// Activated when WebXR session ends
embedSDK.subscribe(OnirixEmbedSDK.Events.SESSION_ENDED, (params) => {
    removeScreenCaptureUI();
});