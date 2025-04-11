import OnirixEmbedSDK from "https://cdn.jsdelivr.net/npm/@onirix/embed-sdk@1.18.0/+esm";
import OxScreenCaptureLib from "https://cdn.jsdelivr.net/npm/@onirix/screen-capture@2.0.0/+esm";

const OVERLAY_ASSET_OID = '<your asset oid>';

const embedSDK = new OnirixEmbedSDK();
embedSDK.connect();
const oxScreenCapture = new OxScreenCaptureLib(embedSDK);

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, async (params) => {
    // Image in the upper right corner with a specific size
    await oxScreenCapture.setOverlay(OVERLAY_ASSET_OID, { top: 10, right: 10, width: 200, height: 53 }); 

    // uncomment this line so that the overlay takes up the whole capture (ideal for adding frames)
    // await oxScreenCapture.setOverlay(OVERLAY_ASSET_OID, { top: 0, right: 0, bottom: 0, left: 0 }); 
    oxScreenCapture.init();
});

