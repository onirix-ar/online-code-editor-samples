import OnirixEmbedSDK from "https://www.unpkg.com/@onirix/embed-sdk@1.17.0/dist/ox-embed-sdk.esm.js";
 
// Generate random UUID v4
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
            const random = Math.random() * 16 | 0;
            const value = char === 'x' ? random : (random & 0x3 | 0x8);
            return value.toString(16);
        }
    );
}

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
