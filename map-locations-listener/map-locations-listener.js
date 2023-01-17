const script = document.createElement("script");

const addListener = (htmlCollection) => {
  for (let i = 0; i < htmlCollection.length; i++) {
    const item = htmlCollection.item(i);
    if (null != item) {
      item.addEventListener("click", (event) => {
        for (let j = 0; j < event.target.classList.length; j++) {
          const className = event.target.classList.item(j);
          if (className.startsWith("ox-map-location--")) {
            const sceneOid = className.substring(className.indexOf("--") + 2);
            console.log(`onx-sample ->  I'm scene ${sceneOid}`);
          }
        }
      });
    } else {
      console.log(`onx-sample -> item is null`);
    }
  }
};

const getLocations = () => {
  const locations = document.getElementsByClassName("ox-map-location");
  if (locations.length > 0) {
    addListener(locations);
    console.log(`onx-sample -> ${new Date().toISOString()} Lotations found`);
    return true;
  } else {
    console.log(
      `onx-sample -> ${new Date().toISOString()} Lotations not found`
    );
    return false;
  }
};

script.src = "https://unpkg.com/@onirix/embed-sdk";
script.onload = async () => {
  const embedSDK = new OnirixEmbedSDK();
  embedSDK.connect();

  if (!getLocations()) {
    const interval = window.setInterval(() => {
      if (getLocations()) {
        clearInterval(interval);
      }
    }, 1000);
  }
};
document.head.appendChild(script);
