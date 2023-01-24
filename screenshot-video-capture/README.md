# Screenshot and video capture

Using this example you can add buttons to capture screen shots and record videos of your experience.

<p style = 'text-align:center;'>
  <image
    src="screenshot-video-capture.png"
    alt="Screenshot and video capture"
    caption="Screenshot and video capture" 
    style="border-radius: 12px;"
    >
</p>

At this moment, video capture doesn't work (will generate an empty video) on Surface Tracking scenes, when using World-Tracking configuration on ARCore powered devices.
As a workaround, you can add the parameter "disableWebXR=true" to the experience URL to disable the use of WebXR in favor of Onirix World Tracking.

