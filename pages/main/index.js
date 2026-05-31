import {ParkingCardComponent} from "../../components/parking_card/index.js";
import {ParkingPage} from "../product/index.js";
import {CardControlComponent} from "../../components/card_control/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {CardEditPage} from "../card_edit/index.js"

import {ajax} from "../../modules/ajax.js";
import {parkingUrls} from "../../modules/parkingUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    pageRoot() {
        return document.getElementById('main-page');
    }
    
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap" style="justify-content: left"><div/>
            `
        );
    }

    getCardsData() {
        ajax.get(parkingUrls.getParkings(), (data) => {
            this.renderCards(data);
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const parkingPage = new ParkingPage(this.parent, cardId);
        parkingPage.render();
    }
    
    editCard(e) {
        const cardId = e.target.dataset.id;
        const editPage = new CardEditPage(this.parent, cardId, true);
        editPage.render();
    }

    deleteCard(e) {
        const cardId = e.target.dataset.id;
        ajax.delete(parkingUrls.removeParkingById(cardId), (rdata) => {this.render();});
    }

    addCard(e) {
        const editPage = new CardEditPage(this.parent, 0, false);
        editPage.render();
    }

    findCard(e) {
        this.pageRoot().innerHTML = '';
        ajax.get(parkingUrls.getParkingsByTitle(document.getElementById('find_card_title').value), (data) => {
            this.renderCards(data);
        });
    }
    
    renderCards(scoped) {
        scoped.forEach((item) => {
            const parkingCard = new ParkingCardComponent(this.pageRoot());
            parkingCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this), this.editCard.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render();

        const adder = new CardControlComponent(this.parent);
        adder.render(this.addCard.bind(this), this.findCard.bind(this));

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getCardsData();
    }
}