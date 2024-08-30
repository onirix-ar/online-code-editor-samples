import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.11.2/dist/ox-embed-sdk.esm.js";

const PLACEHOLDER_ASSET_OID = 'USE_YOUR_ASSET_OID';

async function blobToBase64(blob) {
    return new Promise( (resolve) => {
        const reader = new FileReader();
        reader.onloadend = function() {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
}

const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();

const placeholderAsset = await embedSDK.getAssetImage(PLACEHOLDER_ASSET_OID);
const placeholderBase64 = await blobToBase64(placeholderAsset)

embedSDK.loadSurfacePlaceholder(placeholderBase64);
