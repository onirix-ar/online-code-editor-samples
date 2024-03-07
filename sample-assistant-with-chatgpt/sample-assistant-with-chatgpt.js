import Lottie from 'https://unpkg.com/lottie-web@5.12.2/build/player/esm/lottie.min.js';

/**
 * This class is in charge of handling the interaction with the AR experience through the EmbedSDK.
 */
class OxExperience {

    /**
     * Names of elements in the experience.
     */
    ASSISTANT = 'Assistant';

    /**
     * Names of animations in the experience.
     */
    TALK_ANIMATION = 'talk_generic';
    IDLE_ANIMATION = 'idle';

    /**
     * Instance of the embed SDK.
     */
    embedSDK = null;

    /**
     * Instance of a text to speech API.
     */
    textToSpeech = null;

    /**
     * Instance of a speech to text API.
     */
    speechToText = null;

    /**
     * Instance of a chat model.
     */
    chatModel = null;

    /**
     * Language of the experience.
     */
    lang = 'en';

    /**
     * Callback called when the experience loads.
     */
    onLoad = null;

    /**
     * Callback called when the experience is lost.
     */
    onLost = null;

    /**
     * Callback called when the assitant starts listening questions.
     */
    onListenStart = null;

    /**
     * Callback called when the assitant resumes listening questions.
     */
    onListenResume = null;

    /**
     * Callback called when the assitant thinks it has finished listening for questions.
     */
    onListenTentativeEnd = null;

    /**
     * Callback called when the assitant finishes listening questions.
     */
    onListenEnd = null;

    /**
     * Callback called when the assitant starts speaking the reply.
     */
    onReplyStart = null;

    /**
     * Callback called when the assitant finishes speaking the reply.
     */
    onReplyEnd = null;

    /**
     * Callback called when the assistant does not reply.
     */
    onSilentReply = null;

    /**
     * Constructor
     * Initialize the embedSDK
     * 
     * @param embedsdk allows you to lister to events and control the scene content
     */
    constructor(embedSDK) {
        this.embedSDK = embedSDK;

        // Bind handlers
        this.onSceneLoadEnd = this.onSceneLoadEnd.bind(this);
        this.onSceneLost = this.onSceneLost.bind(this);

        // Register SDK events
        this.embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, this.onSceneLoadEnd);
        this.embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOST, this.onSceneLost);
        this.embedSDK.subscribe(OnirixEmbedSDK.Events.SESSION_ENDED, this.onSceneLost);
    }

    /**
     * Text to speech model setter.
     * @param newTextToSpeech New value.
     */
    setTextToSpeech(newTextToSpeech) {
        this.textToSpeech = newTextToSpeech;
    }

    /**
     * Speech to text model setter.
     * @param newSpeechToText New value.
     */
    setSpeechToText(newSpeechToText) {
        this.speechToText = newSpeechToText;
        this.speechToText.onListenStart = () => {
            if (this.onListenStart) {
                this.onListenStart();
            }
        };
        this.speechToText.onListenResume = () => {
            if (this.onListenResume) {
                this.onListenResume();
            }
        };
        this.speechToText.onListenTentativeEnd = () => {
            if (this.onListenTentativeEnd) {
                this.onListenTentativeEnd();
            }
        };
        this.speechToText.onListenEnd = () => {
            if (this.onListenEnd) {
                this.onListenEnd();
            }
        };
    }

    /**
     * Chat model setter.
     * @param newChatModel New value.
     */
    setChatModel(newChatModel) {
        this.chatModel = newChatModel;
    }

    /**
     * Handler called when the scene load ends.
     * @internal
     */
    onSceneLoadEnd() {
        if (this.onLoad) {
            this.onLoad();
        }
    }

    /**
     * Handler called when the scene is lost.
     * @internal
     */
    onSceneLost() {
        if (this.onLost) {
            this.onLost();
        }
    }

    /**
     * Listens a question and asks it to the chat model.
     * @return A promise that resolves when finished.
     */
    async requestAsk() {
        const question = await this.speechToText.request();
        if (question) {
            await this.ask(question);
        } else {
            if (this.onSilentReply) {
                this.onSilentReply();
            }
        }
    }

    /**
     * Asks the chat model a question.
     * @param question The quesiton.
     * @return A promise that resolves when finished.
     */
    async ask(question) {
        const reply = await this.chatModel.ask(question);
        if (reply) {
            await this.reply(reply);
        } else {
            if (this.onSilentReply) {
                this.onSilentReply();
            }
        }
    }

    /**
     * Replies with a message.
     * @param message The message.
     */
    async reply(message) {
        await this.textToSpeech.say(message, () => {
            this.playTalkAnimation();
            if (this.onReplyStart) {
                this.onReplyStart(message);
            }
        });
        this.stopTalkAnimation();
        if (this.onReplyEnd) {
            this.onReplyEnd(message);
        }
    }

    /**
     * Plays the talking animation.
     * @internal
     */
    playTalkAnimation() {
        embedSDK.stopAnimation(this.ASSISTANT);
        embedSDK.playAnimation(this.ASSISTANT, this.TALK_ANIMATION, true);
    }

    /**
     * Stops the talking animation.
     * @internal
     */
    stopTalkAnimation() {
        embedSDK.stopAnimation(this.ASSISTANT);
        embedSDK.playAnimation(this.ASSISTANT, this.IDLE_ANIMATION, true);
    }

    /**
     * Gets the language of the experience.
     * @return The language of the experience.
     */
    getLanguage() {
        const regExp = /^([a-z]{2})(?:-[a-zA-Z]{2})?$/;
        if (this.lang) {
            const match = regExp.exec(this.lang)[1];
            if (match) return match;
        }
        const params = new URLSearchParams(window.location.search);
        if (params.get('lang')) {
            const match = regExp.exec(params.get('lang'))[1];
            if (match) return match;
        }
        const match = regExp.exec(navigator.language)[1];
        if (match) return match;
        return 'en';
    }

}

