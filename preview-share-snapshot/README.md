# Preview snapshot

Using this example you can take a photo of the content in the screen, show it in a preview dialog, download it and if the browser support it, share it.

<p style = 'text-align:center;'>
  <image
    src="preview-share-snapshot.png"
    alt="Preview and share snapshot"
    caption="Preview and share snapshot" 
    style="border-radius: 12px;"
    >
</p>

In order to obtain a photo of what the experience is showing we must access the Studio canvas, this is what getScreenshotCutOut is responsible for.
When you have the image, it is stored in a file that is passed to sharePhoto, if you want to share the photo, but in the case of just wanting to download it, the file is not used, but the url where the photo has been stored (a place inside to which only Studio has access).