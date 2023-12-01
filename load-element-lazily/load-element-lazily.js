import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@latest/dist/ox-embed-sdk.esm.js";

const embedSDK = new OnirixEmbedSDK();
embedSDK.connect();

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_CLICK, async (params) => {
    console.log('Loading element.')
    await embedSDK.loadElement('YOUR ELEMENT OID');
    console.log('Element loaded.');
});
