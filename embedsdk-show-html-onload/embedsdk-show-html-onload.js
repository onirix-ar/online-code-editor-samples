import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.2.4/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_START, (params) => {
  console.log(`Scene ${params.oid} is loading.`, params);
  document.getElementById("my-custom-div").style.display = "block";
});

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
  console.log(`Scene ${params.oid} is loaded.`, params);
  document.getElementById("my-custom-div").innerText = "Your custom text";
});
