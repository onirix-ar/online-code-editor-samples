# Location areas

Location areas are the areas where we want to indicate to the end-user that they can start their AR experience.

You can customise this component through the Onirix Studio online code editor to suit your needs or the needs of your brand.

[Here is an example](location-areas.css) of how to change the look of the component with a few lines of css. You can see the final result in this image:

<p style = 'text-align:center;'>
  <image
    src="location_areas.png"
    alt="Location areas"
    caption="Location areas"
    style="border-radius: 12px;"
    >
</p>

Below you can see all the available selectors to change the appearance of the localition areas component.

```css
/* Root component */
#ox-location-areas {}
.ox-location-areas {}

/* Root component when opaque format is off */
.ox-location-areas.ox-location-areas--transparent {}

/* Image preview block */
.ox-location-areas__preview {}

/* Image preview block when no image is selected */
.ox-location-areas__preview.ox-location-areas__preview--disabled {}

/* Main image preview block */
.ox-location-areas__preview-image {}

/* Main image preview block when semi-transparent format active */
.ox-location-areas__preview-image.ox-location-areas__preview-image--transparent {}

/* Buttons for toggle opaque format and for closing preview */
.ox-location-areas__preview-button {}

/* Buttons when active. Only applicable to the button to toggle the opaque format. */
.ox-location-areas__preview-button.ox-location-areas__preview-button--active {}

/* Button to toggle opaque format */
.ox-location-areas__preview-opacity-toggle {}

/* Button for closing the image preview */
.ox-location-areas__preview-close-button {}

/* Main block of image thumbnails */
.ox-location-areas__selector {}

/* Title of the main block of image thumbnails */
.ox-location-areas__selector-label {}

/* List of thumbnail images */
.ox-location-areas__selector-options {}

/* Each of the miniatures */
.ox-location-areas__selector-option {}

/* Active thumbnail */
.ox-location-areas__selector-option.ox-location-areas__selector-option--active {}

/* Image inside thumbnail block */
.ox-location-areas__selector-option-image {}
```