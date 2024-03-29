# Embed Onirix experiences

<p style = 'text-align:center;'>
  <image
    src="embed-experience.png"
    alt="Embed Onirix experiences"
    caption="Embed Onirix experiences" 
    style="border-radius: 12px;height: 500px;">
</p>

Using this example you will be able to add your Onirix Studio experiences to your website.

You must add a `<li>` tag for each experience you want to add to the menu.
The text that will be displayed is the text of the li element, **not the name of the project in Studio**.

```
<li data-expIdx="3">
  Onirix Hunt: Numbers
</li>
```

Each `<li>` tag must have a `data-expIdx` attribute. 
The value of this attribute will be the position in the `experienceUrls` array that you will find in the [embed-experience.js](embed-experience.js) file with the urls of your experiences. 

You will find the URLs of your experiences in the "share" menus of Onirix Studio.

You can find the direct URL of the entire project here:

<p style = 'text-align:center;'>
  <image
    src="project-url.png"
    alt="Onirix Studio share project options"
    caption="Onirix Studio share project options" 
    style="border-radius: 12px; height: 400px;">
</p>

Or if you prefer you can link to a specific scene:

<p style = 'text-align:center;'>
  <image
    src="scene-url.png"
    alt="Onirix Studio share scene options"
    caption="Onirix Studio share scene options" 
    style="border-radius: 12px; width: 400px;">
</p>

For more information [visit our documentation](https://docs.onirix.com/onirix-player/embedded-iframes)


