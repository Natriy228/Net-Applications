import {ParkingCardComponent} from "../../components/parking_card/index.js";
import {ParkingPage} from "../product/index.js";
import {CardAdderComponent} from "../../components/card_adder/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.scopeCards = [];
        this.init = false;
    }

    pageRoot() {
        return document.getElementById('main-page');
    }
    
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap" style="justify-content: center"><div/>
            `
        );
    }

    getCardsData() {
        return [
            {
                id: 1,
                src: "../../resources/MBimage.png",
                title: "Главное здание",
                text: "Парковка у главного входа в ГУК МГТУ",
                im_desc: "Изображение ГЗ со стороны праковки",
                custom: false
            },
            {
                id: 2,
                src: "../../resources/LLCimage.png",
                title: "Учебно-лабораторный корпус",
                text: "Парковка у УЛК МГТУ",
                im_desc: "Изображение УЛК со стороны праковки",
                custom: false
            },
            {
                id: 3,
                src: "../../resources/SCimage.png",
                title: "Спортивный комплекс",
                text: "Парковка на территории СК МГТУ\n",
                im_desc: "Изображение СК",
                custom: false
            },
            {
                id: 4,
                src: "../../resources/CCimage.png",
                title: "Конгресс-центр",
                text: "Парковка во дворе конгресс-центра МГТУ",
                im_desc: "Изображение конгресс-центра",
                custom: false
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        let sourceData = 0;
        for (let i = 0; i < this.scopeCards.length; i++) {
            if (this.scopeCards[i].id === parseInt(cardId)) {
                sourceData = this.scopeCards[i];
                break;
            }
        }
        const parkingPage = new ParkingPage(this.parent, sourceData, cardId, this.scopeCards);
        parkingPage.render();
    }

    deleteCard(e) {
        const cardId = e.target.dataset.id;
        for (let i = 0; i < this.scopeCards.length; i++) {
            if (this.scopeCards[i].id === parseInt(cardId)) {
                this.scopeCards.splice(i, 1);
                break;
            }
        }
        this.render();
    }

    addCard(e) {
        const new_title = document.getElementById('new_card_title').value;
        const new_desc = document.getElementById('new_card_desc').value;
        const new_card = {
                id: 0,
                src: "https://i.quotev.com/7l4jxq7yqfmq.jpg",
                title: new_title,
                text: new_desc,
                im_desc: "Заглушка изображения новой карточки",
                custom: true
            };
        let new_id = 0;
        for (let i = 0; i < this.scopeCards.length; i++) {
            new_id = Math.max(new_id, this.scopeCards[i].id);
        }
        new_card.id = new_id + 1;
        this.scopeCards.push(new_card);
        this.render();
    }
    
    render() {
        this.parent.innerHTML = '';

        const adder = new CardAdderComponent(this.parent);
        adder.render(this.addCard.bind(this));

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        if (!this.init) {
            const data = this.getCardsData();
            data.forEach((item) => {
                const parkingCard = new ParkingCardComponent(this.pageRoot());
                this.scopeCards.push(item);
                parkingCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this));
            });
            this.init = true;
        }
        else {
            this.scopeCards.forEach((item) => {
                const parkingCard = new ParkingCardComponent(this.pageRoot());
                parkingCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this));
            });
        }
    }
}