import OnirixWebARDebugModule from "https://sdk.onirix.com/webar-debug-module/latest/ox-webar-debug-module.esm.js"
const onirixWebARDebug = new OnirixWebARDebugModule();

// Show last trace
onirixWebARDebug.showTrace(true);

console.log('It works!');