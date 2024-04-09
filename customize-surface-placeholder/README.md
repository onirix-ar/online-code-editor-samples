# Customize surface placeholder

With this example you can change the image used as placeholder for surface tracking scenes.

<p style = 'text-align:center;'>
  <image
    src="customize-surface-placeholder.png"
    alt="Customize surface placeholder"
    caption="Customize surface placeholder" 
    style="border-radius: 12px;"
    >
</p>

## Load from url 
In [this example](./customize-surface-placeholder-url.js) you will see how to use an image hosted in any hosting that does not block access by CROSS.

## Load form base64 (Studio's asset)
You can also load the image as a base64 url. In [this example](./customize-surface-placeholder-asset.js) you can use a Studio asset as a placeholder by first getting its base64 url. In this [web site](https://www.base64-image.de/) you can get the base64 code of any file.

## Limitations and recommendations

- Transparency is only available for png files (not for base64 uploaded images).
- If the width and height of the image are not equal, the texture will appear distorted.
- If the width or height is greater than 512 pixels it may fail on certain devices.
- If the width or height are not powers of 2 the performance may deteriorate.
- If the width or height is greater than 4096 pixels an error is thrown.