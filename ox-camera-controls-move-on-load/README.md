# Moving to a position on scene load

This example shows how to use the Onirix Camera Controls Module to move the experience camera to the desired perspective.

<p style = 'text-align:center;'>
  <image
    src="ox-camera-controls-move-on-load.png"
    alt="Moving to a position on scene load"
    caption="Moving to a position on scene load" 
    style="border-radius: 12px;">
</p>

To get the coordinates needed by the "animateTo" method you can use the "Copy camera position" button at the top of the scene editor.

<p style = 'text-align:center;'>
  <image
    src="copy-camera-postition.png"
    alt="Copy camera position button"
    caption="Copy camera position button" 
    style="border-radius: 12px;">
</p>

If you use camera movements when loading the scene you should keep in mind that initially the scene will be displayed in a fixed position and then the movement will be applied.
To avoid unwanted failures you can deactivate the initial content of your scene and activate it right after starting the camera movement.