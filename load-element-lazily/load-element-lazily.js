import OnirixEmbedSDK from "https://www.unpkg.com/@onirix/embed-sdk@1.11.2/dist/ox-embed-sdk.esm.js";

const embedSDK = new OnirixEmbedSDK();
embedSDK.connect();

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_CLICK, async (params) => {
    console.log('Loading element.')
    await embedSDK.loadElement('YOUR ELEMENT OID');
    console.log('Element loaded.');
});
