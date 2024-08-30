
/**
 * This class is in charge of handling the interaction with the AR experience through the EmbedSDK.
 */
class OxExperience {
    /**
     * Elements of the AR experience
     */
    items = [
        {
            oid: 'd78d4a5e77e84f6398e42236d45c2393',
            name: 'item_1',
            label: 'Nike Revolution 6',
            added: false ,
            datasheet: null,
            details: "details-label-nike"
        },
        {
            oid: '6fe99a59953041aabfd9bc45ab85752d',
            name: 'item_2',
            label: 'Adidas Runfalcon',
            added: false,
            datasheet: null,
            details: "details-label-adidas"
        }
    ];

    /**
     * Positions of the elements in the daatsheet
     */
    NAME_POISITON = 0;
    THUMBNAIL_POSITION = 1;
    EXCERPT_POSITION = 2;
    BUTTON_TEXT_POSITION = 3;
    BUTTON_URL_POSITION = 4;

    /**
     * Name of the template
     */
    TEMPLATE_NAME = "ox-info-card";

    /**
     * Constructor
     * Initialize the embedSDK
     * 
     * @param   embedsdk allows you to lister to events and control the scene content
     */
    constructor(embedSDK) {
        this.embedSDK = embedSDK;
    }

    /**
     * Get an element based on the index
     * 
     * @param   index of the element
     * @return  an element
     */
    getItem(index) {
        return this.items[index];
    }

    /**
     * Disable one elemento
     * 
     * @param   identifier of the element
     */
    disable(oid) {
        this.embedSDK.disable(oid);
    }

    /**
     * Enable one element
     * 
     * @param   identifier of the element
     */
    enable(oid) {
        this.embedSDK.enable(oid);
    }

    /**
     * Get the number of elements
     * 
     * @return  number of elements
     */
    getSize() {
        return this.items.length;
    }

    /**
     * Update the added property of an element
     * 
     * @param   index of the element
     */
    changeAdded(index) {
        this.items[index].added = !this.items[index].added;
    }

    /**
     * Get all added items
     * 
     * @return  number of added items
     */
    getAddedItems() {
        return this.items.filter(item => item.added).length;
    }

    /**
     * Find the elements that have a certain oid and a daatsheet with a certain template name and assign its datasheets to our current items
     * 
     * @param   scene info
     */
    addDatasheets(params) {
        let i = 0;
        while (i < this.items.length) {
            params.elements.forEach(element => {
                if (element.oid == this.items[i]?.oid) {
                    this.items[i].datasheet = element.datasheets.find(datasheet => datasheet.template.name == this.TEMPLATE_NAME);
                    i++;
                }
            })
        }
    }

    /**
     * Get datasheet content and transform it
     * 
     * @param   element clicked name
     */
    async onClick(name) {
        const itemClicked = this.items.find(item => item.details == name);
        if (itemClicked) {
            const cardInfo = {
                name: Object.values(itemClicked.datasheet.content[this.NAME_POISITON])[0],
                thumbnail: URL.createObjectURL(await this.embedSDK.getAssetImage(Object.values(itemClicked.datasheet.content[this.THUMBNAIL_POSITION])[0])),
                excerpt: Object.values(itemClicked.datasheet.content[this.EXCERPT_POSITION])[0],
                buttonText: Object.values(itemClicked.datasheet.content[this.BUTTON_TEXT_POSITION])[0],
                buttonUrl: Object.values(itemClicked.datasheet.content[this.BUTTON_URL_POSITION])[0]
            }
            this.onOpenCardInfo(cardInfo);
        }
    }
}

/**
 * This class is in charge of handling the interaction with the custom html and css code.
 */
class OxExperienceUI {

    /**
     * HTML elements ids
     */
    PREVIOUS_BUTTON = "#trainars-previous";
    NEXT_BUTTON = "#trainars-next";
    ADD_BUTTON = "#trainars-add-item";
    ADDED_BUTTON = "#trainars-added";
    CONTROLS = "#trainars-controls";
    CONTROLS_NAME = ".trainars-controls__name";
    HEADER = "#trainars-header";
    HEADER_SPAN = ".trainars-header__bag span";
    CARD = "trainars-card";

    /**
     * Name of a class
     */
    HIDDEN = "hidden";

    /**
     * Index of the element selected
     */
    currentIndex = 0;

    /**
     * Add actions to the UI
     */
    initUI() {
        document.querySelector(this.PREVIOUS_BUTTON).addEventListener('click', () => this.getItem(embedSDK, false));

        document.querySelector(this.NEXT_BUTTON).addEventListener('click', () => this.getItem(embedSDK, true));

        document.querySelector(this.ADD_BUTTON).addEventListener('click', () => this.toggleItem());

        document.querySelector(this.ADDED_BUTTON).addEventListener('click', () => this.toggleItem());
    }

    /**
     * Get the index of the current element
     * 
     * @return  index of the element
     */
    getCurrentIndex() {
        return this.currentIndex;
    }

    /**
     * Shows the current element
     * 
     * @internal
     * @param   the arrow clicked
     */
    getItem(direction) {
        let currentItem = this.onGetItem(this.currentIndex);
        this.onDisable(currentItem.oid);
        const size = this.onGetSize()
        this.currentIndex += direction ? 1 : -1;
        if (this.currentIndex >= size) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = size - 1;
        }

