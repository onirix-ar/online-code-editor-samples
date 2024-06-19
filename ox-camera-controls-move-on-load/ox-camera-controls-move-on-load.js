import OnirixEmbedSDK from 'https://www.unpkg.com/@onirix/embed-sdk@1.10.0/dist/ox-embed-sdk.esm.js';
import OnirixCameraModule from 'https://www.unpkg.com/@onirix/camera-controls-module@1.1.0/dist/ox-camera-controls-module.esm.js';


/**
 * Name of the collection containing the elements to be displayed at the start of the scene.
 */
const MAIN_CONTENT = 'main-collection';

const embedSDK = new OnirixEmbedSDK();
embedSDK.connect();

const camera = new OnirixCameraModule(embedSDK);
camera.enableOrbitControls();

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, () => {
    camera.animateTo(
      0.00904977375565611, 0.920298396848859, 1.195086922507703,
      0.00904977375565611, 0.7579185520361983, 0,
      'spherical ease-in-out',
      2
    );
    // We use requestAnimationFrame to ensure that content 
    // is enabled after motion is initiated and to prevent unwanted running conditions.
    window.requestAnimationFrame( () => embedSDK.enable(MAIN_CONTENT));
});
