import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.2.3/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK(null, "https://stage.onirix.com");
await embedSDK.connect();

embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
  console.log(`Scene ${params.oid} is loaded.`, params);

  const webarContextMenu = document.getElementById("#webar-context-menu");
  console.log("webarContextMenu", webarContextMenu);
  webarContextMenu.removeChild(webarContextMenu.firstChild);

  const anchorElement = document.createElement("p");
  anchorElement.id = "my-link-text";
  anchorElement.innerText = "My link text";
  anchorElement.onclick = () => {
    window.location.assign("https://this.is.a.sample.com");
  };
  anchorElement.style.color = "#003400";
  webarContextMenu.prepend(anchorElement);
});
