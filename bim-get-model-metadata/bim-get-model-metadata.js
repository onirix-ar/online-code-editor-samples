// Create a script element to load the JSON Viewer library
const script = document.createElement('script');
script.src = 'https://pfau-software.de/json-viewer/dist/iife/index.js';

let jsonViewer = null;

script.onload = function() {
    jsonViewer = document.createElement("andypf-json-viewer");
    jsonViewer.classList.add('ox-json-viewer');
    jsonViewer.id = "json";
    jsonViewer.expanded = 2;
    jsonViewer.indent = 2;
    jsonViewer.showDataTypes = false;
    jsonViewer.theme = "monokai";
    jsonViewer.showToolbar = true;
    jsonViewer.showSize = true;
    jsonViewer.showCopy = true;
    jsonViewer.expandIconType = "square";

    // Append the JSON Viewer to the body of the document
    document.body.appendChild(jsonViewer);
};

document.head.appendChild(script);

// Import the Onirix Embed SDK
import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.13.0/dist/ox-embed-sdk.esm.js";

// Instantiate and connect the Onirix Embed SDK
const embedSDK = new OnirixEmbedSDK();
embedSDK.connect();

// Subscribe to the ELEMENT_CLICK event
embedSDK.subscribe(OnirixEmbedSDK.Events.ELEMENT_CLICK, async (params) => {
    if (jsonViewer) {
        jsonViewer.data = {
            ox_element_oid: params.oid,
            ox_element_name: params.name,
            ox_element_metadata: params.metadata
        }
    }
});