/**
 * This class is in charge of handling the interaction with the custom html and css code.
 */
class OxExperienceUI {

    /**
     * URL of the microphone animation.
     */
    MICROPHONE_ICON_URL = 'https://www.onirix.com/ox-experiences/onirix-assistant/microphone.json';

    /**
     * HTML constants.
     */
    VOICE_BUTTON = 'voice-button';
    TEXT_BUTTON = 'text-button';
    MICROPHONE_ICON = 'microphone-icon';
    STATUS_BAR = 'status';
    TOP_BAR = 'top-bar';
    TEXT_FORM = 'text-form';
    CLOSE_TEXT_FORM = 'close-text-form';
    QUESTION_TEXT = 'question-text';

    /**
     * Reference to the microphone icon Lottie instance.
     */
    microphoneIcon = null;

    /**
     * Callback called when the user asks a question.
     */
    onAsk = null;

    /**
     * Callback called when the user requests to asks a question.
     */
    onAskRequest = null;

    /**
     * Constructor
     * Initializes the UI elements.
     */
    constructor() {
        // Bind handlers
        this.onVoiceButtonClick = this.onVoiceButtonClick.bind(this);
        this.onTextButtonClick = this.onTextButtonClick.bind(this);
        this.onCloseTextFormClick = this.onCloseTextFormClick.bind(this);
        this.onTextFormSubmit = this.onTextFormSubmit.bind(this);

        // Register DOM events
        document.getElementById(this.VOICE_BUTTON).addEventListener('click', this.onVoiceButtonClick);
        document.getElementById(this.TEXT_BUTTON).addEventListener('click', this.onTextButtonClick);
        document.getElementById(this.CLOSE_TEXT_FORM).addEventListener('click', this.onCloseTextFormClick);
        document.getElementById(this.TEXT_FORM).addEventListener('submit', this.onTextFormSubmit);

        // Load microphone animation
        this.microphoneIcon = Lottie.loadAnimation({
            container: document.getElementById(this.MICROPHONE_ICON),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: this.MICROPHONE_ICON_URL,
        });
    }

