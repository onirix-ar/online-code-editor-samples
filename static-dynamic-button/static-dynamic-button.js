/**
 * Onirix Embed SDK allows you to listen to events and control the scene when embedding experiences in a custom domain or from the online code editor.
 * For more information visit https://docs.onirix.com/onirix-sdk/embed-sdk
 */
import OnirixEmbedSDK from "https://www.unpkg.com/@onirix/embed-sdk@1.8.0/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();

embedSDK.subscribe(OnirixEmbedSDK.Events.MAP_READY, () => {
    const staticButton = document.getElementById('static-button');
    staticButton.addEventListener('click', () => {
        alert('You click static button.');
    })

    const mapContainer = document.getElementById("webar-geolocated-container");
    const dynamicButton = document.createElement('div');
    dynamicButton.innerHTML = 'Dynamic button';
    dynamicButton.classList.add('button');
    dynamicButton.style.top = '9vh';
    dynamicButton.addEventListener('click', () => {
        alert('You click dynamic button.');
    });
    mapContainer.appendChild(dynamicButton);
});