import {ParkingComponent} from "../../components/parking/index.js";
import {BackButtonComponent} from "../../components/back_button/index.js";
import {MainPage} from "../main/index.js";

export class ParkingPage {
    constructor(parent, sourceData, cardID) {
        this.parent = parent;
        this.sourceData = sourceData;
        this.cardID = cardID;
        this.sourceImages = [
            "../../resources/MBimage cropped.JPG",
            "../../resources/LLCimage cropped.JPG",
            "../../resources/SCimage cropped.JPG",
            "../../resources/CCimage cropped.JPG"
        ];
    }

    get pageRoot() {
        return document.getElementById('parking-page');
    }

    getHTML() {
        return (
            `
                <div id="parking-page"></div>
            `
        );
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render(false);
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.sourceData;
        if (!data.custom) data.src = this.sourceImages[this.cardID - 1];
        else data.src = "";
        const stock = new ParkingComponent(this.pageRoot);
        stock.render(data);
    }
}