    /**
     * Handler called when the VOICE_BUTTON has been clicked.
     * @param event MouseEvent instance.
     * @internal
     */
    onVoiceButtonClick(event) {
        event.preventDefault();
        this.hideAskButtons();
        if (this.onAskRequest) {
            this.onAskRequest();
        }
    }

    /**
     * Handler called when the TEXT_BUTTON has been clicked.
     * @param event MouseEvent instance.
     * @internal
     */
    onTextButtonClick(event) {
        event.preventDefault();
        this.hideAskButtons({fadeVoiceButton: true, fadeTextButton: true});
        this.showTextForm();
    }

    /**
     * Handler called when the CLOSE_TEXT_FORM has been clicked.
     * @param event MouseEvent instance
     * @internal
     */
    onCloseTextFormClick(event) {
        event.preventDefault();
        this.hideTextForm(true);
        this.showAskButtons();
        document.getElementById(this.TEXT_FORM).reset();
    }

    /**
     * Handler called when the TEXT_FORM is submitted.
     * @param event SubmitEvent instance
     * @internal
     */
    onTextFormSubmit(event) {
        event.preventDefault();
        const question = document.getElementById(this.QUESTION_TEXT).value;
        document.getElementById(this.TEXT_FORM).reset();
        this.hideAskButtons();
        this.hideTextForm();
        this.showStatus();
        this.setStatusToThinking();
        if (this.onAsk) {
            this.onAsk(question);
        }
    }

    /**
     * Shows an element.
     */
    show(element) {
        document.getElementById(element).classList.remove('hidden', 'faded');
    }

    /**
     * Hides an element.
     */
    hide(elementName) {
        const element = document.getElementById(elementName);
        element.classList.add('hidden');
        if (element.classList.contains('faded')) {
            element.classList.remove('faded');
        }
    }

    /**
     * Fades an element.
     */
    fade(elementName) {
        const element = document.getElementById(elementName);
        element.classList.add('faded');
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        }
    }

    /**
     * Shows text form.
     */
    showTextForm() {
        this.show(this.TEXT_FORM);
    }

    /**
     * Hides text form.
     */
    hideTextForm(fade = false) {
        if (fade) {
            this.fade(this.TEXT_FORM);
        } else {
            this.hide(this.TEXT_FORM);
        }
    }

    /**
     * Shows ask button.
     */
    showAskButtons() {
        this.show(this.VOICE_BUTTON);
        this.show(this.TEXT_BUTTON);
    }

    /**
     * Hides ask button.
     */
    hideAskButtons(options) {
        options = {
            fadeVoiceButton: false,
            fadeTextButton: false,
            ...options,
        };
        if (options.fadeVoiceButton) {
            this.fade(this.VOICE_BUTTON);
        } else {
            this.hide(this.VOICE_BUTTON);
        }
        if (options.fadeTextButton) {
            this.fade(this.TEXT_BUTTON);
        } else {
            this.hide(this.TEXT_BUTTON);
        }
    }

    /**
     * Shows status bar.
     */
    showStatus() {
        this.show(this.STATUS_BAR);
    }

    /**
     * Shows top bar.
     */
    showTopBar() {
        this.show(this.TOP_BAR);
    }

    /**
     * Hides top bar.
     */
    hideTopBar() {
        this.hide(this.TOP_BAR);
    }

    /**
     * Sets the status bar to listening.
     */
    setStatusToListening() {
        document.getElementById(this.STATUS_BAR).classList.add('listening');
        document.getElementById(this.STATUS_BAR).classList.remove('thinking');
        this.playListenAnimation();
    }

    /**
     * Sets the status bar to thinking.
     */
    setStatusToThinking() {
        document.getElementById(this.STATUS_BAR).classList.remove('listening');
        document.getElementById(this.STATUS_BAR).classList.add('thinking');
    }

    /**
     * Hides status bar.
     */
    hideStatus() {
        this.hide(this.STATUS_BAR);
    }

    /**
     * Plays the listening animation.
     */
    playListenAnimation() {
        this.microphoneIcon.goToAndPlay(0, false);
    }

    /**
     * Stops the listening animation.
     */
    stopListenAnimation() {
        this.microphoneIcon.stop();
    }

}

