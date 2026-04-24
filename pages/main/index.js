import {ParkingCardComponent} from "../../components/parking_card/index.js";
import {CardControlComponent} from "../../components/card_control/index.js";
import {HeaderComponent} from "../../components/header/index.js";

function isPalindrom(parkingSesionID) {
    const sInput = parkingSesionID.toString().toLowerCase();
    const leftPart = sInput.slice(0, sInput.length / 2);
    const rightPart = sInput.slice(sInput.length / 2 + (sInput.length % 2), sInput.length);
    let rightPartReversed = "";
    for (let i = rightPart.length - 1; i > -1; i--) rightPartReversed += rightPart[i];
    return (leftPart === rightPartReversed);
    /*
    const sInput = parkingSesionID.toString().toLowerCase();
    let i = 0;
    let j = sInput.length - 1;
    while (i < j) {
        if (sInput[i] != sInput[j]) return false;
        i++;
        j--;
    }
    return true;
    */
}

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.scopeCards = [];
        this.init = false;
        this.filter = "";
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
                src: "../../resources/images/MBimage.png",
                title: "Главное здание",
                text: "Парковка у главного входа в ГУК МГТУ",
                im_desc: "Изображение ГЗ со стороны праковки",
                page_src: "../../resources/images/MBimage cropped.JPG"
            },
            {
                id: 2,
                src: "../../resources/images/LLCimage.png",
                title: "Учебно-лабораторный корпус",
                text: "Парковка у УЛК МГТУ",
                im_desc: "Изображение УЛК со стороны праковки",
                page_src: "../../resources/images/LLCimage cropped.JPG"
            },
            {
                id: 3,
                src: "../../resources/images/SCimage.png",
                title: "Спортивный комплекс",
                text: "Парковка на территории СК МГТУ\n",
                im_desc: "Изображение СК",
                page_src: "../../resources/images/SCimage cropped.JPG"
            },
            {
                id: 4,
                src: "../../resources/images/CCimage.png",
                title: "Конгресс-центр",
                text: "Парковка во дворе конгресс-центра МГТУ",
                im_desc: "Изображение конгресс-центра",
                page_src: "../../resources/images/CCimage cropped.JPG"
            }
        ];
    }

    clickCard(e) {
        let cardId = e.target.dataset.id;
        if (cardId > 4) {
            cardId = 1;
        }
        window.location.href = `pages/parking/parking.html?id=${cardId}`;
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
        let new_card = {
                id: 0,
                src: "",
                title: "",
                text: "",
                im_desc: "",
                page_src: ""
        };
        new_card.src = this.scopeCards[0].src;
        new_card.title = this.scopeCards[0].title;
        new_card.text = this.scopeCards[0].text;
        new_card.im_desc = this.scopeCards[0].im_desc;
        new_card.page_src = this.scopeCards[0].page_src;
        if (isPalindrom(new_card.title)) new_card.isp = "палиндром";
        else new_card.isp = "не палиндром";
        let new_id = 0;
        for (let i = 0; i < this.scopeCards.length; i++) {
            new_id = Math.max(new_id, this.scopeCards[i].id);
        }
        new_card.id = new_id + 1;
        this.scopeCards.push(new_card);
        this.render();
    }

    findCard(e) {
        this.filter = document.getElementById("find_card_title").value;
        this.render();
    }
    
    render() {
        this.parent.innerHTML = '';

        const header = new HeaderComponent(this.parent);
        header.render();

        const adder = new CardControlComponent(this.parent);
        adder.render(this.addCard.bind(this), this.findCard.bind(this));

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        if (!this.init) {
            const data = this.getCardsData();
            data.forEach((item) => {
                const parkingCard = new ParkingCardComponent(this.pageRoot());
                this.scopeCards.push(item);
                if (isPalindrom(item.title)) item.isp = "палиндром";
                else item.isp = "не палиндром";
                parkingCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this));
            });
            this.init = true;
        }
        else {
            this.scopeCards.forEach((item) => {
                if (item.title === this.filter || this.filter === "") {
                    const parkingCard = new ParkingCardComponent(this.pageRoot());
                    if (isPalindrom(item.title)) item.isp = "палиндром";
                    else item.isp = "не палиндром";
                    parkingCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this));
                }
            });
        }
    }
}