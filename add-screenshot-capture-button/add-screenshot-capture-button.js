(() => {
  const screenshotButton = document.querySelector("#screenshot-button");
  const screenshotFlash = document.querySelector("#screenshot-flash");
  screenshotButton.addEventListener("click", () => {
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "screenshot.png");
    const video = document.querySelector("#video");
    const threeCanvas = document.querySelector("#ox-editor-renderer");
    const screenshotCanvas = document.createElement("canvas");
    screenshotCanvas.width = threeCanvas.width;
    screenshotCanvas.height = threeCanvas.height;
    const screenshotCanvasCtx = screenshotCanvas.getContext("2d");
    screenshotCanvasCtx.drawImage(video, 0, 0, threeCanvas.width, threeCanvas.height);
    screenshotCanvasCtx.drawImage(threeCanvas, 0, 0);
    screenshotCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      downloadLink.setAttribute("href", url);
      downloadLink.click();
    });
    screenshotFlash.classList.add("active");
    setTimeout(() => {
      screenshotFlash.classList.remove("active");
    }, 300);
  });
})();
