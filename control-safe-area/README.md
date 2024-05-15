# Control safe area

When viewing a full screen experience some devices have certain areas such as the notch, top bar, etc, that cause some UI elements to not display correctly.

To control this we have two ways:
- The ox-fullscreen class, is a css class that is added to the body when the experience is displayed in fullscreen (Onirix Player or WebXR).
    [Example](ox-fullscreen-class)
    <p style = 'text-align:center;'>
        <image
            src="./ox-fullscreen/ox-fullscreen.PNG"
            alt="Customize ox-fullscreen class"
            caption="Customize ox-fullscreen class" 
            style="border-radius: 12px; height: 350px"
            >
    </p>
- [Environment variables](enviroment-variables). They are variables that we can access and whose value will depend on the device. They store the value in pixels of these areas that occupy a certain part of our UI. These variables are:
    - var(--sat): space occupied by the safe area at the top
    - var(--sar): space occupied by the safe area at the right
    - var(--sab): space occupied by the safe area at the bottom
    - var(--sal): space occupied by the safe area at the left
    <p style = 'text-align:center;'>
        <image
            src="./enviroment-variables/enviroment-variables.PNG"
            alt="Customize enviroment variables"
            caption="Customize enviroment variables" 
            style="border-radius: 12px; height: 350px"
            >
    </p>

