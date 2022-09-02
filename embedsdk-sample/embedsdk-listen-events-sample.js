const script = document.createElement('script');
script.src = 'https://unpkg.com/@onirix/embed-sdk';
script.onload = async () => {

    const embedSDK = new OnirixEmbedSDK();
    embedSDK.connect();

    embedSDK.subscribe(OnirixEmbedSDK.Events.READY, (params) => {
        console.log(`Onirix is ready to rumble!`, params);
    });

    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_START, (params) => {
        console.log(`Scene ${params.oid} is loading.`, params);
    });

    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
        console.log(`Scene ${params.oid} is loaded.`, params);
    });

    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOST, (params) => {
        console.log(`Scene ${params.oid} is lost.`, params);
    });

    embedSDK.subscribe(OnirixEmbedSDK.Events.ELEMENT_CLICK, (params) => {
        console.log(`Element with oid: ${params.oid} was clicked!`, params);
    });

    embedSDK.subscribe(OnirixEmbedSDK.Events.OPEN_MARKERS_PANEL, (params) => {
        console.log(`Markers panel was opened`, params);
    });

    embedSDK.subscribe(OnirixEmbedSDK.Events.CLOSE_MARKERS_PANEL, (params) => {
        console.log(`Markers panel was closed`, params);
    });

    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_RADIUS_ENTER, (params) => {
        console.log(`You have entered the scene ${params.oid} radius.`, params);
    });

    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_RADIUS_EXIT, (params) => {
        console.log(`You have left the scene ${params.oid} radius.`, params);
    });

};
document.head.appendChild(script);