import OnirixWebARDebugModule from "https://sdk.onirix.com/webar-debug-module/latest/ox-webar-debug-module.esm.js"
const onirixWebARDebug = new OnirixWebARDebugModule();

// Show last trace
onirixWebARDebug.showTrace(true);

import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@latest/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK();
onirixWebARDebug.setEmbedSDK(embedSDK);
embedSDK.connect();


console.log('It works!');