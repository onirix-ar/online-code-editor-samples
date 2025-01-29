// Import the Onirix Embed SDK
import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.16.0/dist/ox-embed-sdk.esm.js";

// Instantiate and connect the Onirix Embed SDK
const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();

// Default 
// embedSDK.enableHighlightNodes(true);

// Sphere
// embedSDK.enableHighlightNodes(true, {type: "sphere", color: "#FABADA", opacity: 0.7, radius: 0.5 });

// Box withhout border
embedSDK.enableHighlightNodes(true, {type: "box", color: "#FABADA", opacity: 0.7, border: {enable: false}});
