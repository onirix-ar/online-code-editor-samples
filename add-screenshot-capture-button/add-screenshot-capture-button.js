/**
 * This class is in charge of capturing screenshots.
 */
class OxScreenCapture {
  /**
   * Constructor.
   */
  constructor() {
    this.downloadLink = document.createElement("a");
    this.threeCanvas = document.querySelector("#ox-webar-renderer");
  }

  /**
   * Manage the capturing screenshot event.
   */
  capturePhoto() {
    this.downloadLink.setAttribute("download", "screenshot.png");

    this.threeCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      this.downloadLink.setAttribute("href", url);
      this.downloadLink.click();
    });
  }
}

const screenCapture = new OxScreenCapture();
const screenshotButton = document.querySelector("#screenshot-button");

screenshotButton.addEventListener("click", () => {
  screenCapture.capturePhoto();
});
