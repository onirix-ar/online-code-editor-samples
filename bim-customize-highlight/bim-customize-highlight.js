// Import the Onirix Embed SDK
import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.14.0/dist/ox-embed-sdk.esm.js";

// Instantiate and connect the Onirix Embed SDK
const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();

// Default 
// embedSDK.highlightBIMPieces(true);

// Sphere
// embedSDK.highlightBIMPieces(true, {type: "sphere", color: "#FABADA", opacity: 0.7, radius: 0.5 });

// Box withhout border
embedSDK.highlightBIMPieces(true, {type: "box", color: "#FABADA", opacity: 0.7, border: {enable: false}});
