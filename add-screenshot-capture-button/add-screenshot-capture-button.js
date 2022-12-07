(() => {
  let screenshotButton = document.querySelector("#screenshot-button");
  let screenshotFlash = document.querySelector("#screenshot-flash");
  screenshotButton.addEventListener("click", () => {
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "screenshot.png");
    let video = document.querySelector("#video");
    let threeCanvas = document.querySelector("#ox-editor-renderer");
    let screenshotCanvas = document.createElement("canvas");
    screenshotCanvas.width = threeCanvas.width;
    screenshotCanvas.height = threeCanvas.height;
    let screenshotCanvasCtx = screenshotCanvas.getContext("2d");
    screenshotCanvasCtx.drawImage(
      video,
      0,
      0,
      threeCanvas.width,
      threeCanvas.height
    );
    screenshotCanvasCtx.drawImage(threeCanvas, 0, 0);
    screenshotCanvas.toBlob((blob) => {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute("href", url);
      downloadLink.click();
    });
    screenshotFlash.classList.add("active");
    setTimeout(() => {
      screenshotFlash.classList.remove("active");
    }, 300);
  });
})();
