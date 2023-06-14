const synth = window.speechSynthesis;
const spanish_text = "Usted esta escuchando un texto en español.";
const english_text = "You are listening to a text in English.";

function readSpanish() {
    const utterThis = new SpeechSynthesisUtterance(spanish_text);
    utterThis.lang = 'es-ES'
    synth.speak(utterThis);
}

function readEnglish() {
    const utterThis = new SpeechSynthesisUtterance(english_text);
    utterThis.lang = 'en-GB'
    synth.speak(utterThis);
}

/**
 * Onirix Embed SDK allows you to listen to events and control the scene when embedding experiences in a custom domain or from the online code editor.
 * For more information visit https://docs.onirix.com/onirix-sdk/embed-sdk
 */
import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.2.3/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK(null, "https://stage.onirix.com");
await embedSDK.connect();

    
/**
 * It's executed when the scene is totally loaded
 */
embedSDK.subscribe(OnirixEmbedSDK.Events.ELEMENT_CLICK, (params) => {
    if (params.name == "es") {
        readSpanish();
    } else {
        readEnglish();
    }
})