/**
 * This class is in charge of playing a text string with a human voice.
 */
class PollyTextToSpeech {

    /**
     * URL of the AWS SDK.
     */
    AWS_SDK_URL = 'https://sdk.amazonaws.com/js/aws-sdk-2.1401.0.min.js';

    /**
     * Region of AWS to use.
     */
    AWS_REGION = '<YOUR_AWS_REGION_HERE>';

    /**
     * Credentials.
     */
    AWS_IDENTITY_POOL_ID = '<YOUR_IDENTITY_POOL_ID_HERE>';
    
    /**
     * API version to use.
     */
    POLLY_API_VERSION = '2016-06-10';

    /**
     * Default params to use when converting text to speech.
     */
    POLLY_DEFAULT_PARAMS = {
        OutputFormat: 'mp3',
        SampleRate: '16000',
        TextType: 'text'
    }

    /**
     * Voice for each language.
     */
    POLLY_VOICES = {
        'en': 'Joey',
        'es': 'Enrique'
    }

    /**
     * HTML audio element used to play the audio.
     */
    audio = null;

    /**
     * HTML source element used to play the audio.
     */
    source = null;

    /**
     * Polly API instance.
     */
    polly = null;

    /**
     * Id of the voice.
     */
    voiceId = null;

    /**
     * Initializes the instance.
     * @param lang Language of the experience.
     * @return A promise that resolves when initialized. 
     */
    async init(lang) {
        this.setUpVoice(lang);
        this.createAudioElement();
        await this.injectAWSSDK();
        this.configureAWSSDK();
        this.buildPolly();
    }

    /**
     * Loads the voice depending on the language.
     * @param lang The language.
     * @internal
     */
    setUpVoice(lang) {
        if (lang in this.POLLY_VOICES) {
            this.voiceId = this.POLLY_VOICES[lang];
        } else {
            this.voiceId = this.POLLY_VOICES['en'];
        }
    }

    /**
     * Creates the HTML elements needed to play the audios.
     * @internal
     */
    createAudioElement() {
        this.audio = document.createElement('audio');
        this.audio.hidden = true;
        this.audio.autoplay = false;
        this.source = document.createElement('source');
        this.source.type = 'audio/mp3';
        this.source.src = '';
        this.audio.appendChild(this.source);
        document.body.appendChild(this.audio);
        document.addEventListener('click', () => {
            this.audio.play();
            this.audio.pause();
        }, { once: true });
    }

    /**
     * Injects AWS SDK.
     * @internal
     */
    injectAWSSDK() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = this.AWS_SDK_URL;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Configures AWS region and credentials.
     * @internal
     */
    configureAWSSDK() {
        AWS.config.region = this.AWS_REGION;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: this.AWS_IDENTITY_POOL_ID });
    }

    /**
     * Builds AWS Polly instance.
     * @internal
     */
    buildPolly() {
        this.polly = new AWS.Polly({ apiVersion: this.POLLY_API_VERSION });
    }

    /**
     * Gets the URL of a message converted to audio.
     * @param message Message to convert to speech.
     * @return A promise of the URL of the audio for the message.
     * @internal
     */
    getAudioUrlForMessage(message) {
        const params = {
            ...this.POLLY_DEFAULT_PARAMS,
            Text: message,
            VoiceId: this.voiceId,
        };
        const presigner = new AWS.Polly.Presigner(this.POLLY_DEFAULT_PARAMS, this.polly);
        return new Promise((resolve, reject) => {
            presigner.getSynthesizeSpeechUrl(params, (error, url) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(url);
                }
            });
        });
    }

    /**
     * Loads the audio in an URL.
     * @param url URL of an audio to play.
     * @return A promise that resolves when the audio has finished playing.
     * @internal
     */
    load(url) {
        return new Promise(resolve => {
            this.source.src = url;
            this.audio.load();
            this.audio.addEventListener('canplaythrough', resolve, { once: true });
        });
    }

    /**
     * Plays the audio in an URL.
     * @return A promise that resolves when the audio has finished playing.
     * @internal
     */
    play() {
        return new Promise(resolve => {
            this.audio.play();
            this.audio.addEventListener('ended', resolve, { once: true });
        });
    }

    /**
     * Says a message.
     * @param message Message to play.
     * @param onPlayStart Callback called when the message starts playing.
     * @return A promise that resolves when the message has been said.
     */
    async say(message, onPlayStart = undefined) {
        const url = await this.getAudioUrlForMessage(message);
        await this.load(url);
        if (onPlayStart) {
            onPlayStart();
        }
        await this.play();
    }
}

