import {ParkingComponent} from "../../components/parking/index.js";
import {MainPage} from "../main/index.js";
import {HeaderComponent} from "../../components/header/index.js";

import {ajax} from "../../modules/ajax.js";
import {parkingUrls} from "../../modules/parkingUrls.js";

export class ParkingPage {
    constructor(parent, cardID) {
        this.parent = parent;
        this.cardID = cardID;
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

    getData() {
        ajax.get(parkingUrls.getParkingById(this.cardID), (data) => {
            this.renderData(data);
        })
    }

    renderData(data) {
        const parking = new ParkingComponent(this.pageRoot);
        parking.render(data);
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(this.pageRoot);
        header.render();

        this.getData();
    }
}