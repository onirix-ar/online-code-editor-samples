# Integration with Web Seepech API

Using this example you can integrate Web Speech API or Amazon Polly with Onirix usign code editor.

Web Speech Api enables you to incorporate voice data into web apps. There are two possibilities, the first is text-to-speech, i.e. the browser will read text, and the second is speech recognition, i.e. the user speaks and the browser processes the words. In this example, the first option is used.

Amazon Polly do the same as WebSpeech API but provide more uniformity between browsers and operating systems.
To use Amazon Polly you need an account in it (https://aws.amazon.com/es/polly/) and generate a credential. This credetial is the one you must enter in the code in the "yout credential token" part and set your selected region.

In this examples, the text is going to be read when the scene is loaded and when you click and element.
A UI with two buttons has been added to be able to stop the locution or change the language at runtime.

If you want to use Web Speech API and change the original language to ES you must initialize like this:
- const oxSpeech = new OxSpeech(false, {language: "es-ES"});

On the other hand, if you use Amazon Polly and want to change the original language you must initialize like this:
- const oxSpeech = new OxSpeech(true, {region: "your region", credential: "your credential token", language: "es-ES", voice: "Enrique"});

The UI of this example is:
<p style = 'text-align:center;'>
  <image
    src="web-speech-api.png"
    alt="Web Speech API"
    caption="Web Speech API" 
    style="border-radius: 12px;"
    >
</p>