/**
 * This class is responsible of the communication with the GPT35 chat model.
 */
class GPT35ChatModel {

    /**
     * Chat model API url.
     */
    API_URL = 'https://<YOUR_PROJECT_HERE>.openai.azure.com/openai/deployments/<YOUR_MODEL_HERE>/chat/completions?api-version=2023-05-15';

    /**
     * Chat model API key.
     */
    API_KEY = '<YOUR_API_KEY_HERE>';

    /**
     * Set of available languages.
     */
    AVAILABLE_LANGUAGES = new Set(['es', 'en']);

    /**
     * Settings url.
     */
    SETTINGS_URL = 'https://www.onirix.com/ox-experiences/onirix-assistant/settings';

    /**
     * Initial system message.
     */
    systemMessage = null;

    /**
     * Initializes the instance.
     * @param lang Language of the experience.
     * @return A promise that resolves when initialized.
     */
    async init(lang) {
        await this.loadSystemMessage(lang);
    }

    /**
     * Loads the system message into `systemMessage`.
     * @param lang Language of the experience.
     * @return A promise that resolves when loaded.
     * @internal
     */
    async loadSystemMessage(lang) {
        /*
        this.systemMessage = {
            role: 'system',
            content: 'You cannot break these rules: you must reply in the language you have been spoken in.'
        };
        */
        const response = await fetch(this.getSystemMessageUrl(lang));
        const message = await response.text();
        this.systemMessage = {
            role: 'system',
            content: message
        };
    }

    /**
     * Gets the URL of the system message.
     * @param lang Language.
     * @return The url of the settings.
     * @internal
     */
    getSystemMessageUrl(lang) {
        if (this.AVAILABLE_LANGUAGES.has(lang)) {
            return `${this.SETTINGS_URL}/system-message.${lang}.txt`;
        } else {
            return `${this.SETTINGS_URL}/system-message.en.txt`;
        }
    }

    /**
     * Builds the context of the API call from previous messages.
     * @param userMessage Last user message.
     * @return A list of messages.
     * @internal
     */
    getContext(userMessage) {
        return [
            this.systemMessage,
            userMessage,
        ];
    }
    
    /**
     * Asks a question to the chat model.
     * @param message The question.
     * @return A promise of the reply.
     */
    async ask(message) {
        const headers = {
            'api-key': this.API_KEY,
            'Content-Type': 'application/json'
        };
        const context = this.getContext({role: 'user', content: message});
        const response = await fetch(this.API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ messages: context })
        });
        const responseData = await response.json();
        const choice = responseData.choices[0];
        if (choice.finish_reason !== 'stop') {
            return undefined;
        } else {
            return choice.message.content;
        }
    }

}

/**
 * Class responsible for listening to the user and transcribing wheat they say.
 * Uses WebSpeechAPI non-continuous mode.
 */
class WebSpeechAPISpeechToText {

    /**
     * Instance of the WebSpeechAPI SpeechRecognition object.
     */
    recognizer = null;

    /**
     * Callback called when the class starts listening.
     */
    onListenStart = null;

    /**
     * Callback called when the class stops listening.
     */
    onListenEnd = null;

