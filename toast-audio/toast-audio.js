
/**
 * Onirix Embed SDK allows you to listen to events and control the scene when embedding experiences in a custom domain or from the online code editor.
 * For more information visit https://docs.onirix.com/onirix-sdk/embed-sdk
 */
import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@latest/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();

/**
 * HTML Constants
*/ 
const OX_AUDIO = 'ox-audio';
const CLOSE = 'ox-audio__close';

/**
 * Indicates the time that the card is available
 */
const availableTime = 3000;


/**
* It's execute when the scene is totally load and it start the game
*/
embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, async (params) => {   
    document.getElementById(OX_AUDIO).style.display = 'block';
    setTimeout(() => {
        document.getElementById(OX_AUDIO).style.display = 'none';
    }, availableTime);

    document.getElementById(CLOSE).addEventListener('click',() => {
        document.getElementById(OX_AUDIO).style.display = 'none';
    })
});