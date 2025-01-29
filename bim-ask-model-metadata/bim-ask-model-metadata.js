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
import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.16.0/dist/ox-embed-sdk.esm.js";

// Instantiate and connect the Onirix Embed SDK
const embedSDK = new OnirixEmbedSDK();
embedSDK.connect();

const ELEMENT_OID = "<<YOUR ELEMENT OID>>";

async function handleInputEvent(event) {
    if (event.type === 'blur' || (event.type === 'keydown' && event.key === 'Enter')) {
        const metatada = await embedSDK.getMetadata(ELEMENT_OID, event.target.value);
        if (jsonViewer) {
            jsonViewer.data = metatada
        }
    }
}

// Get input element and set event listeners
const inputElement = document.getElementById("ox-query-data");
inputElement.addEventListener('blur', handleInputEvent);
inputElement.addEventListener('keydown', handleInputEvent);