    /**
     * Inititalizes the class.
     * @param lang The language.
     * @return A promise that resolves when initialized.
     */
    async init(lang) {
        const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
        this.recognizer = new SpeechRecognition();
        this.recognizer.continuous = false;
        this.recognizer.interimResults = true;
        this.setRecognizerLang(lang);
        this.recognizer.addEventListener('audiostart', () => {
            if (this.onListenStart) {
                this.onListenStart();
            }
        });
        this.recognizer.addEventListener('audioend', () => {
            if (this.onListenEnd) {
                this.onListenEnd();
            }
        });
    }

    /**
     * Sets the language of the speech recognizer.
     * @param lang The language.
     * @internal
     */
    setRecognizerLang(lang) {
        switch (lang) {
            case 'es':
                this.recognizer.lang = 'es';
                break;
            case 'en':
            default:
                this.recognizer.lang = 'en';
                break;
        }
    }

    /**
     * Requests a message from the user.
     * @return A promise of the message.
     */
    request() {
        return new Promise(resolve => {
            this.recognizer.addEventListener('result', event => {
                const results = event.results;
                if (results.length > 0) {
                    const result = results[0];
                    if (result.length > 0) {
                        const alternative = result[0];
                        resolve(alternative.transcript);
                    } else {
                        resolve(null); // No alternatives
                    }
                } else {
                    resolve(null); // No results
                }
            }, { once: false });
            this.recognizer.start();
        });
    }

}

/**
 * Class responsible for listening to the user and transcribing wheat they say.
 * Uses WebSpeechAPI continuous mode to polyfill non-continuous mode.
 */
class PolyfillSpeechToText {

    /**
     * Time since a detection to consider that the user is silent.
     */
    TENTATIVE_TIMEOUT = 2000;

    /**
     * Time the user has to be silent before we stop listening.
     */
    END_TIMEOUT = 1000;

    /**
     * Silence detection timeout.
     */
    tentativeTimeout = undefined;

    /**
     * Stop timeout.
     */
    endTimeout = undefined;

    /**
     * Last speech recognition result.
     */
    lastResult = null;

    /**
     * Resolve method for the promise in request.
     */
    resolve = null;

    /**
     * WebSpeechAPI Speech Recognition instance.
     */
    recognizer = null;

    /**
     * Callback called when the object starts listening.
     */
    onListenStart = null;

    /**
     * Callback called when the user talks again after being silent.
     */
    onListenResume = null;

    /**
     * Callback called when the user becomes silent.
     */
    onListenTentativeEnd = null;

    /**
     * Callback called when the object stops listening.
     */
    onListenEnd = null;

    /**
     * Constructs a instance of the class.
     */
    constructor () {
        this.handleResult = this.handleResult.bind(this);
        this.commitResult = this.commitResult.bind(this);
        this.endTentatively = this.endTentatively.bind(this);
    }

    /**
     * Initializes the instance of the object.
     * @param lang The language.
     * @return A promise that resolves when finished.
     */
    async init(lang) {
        const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
        this.recognizer = new SpeechRecognition();
        this.recognizer.continuous = true;
        this.recognizer.interimResults = true;
        this.setRecognizerLang(lang);
        this.recognizer.addEventListener('result', this.handleResult);
        this.recognizer.addEventListener('audiostart', () => {
            if (this.onListenStart) {
                this.onListenStart();
            }
            this.ping();
        });
        this.recognizer.addEventListener('audioend', () => {
            if (this.onListenEnd) {
                this.onListenEnd();
            }
        });
    }

    /**
     * Sets the language of the recognizer.
     * @param lang The language.
     * @internal
     */
    setRecognizerLang(lang) {
        switch (lang) {
            case 'es':
                this.recognizer.lang = 'es';
                break;
            case 'en':
            default:
                this.recognizer.lang = 'en';
                break;
        }
    }

