
const texts = [
    {
        language: "en-GB",
        click: "You have clicked on the item ",
        load: "Scene loading is complete"
    },
    {
        language: "es-ES",
        click: "Has hecho click en el elemento ",
        load: "Carga de la escena completa"
    }
]

/**
 * This class is in charge of handling the interaction with the UI (only necessary if you have any UI).
 */
class OxExperienceUi {

    /**
     * HTML ids
     */
    CHANGE = "change";
    STOP = "stop";
    
    /**
     * Add listeners to the two buttons
     */
    initUI() {
        document.getElementById(this.CHANGE).addEventListener("click", (params) => {
            if (params.target.innerText == "Change to ES") {
                document.getElementById(this.CHANGE).innerText = "Cambiar a EN";
                document.getElementById(this.STOP).innerText = "Parar";
                this.onChangeLanguage('es-ES');
                this.onChangeVoice("Enrique");
            } else {
                document.getElementById(this.CHANGE).innerText = "Change to ES";
                document.getElementById(this.STOP).innerText = "Stop";
                this.onChangeLanguage('en-GB');
                this.onChangeVoice("Brian");
            }
        })

        document.getElementById(this.STOP).addEventListener("click", (params) => {
            this.onStop();
        })
    }
}

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
    language = "en-GB";
    voice = "Brian";

    /**
     * Initialize de connection with both APIs depending on the params
     * 
     * @param   indicates if the text should be read with Amazon Polly or WebSpeech API
     * @param   info to establish the connectioin with Amazon Polly, language and voice.
     * The available voices will depend on the configuration you have in Amazon Polly. Voice list: https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
     */
    constructor(useAmazon = false, params = { region: "", credential: "", language: "en-GB", voice: "Brian"}) {
        this.useAmazon = useAmazon;
        if (params.language) {
            this.language = params.language;
        }
        if (params.voice) {
            this.voice = params.voice;
        }

        if (useAmazon) {
            if (params.region == "" || params.credential == "") {
                console.error("Error: region and credential must be informed.")
            } else {
                const script = document.createElement("script");
                script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.1401.0.min.js";
                script.onload = async () => {
                    this.speak = (text) => {
                        // Initialize the Amazon Cognito credentials provider
                        AWS.config.region = params.region;
                        AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: `${params.region}:${params.credential}`});
                        // Create the JSON parameters for getSynthesizeSpeechUrl
                        const speechParams = {
                            OutputFormat: "mp3",
                            SampleRate: "16000",
                            Text: text,
                            TextType: "text",
                            VoiceId: this.voice,
                            LanguageCode: this.language
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
     * Read the text. In case Amazon Polly is used, it calls to speak function inirialized in the constructor
     * 
     * @internal
     * @param   text to read
     */
    textToSpeech(text) {
        if (this.useAmazon) {
            this.speak(text);
        } else {
            this.utterThis.text = text;
            this.utterThis.lang = this.language
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

    /**
     * Read a text when the scene is loaded
     */
    onLoad() {
        const text = texts.find(tex => tex.language == this.language).load;
        this.textToSpeech(text);
    }

    /**
     * Read a text when an element is clicked
     */
    onClick(item) {
        const text = texts.find(tex => tex.language == this.language).click;
        this.textToSpeech(text + item);
    }

    /**
     * Change the language at runtime
     */
    setLanguage(language) {
        this.language = language;
    }

    /**
     * Change the voice at runtime
     */
    setVoice(voice) {
        this.voice = voice;
    }

};

/**
 * Onirix Embed SDK allows you to listen to events and control the scene when embedding experiences in a custom domain or from the online code editor.
 * For more information visit https://docs.onirix.com/onirix-sdk/embed-sdk
 */
import OnirixEmbedSDK from "https://www.unpkg.com/@onirix/embed-sdk@latest/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();
const oxExperienceUi = new OxExperienceUi();

/**
 * Commenting and uncommenting these two lines you can try using WebSpeech API (first line) or Amazon Polly (second line)
 */
const oxSpeech = new OxSpeech();
/*const oxSpeech = new OxSpeech(true, {region: "eu-west-3", credential: "your credential token"});*/

/**
 * These three functions establish the comunication between the UI and the speech class.
 * They are only necessary if you want to change the language, voice or stop the locution (like the UI buttons)
 */
oxExperienceUi.onChangeLanguage = (language) => {
    oxSpeech.setLanguage(language);
}

oxExperienceUi.onChangeVoice = (voice) => {
    oxSpeech.setVoice(voice);
}

oxExperienceUi.onStop = () => {
    oxSpeech.stop();
}
    
/**
 * It's executed when click an AR element
 */
embedSDK.subscribe(OnirixEmbedSDK.Events.ELEMENT_CLICK, (params) => {
    oxSpeech.onClick(params.name);
})

/**
 * It's executed when the scene is totally loaded
 */
embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
    oxExperienceUi.initUI();
    oxSpeech.onLoad();
})