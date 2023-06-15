const synth = window.speechSynthesis;
const spanish_text = "Usted esta escuchando un texto en español.";
const english_text = "You are listening to a text in English.";

/**
 * Generates an object of type SpeechSynthensisUtterance
 * assigning the text to be read and the language.
 * If the language is uninformed, the language of the
 * browser is taken.
 * 
 * @param   text to read
 * @param   language in which to read
 */
function oxReadString(text, language = navigator.language) {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = language
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
        oxReadString(spanish_text, "es-ES");
    } else {
        oxReadString(english_text, "en-GB");
    }
})