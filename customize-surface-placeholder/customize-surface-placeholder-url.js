import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.11.2/dist/ox-embed-sdk.esm.js";

const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();

embedSDK.loadSurfacePlaceholder("https://webar-examples.com/ox-placeholder_bn.png");
