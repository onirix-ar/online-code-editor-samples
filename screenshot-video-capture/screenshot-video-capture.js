/**
 * This class is in charge of capturing screenshots and screen recordings.
 */
class OxScreenCapture {
    /**
     * Boolean to know if the browser is Safari.
     */
    IOS =
        ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document);

    /**
     * Constructor.
     */
    constructor() {
        this.downloadLink = document.createElement("a");
        this.threeCanvas = document.querySelector("#ox-webar-renderer");
        this.chunks = [];
        this.drawInterval = null;
        this.mediaRecorder = null;
    }

    /**
     * Manage the opening on a new tab event for non blocking the camera.
     *
     * @internal
     * @param url  URL to open the screenshot or video in the new tab.
     */
    download(url) {
        this.downloadLink.setAttribute("href", url);
        this.downloadLink.click();
    }

    /**
     * Manage the capturing screenshot event.
     */
    capturePhoto() {
        this.downloadLink.setAttribute("download", "screenshot.png");

        this.threeCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            this.download(url);
        });
    }

    /**
     * Start the screen recording event.
     */
    captureVideoStart() {
        this.downloadLink.setAttribute("download", "video.mp4");
        const videoStream = this.threeCanvas.captureStream();
        let options;
        if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
            options = { mimeType: 'video/webm; codecs=vp9' };
        } else if (MediaRecorder.isTypeSupported('video/webm')) {
            options = { mimeType: 'video/webm' };
        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
            options = { mimeType: 'video/mp4' };
        } else {
            console.error("No suitable mimetype found for this device");
        }
        this.mediaRecorder = new MediaRecorder(videoStream, options);

        this.mediaRecorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
        };

        this.mediaRecorder.onstop = (e) => {
            const blob = new Blob(this.chunks, { type: this.mediaRecorder.mimeType });
            const videoURL = URL.createObjectURL(blob);
            this.download(videoURL);
        };

        this.mediaRecorder.start();
    }

    /**
     * Finish the screen recording event.
     */
    captureVideoEnd() {
        this.drawInterval = null;
        this.mediaRecorder.stop();
    }
}



/**
 * Just for testing the functionalities, this can be removed later.
 */
const screenCapture = new OxScreenCapture();

const captureButtonPhoto = document.querySelector("#capture-button");
captureButtonPhoto.addEventListener("click", () => {
    screenCapture.capturePhoto();
});

const captureButtonVideoStart = document.querySelector("#capture-button-video-start");
captureButtonVideoStart.addEventListener("click", () => {
    screenCapture.captureVideoStart();
});

const captureButtonVideoEnd = document.querySelector("#capture-button-video-stop");
captureButtonVideoEnd.addEventListener("click", () => {
    screenCapture.captureVideoEnd();
});
