import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.10.0/dist/ox-embed-sdk.esm.js";

const ALLOWED_ELEMENTS_OIDS = [
    "<allowed_element_1_oid>",
    ...
    "<allowed_element_n_oid>"
];

const BLOCKED_ELEMENTS_OIDS = [
    "<blocked_element_1_oid>",
    ...
    "<blocked_element_n_oid>",
];

const embedSDK = new OnirixEmbedSDK();
embedSDK.connect();

embedSDK.setTransformControlsBlocklist(BLOCKED_ELEMENTS_OIDS);
/*
Remember to choose one of the two actions. 
If you execute both or execute them several times, only the last one executed will be applied.
*/
embedSDK.setTransformControlsAllowlist(ALLOWED_ELEMENTS_OIDS);