        currentItem = this.onGetItem(this.currentIndex);
        this.onEnable(currentItem.oid);
        this.changeName(currentItem);
        this.checkAdded(currentItem);
    }

    /**
     * Add or delete an element from the bag and update the number of added items
     * 
     * @internal
     */
    toggleItem() {
        this.onChangeAdded(this.currentIndex);
        this.checkAdded(this.onGetItem(this.currentIndex));

        const bag = document.querySelector(this.HEADER_SPAN);
        const addedItems = this.onGetAddedItems();
        bag.textContent = addedItems ? addedItems : '';
    }

    /**
     * Check if an element is added and update the bag title
     * 
     * @param   item to add or no
     */
    checkAdded(item) {
        const add = document.querySelector(this.ADD_BUTTON);
        const added = document.querySelector(this.ADDED_BUTTON);
        if (item.added) {
            added.classList.remove(this.HIDDEN);
            add.classList.add(this.HIDDEN);
        } else {
            added.classList.add(this.HIDDEN);
            add.classList.remove(this.HIDDEN);
        }
    }


    /**
     * Update the name of the element in the UI
     * 
     * @param element data
     */
    changeName(currentItem) {
        const name = document.querySelector(this.CONTROLS_NAME);
        name.innerText = currentItem.label;
    }

    /**
     * Enable or diabled the view of the controls and the header
     */
    changeScreen() {
        const toggleHide = (id) => document.querySelector(id).classList.toggle(this.HIDDEN); 
        toggleHide(this.HEADER);
        toggleHide(this.CONTROLS);
    }

    /**
     * Creates the info card element
     * 
     * @param   info to add into the card
     */
    openCardInfo(cardInfo) {
        const card = document.createElement("div");
        card.id = this.CARD;

        const div = document.createElement("div");

        const close = document.createElement("img");
        close.src = "https://www.onirix.com/ox-experiences/trainars/close.svg";
        close.addEventListener("click", () => {
            document.body.removeChild(card);
        })
        
        const h1 = document.createElement("h1");
        h1.innerText = cardInfo.name;

        const header = document.createElement("div");
        header.appendChild(h1);
        header.appendChild(close);
        div.appendChild(header);

        const thumbnail = document.createElement("div");
        thumbnail.style.backgroundImage = `url(${cardInfo.thumbnail})`;
        div.appendChild(thumbnail);

        const p = document.createElement("p");
        p.innerText = cardInfo.excerpt;
        div.appendChild(p);

        const button = document.createElement("button");
        button.innerText = cardInfo.buttonText;
        button.addEventListener("click", () => {
            window.open(cardInfo.buttonUrl);
        });
        div.appendChild(button);
        
        card.appendChild(div);
        document.body.appendChild(card);
    }
}

/**
 * Onirix Embed SDK allows you to listen to events and control the scene when embedding experiences in a custom domain or from the online code editor.
 * For more information visit https://docs.onirix.com/onirix-sdk/embed-sdk
 */

import OnirixEmbedSDK from "https://unpkg.com/@onirix/embed-sdk@1.11.2/dist/ox-embed-sdk.esm.js";
const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();
const oxExperience = new OxExperience(embedSDK);
const oxExperienceUi = new OxExperienceUI();

    /**
     * Comunicates oxExperienceUi and oxExperience to get an element
     * 
     * @param   index of the element
     * @return  the element
     */
    oxExperienceUi.onGetItem = (index) => {
        return oxExperience.getItem(index);
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to get the number of elements
     * 
     * @return  numbre of elements
     */
    oxExperienceUi.onGetSize = () => {
        return oxExperience.getSize();
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to disable an element
     * 
     * @param identifier of the element
     */
    oxExperienceUi.onDisable = (oid) => {
        oxExperience.disable(oid);
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to enable an element
     * 
     * @param identifier of the element
     */
    oxExperienceUi.onEnable = (oid) => {
        oxExperience.enable(oid);
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to change the added elements
     * 
     * @param index of the element
     */
    oxExperienceUi.onChangeAdded = (index) => {
        oxExperience.changeAdded(index);
    }

    /**
     * Comunicates oxExperienceUi and oxExperience to gel all added elements
     * 
     * @return number of added elements
     */
    oxExperienceUi.onGetAddedItems = () => {
        return oxExperience.getAddedItems();
    }

    /**
     * Comunicates de oxExperience and OxExperience Ui to show the card
     * 
     * @param   info about the product
     */
    oxExperience.onOpenCardInfo = (cardInfo) => {
        oxExperienceUi.openCardInfo(cardInfo);
    }

    /**
     * It's execute when the scene is totally load and it start the game
     */
    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOAD_END, (params) => {
        oxExperienceUi.initUI();
        oxExperienceUi.changeName(oxExperience.getItem(oxExperienceUi.getCurrentIndex()));
        oxExperienceUi.checkAdded(oxExperience.getItem(oxExperienceUi.getCurrentIndex()));
        oxExperienceUi.changeScreen();
        oxExperience.addDatasheets(params);
    });

    /**
     * Will be triggered when you lose sight of the image and the scene is removed
     */
    embedSDK.subscribe(OnirixEmbedSDK.Events.SCENE_LOST, (params) => {
        oxExperienceUi.changeScreen();
    });

    /**
     * Will be triggered when an asset is clicked
     */
    embedSDK.subscribe(OnirixEmbedSDK.Events.ELEMENT_CLICK, (params) => {
        oxExperience.onClick(params.name);
    })