    /**
     * Handle speech recognition results.
     * @param event SpeechEvent instance.
     * @internal
     */
    handleResult(event) {
        this.ping();
        const results = event.results;
        if (results.length > 0) {
            const result = results[0];
            if (result.length > 0) {
                const alternative = result[0];
                this.lastResult = alternative.transcript;
            } else {
                this.lastResult = null;
            }
        } else {
            this.lastResult = null;
        }
    }

    /**
     * Commits the last result and stops the speech recognition.
     * @internal
     */
    commitResult() {
        this.endTimeout = null;
        this.recognizer.stop();
        const resolve = this.resolve;
        const result = this.lastResult;
        this.lastResult = null;
        this.resolve = null;
        resolve(result);
    }

    /**
     * Silent detector ping.
     * After a second has passed without pings, the user is considered silent.
     * After a second has passed without pings while the user is silent, the speech recognizer stops.
     * @internal
     */
    ping() {
        if (this.endTimeout) {
            window.clearTimeout(this.endTimeout);
            this.endTimeout = null;
            if (this.onListenResume) {
                this.onListenResume();
            }
        }
        if (this.tentativeTimeout) {
            window.clearTimeout(this.tentativeTimeout);
            this.tentativeTimeout = null;
        }
        this.tentativeTimeout = window.setTimeout(this.endTentatively, this.TENTATIVE_TIMEOUT);
    }

    /**
     * Sets up the end timeout. If no ping is received before it fires, the speech recognition ends.
     * @internal
     */
    endTentatively() {
        if (!this.endTimeout) {
            this.tentativeTimeout = null;
            if (this.onListenTentativeEnd) {
                this.onListenTentativeEnd();
            }
            this.endTimeout = window.setTimeout(this.commitResult, this.END_TIMEOUT);
        }
    }

    /**
     * Requests a message from the user.
     */
    request() {
        return new Promise(resolve => {
            this.resolve = resolve;
            this.recognizer.start();
        });
    }

}

/**
 * Onirix Embed SDK allows you to listen to events and control the scene when embedding experiences in a custom domain or from the online code editor.
 * For more information visit https://docs.onirix.com/onirix-sdk/embed-sdk
 */
import OnirixEmbedSDK from 'https://www.unpkg.com/@onirix/embed-sdk@1.8.0/dist/ox-embed-sdk.esm.js';
const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();

const oxExperience = new OxExperience(embedSDK);
const oxExperienceUI = new OxExperienceUI();

const polly = new PollyTextToSpeech();
polly.init(oxExperience.getLanguage()).then(() => oxExperience.setTextToSpeech(polly));

const gpt35 = new GPT35ChatModel();
gpt35.init(oxExperience.getLanguage()).then(() => oxExperience.setChatModel(gpt35));

const speechRecognizer = new PolyfillSpeechToText();
speechRecognizer.init(oxExperience.getLanguage()).then(() => oxExperience.setSpeechToText(speechRecognizer));

oxExperience.onLoad = () => {
    oxExperienceUI.showAskButtons();
    oxExperienceUI.showTopBar();
}

oxExperience.onLost = () => {
    oxExperienceUI.hideAskButtons();
    oxExperienceUI.hideTopBar();
}

oxExperienceUI.onAsk = async (question) => {
    await oxExperience.ask(question);
}

oxExperienceUI.onAskRequest = async () => {
    await oxExperience.requestAsk();
}

oxExperience.onListenStart = () => {
    oxExperienceUI.showStatus();
    oxExperienceUI.setStatusToListening();
}

oxExperience.onListenResume = () => {
    oxExperienceUI.playListenAnimation();
}

oxExperience.onListenTentativeEnd = () => {
    oxExperienceUI.stopListenAnimation();
}

oxExperience.onListenEnd = () => {
    oxExperienceUI.setStatusToThinking();
}

oxExperience.onReplyStart = () => {
    oxExperienceUI.hideStatus();
}

oxExperience.onReplyEnd = () => {
    oxExperienceUI.showAskButtons();
}

oxExperience.onSilentReply = () => {
    oxExperienceUI.hideStatus();
    oxExperienceUI.showAskButtons();
}