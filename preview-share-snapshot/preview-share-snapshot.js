/**
 * This class is in charge of handling the interaction with the custom html and css code.
 */
class OxExperienceUi {

    /**
     * HTML elemnt ids
     */
    FOOTER = "ox-photo";
    TRAKING_LOST = ".ox-tracking-lost__description";
    TAKE_PHOTO = "ox-take-photo-button";
    SAVE_PHOTO = "ox-save-photo-button";
    CLOSE = "ox-close-photo-button";
    SHARE_PHOTO = "ox-share-photo-button";
    PREVIEW = "ox-photo-preview";
    PREVIEW_IMAGE = "ox-photo-preview-image";
    RENDERER = "ox-webar-renderer";

    /**
     * Variables
     */
    photoFile;
    photoUrl;

    /**
     * Constants
     */
    TOP_BAR_SIZE = 72;


    /**
     * Initialize the listener of the take photo, save photo, share photo and close buttons
     */
    initListeners() {
        document.getElementById(this.TAKE_PHOTO).addEventListener("click", () => {
            this.takePhoto()
        } );
        document.getElementById(this.SAVE_PHOTO).addEventListener("click", () => {
            this.savePhoto()
        });
        document.getElementById(this.CLOSE).addEventListener("click", () => {
            this.closePhoto()
        });
        if (!navigator.share) {
            document.getElementById(this.SHARE_PHOTO).style.display = "none";
        } else {
            document.getElementById(this.SHARE_PHOTO).addEventListener("click", () => {
                this.sharePhoto()
            });
        }
    }

    /**
     * Change footer visibility
     */
    displayUI() {
        document.getElementById(this.FOOTER).style.display = "flex";
    }

    /**
     * Hide footer and change lost message
     */
    sceneLost() {
        document.getElementById(this.FOOTER).style.display = "none";
        const trackingLostDescription = document.querySelector(this.TRAKING_LOST);
        if (trackingLostDescription) {
            trackingLostDescription.innerText = "Placing the content in another nearby location automatically.";
        } 
    }

    /**
     * Generate the photo and save it in a file
     * 
     * @internal
     */
    async takePhoto() {
        const blob = await this.getScreenshotCutOut();
        this.photoUrl = URL.createObjectURL(blob);
        document.getElementById(this.PREVIEW_IMAGE).src = this.photoUrl;
        this.photoFile = new File(
            [blob],
            `Onirix - ${Date.now().toString()}.png`,
            { type: blob.type }
        );
        document.getElementById(this.PREVIEW).style.display = "flex";
    }

    /**
     * Take the photo from the screen
     * 
     * @internal
     */
    async getScreenshotCutOut() {
        const canvas = document.getElementById(this.RENDERER);
        const viewportWidth = canvas.width;
        const viewportHeight = canvas.height;
        const size = canvas.getBoundingClientRect();
        const canvasWidth = size.width;
        const canvasHeight = size.height;
        const scaleX = viewportWidth / canvasWidth;
        const scaleY = viewportHeight / canvasHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const offsetX = (canvasWidth - windowWidth) / 2;
        const offsetY = (canvasHeight - windowHeight) / 2;
        const top = offsetY + this.TOP_BAR_SIZE;
        const height = (5 / 4) * windowWidth;
        const left = offsetX;
        const width = windowWidth;
        const cropper = document.createElement("canvas");
        cropper.width = width * scaleX;
        cropper.height = height * scaleY;
        const cropperContext = cropper.getContext("2d");
        cropperContext.drawImage(
            canvas,
            left * scaleX, top * scaleY, width * scaleX, height * scaleY,
            0, 0, width * scaleX, height * scaleY
        );
        return new Promise(resolve => {
            cropper.toBlob(blob => resolve(blob));
        });
    }

    /**
     * Save the photo in download folder of phone or PC
     * 
     * @internal
     */
    savePhoto() {
        const link = document.createElement("a");
        link.href = this.photoUrl;
        link.target = "_blank";
        link.download = "screen-photo.png";
        link.click();
    }

    /**
     * Open share menu of the browser
     * 
     * @internal
     */
    async sharePhoto() {
        try {
            await navigator.share({
                files: [this.photoFile],
            });
        } catch {}
    }

    /**
     * Close the photo preview dialog
     * 
     * @internal
     */
    closePhoto() {
        document.getElementById(this.PREVIEW).style.display = "none";
    }

}

/**
 * Onirix Embed SDK allows you to listen to events and control the scene when embedding experiences in a custom domain or from the online code editor.
 * For more information visit https://docs.onirix.com/onirix-sdk/embed-sdk
 */
import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.11.2/dist/ox-embed-sdk.esm.js";

const embedSDK = new OnirixEmbedSDK();
embedSDK.connect();

const oxExperienceUi = new OxExperienceUi();

/**
 * It's launched when the scene lost the selected surface
 */
embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOST, () => {
    OxExperienceUi.sceneLost();
});

/**
 * It's launched when the scene detect a surface
 */
embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_DETECTED, () => {
    oxExperienceUi.displayUI();
});

/**
 * It's launched when the scene finish loading
 */
embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, () => {
    oxExperienceUi.initListeners()
    oxExperienceUi.displayUI();
});






















