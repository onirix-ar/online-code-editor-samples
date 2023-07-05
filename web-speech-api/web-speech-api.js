const spanish_text = "Usted esta escuchando un texto en español.";
const english_text = "You are listening to a text in english.";

/**
 * This class is in charge of the communication with the APIs to read the text
 */
class OxSpeech {

    /**
     * Global variables
     */
    useAmazon = false;
    speak = null;
    synth = null;
    utterThis = null;

    /**
     * Initialize de connection with both APIs depending on the params
     * 
     * @param   indicates if the text should be read with Amazon Polly or WebSpeech API
     * @param   info to establish the connectioin with Amazon Polly
     */
    constructor(useAmazon = false, params = { region: "", credential: ""}) {

        this.useAmazon = useAmazon;

        if (useAmazon) {
            if (params.region == "" || params.credential == "") {
                console.log("Error: region and credential must be informed.")
            } else {
                const script = document.createElement("script");
                script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.1401.0.min.js";
                script.onload = async () => {
                    this.speak = (text, voice, language) => {
                        // Initialize the Amazon Cognito credentials provider
                        AWS.config.region = params.region;
                        AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: `${params.region}:${params.credential}`});

                        // Create the JSON parameters for getSynthesizeSpeechUrl
                        const speechParams = {
                            OutputFormat: "mp3",
                            SampleRate: "16000",
                            Text: text,
                            TextType: "text",
                            VoiceId: voice,
                            LanguageCode: language
                        };
                        
                        // Create the Polly service object and presigner object
                        const polly = new AWS.Polly({apiVersion: "2016-06-10"});
                        const signer = new AWS.Polly.Presigner(speechParams, polly);

                        // Create presigned URL of synthesized speech file
                        const audioPlayback = document.querySelector("#audioPlayback");
                        const audioSource = document.querySelector("#audioSource");
                        signer.getSynthesizeSpeechUrl(speechParams, (error, url) => {
                            if (error) {
                                console.error(error);
                            } else {
                                audioSource.src = url;
                                audioPlayback.load();
                                audioPlayback.play();
                            }
                        });
                    }

                };
                document.head.appendChild(script);
            }
        } else {
            this.synth = window.speechSynthesis;
            this.utterThis = new SpeechSynthesisUtterance();
        }
    }

    /**
     * Read the text. In case Amazon Polly is used, it calls to speak function inirialized in the constructor.
     * If language is uninformed the language of the browser is taken.
     * The available voices will depend on the configuration you have in Amazon Polly. Voice list: https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
     * 
     * @param   text to read
     * @param   language code
     * @param   Amazon Polly voice.
     */
    textToSpeech(text, language = "es-ES", voice = "Enrique") {
        if (this.useAmazon) {
            this.speak(text, voice, language);
        } else {
            this.utterThis.text = text;
            this.utterThis.lang = language
            this.synth.speak(this.utterThis);
        }
    }

    /**
     * Cancel reading text
     */
    stop() {
        if (this.useAmazon) {
            const audioPlayback = document.querySelector("#audioPlayback");
            audioPlayback.pause();
            audioPlayback.currentTime = 0;
        } else {
            this.synth.cancel(this.utterThis)
        }
    }

};

/**
 * Onirix Embed SDK allows you to listen to events and control the scene when embedding experiences in a custom domain or from the online code editor.
 * For more information visit https://docs.onirix.com/onirix-sdk/embed-sdk
 */
import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.2.3/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK(null, "https://stage.onirix.com");
await embedSDK.connect();

/**
 * Commenting and uncommenting these two lines you can try using WebSpeech API (first line) or Amazon Polly (second line)
 */
/*const oxSpeech = new OxSpeech();*/
const oxSpeech = new OxSpeech(true, {region: "eu-west-3", credential: "your credential token"});
    
/**
 * It's executed when the scene is totally loaded
 */
embedSDK.subscribe(OnirixEmbedSDK.Events.ELEMENT_CLICK, (params) => {
    if (params.name == "es") {
        oxSpeech.textToSpeech(spanish_text, "es-ES", "Enrique");
    } else if(params.name == "en") {
        oxSpeech.textToSpeech(english_text, "en-GB", "Enrique");
    } else if (params.name == "stop") {
        oxSpeech.stop();
    }
})