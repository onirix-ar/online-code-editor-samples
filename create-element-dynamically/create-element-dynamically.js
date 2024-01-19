import OnirixEmbedSDK from "https://www.unpkg.com/@onirix/embed-sdk@1.8.0/dist/ox-embed-sdk.esm.js";
import uuid from "https://unpkg.com/uuid@latest/dist/esm-browser/v4.js";

const embedSDK = new OnirixEmbedSDK();
embedSDK.connect();

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_CLICK, async (params) => {
    console.log('Creating element.')
    await embedSDK.createElement(uuid(), {
        assetOid: 'YOUR ASSET OID',
        parentOid: null,
        name: 'NEW ELEMENT NAME',
        position: params.intersection,
        euler: {x: 0, y: 0, z: 0},
        scale: {x: 0.1, y: 0.1, z: 0.1},
        opacity: 1,
    });
    console.log('element created.');
});
