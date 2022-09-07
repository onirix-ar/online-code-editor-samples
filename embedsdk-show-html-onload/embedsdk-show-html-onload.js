const script = document.createElement('script');
script.src = 'https://unpkg.com/@onirix/embed-sdk';
script.onload = async () => {

    const embedSDK = new OnirixEmbedSDK();
    embedSDK.connect();

    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_START, (params) => {
        console.log(`Scene ${params.oid} is loading.`, params);
        document.getElementById('my-custom-div').style.display = 'block';
    });

    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
        console.log(`Scene ${params.oid} is loaded.`, params);
        document.getElementById('my-custom-div').innerText = 'Your custom text';
    });

};
document.head.appendChild(script);