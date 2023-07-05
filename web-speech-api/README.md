# Integration with Web Seepech API

Using this example you can integrate Web Speech API or Amazon Polly with Onirix usign code editor.

Web Speech Api enables you to incorporate voice data into web apps. There are two possibilities, the first is text-to-speech, i.e. the browser will read text, and the second is speech recognition, i.e. the user speaks and the browser processes the words. In this example, the first option is used.

Amazon Polly do the same as WebSpeech API but provide more uniformity between browsers and operating systems.
To use Amazon Polly you need an account in it (https://aws.amazon.com/es/polly/) and generate a credential. This credetial is the one you must enter in the code in the "yout credential token" part and set your selected region.

In this example there are three labels called en, es and stop. Click on es or en read the text in the corresponding language.
Click on stop, stops the reading text.
The second and third parameter can be removed in the function calls, by default the language is Spanish and the voice Enrique.
