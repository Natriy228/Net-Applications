import {EditParkingCardComponent} from "../../components/card_edit/index.js";
import {MainPage} from "../main/index.js";
import {HeaderComponent} from "../../components/header/index.js";

import {ajax} from "../../modules/ajax.js";
import {parkingUrls} from "../../modules/parkingUrls.js";

export class CardEditPage {
    constructor(parent, cardID, isEdit) {
        this.parent = parent;
        this.cardID = cardID;
        this.isEdit = isEdit;
    }

    get pageRoot() {
        return document.getElementById('card-edit-page');
    }

    getHTML() {
        const textBefore = (this.isEdit ? "Реадктирование" : "Добавление");
        return (
            `
                <div id="card-edit-page">
                    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center", id="edit-space">
                        <h2 style="margin-bottom: 20px">${textBefore} карточки</h2>
                    </div>

                    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center">
                        <table style="margin-top: 40px">
                            <tr>
                                <td style="padding-top: 7px; padding-right: 20px">
                                    <p>Добавление картинки:</p>
                                </td>
                                <td style="padding-top: 7px">
                                    <input class="inp-primary" type="text" id="new_image_src" style="width: 270px; margin-bottom: 7px">
                                </td>
                                <td>
                                    <button class="btn btn-primary" id="select-image">Применить</button>
                                </td>
                            </tr>
                        </table>

                        <button class="btn btn-primary" id="complete">Завершить редактирование</button>
                </div>
            `
        );
    }

    getData() {
        if (this.isEdit) {
            ajax.get(parkingUrls.getParkingById(this.cardID), (data) => {
                this.renderData(data);
            })
        }
        else {
            const data = {
                title: "",
                text: ""
            }
            this.renderData(data);
        }
    }

    changeImage() {
        document.getElementsByClassName("card-img-top")[0].src = document.getElementById("new_image_src").value;
    }

    completeEditing() {
        const data = {
            src: document.getElementsByClassName("card-img-top")[0].src,
            title: document.getElementById("new_card_title").value,
            text: document.getElementById("new_card_desc").value,
            im_desc: "Своё изображение",
            page_src: ""
        };
        if (this.isEdit) {
            ajax.patch(parkingUrls.updateParkingById(this.cardID), data, (rdata) => {console.log(rdata)});
            console.log("patch");
        }
        else {
            ajax.post(parkingUrls.createParking(), data, (rdata) => {console.log(rdata)});
            console.log("post");
        }

        /*
        const mainPage = new MainPage(document.getElementById('root'));
        mainPage.render();
        */
    }

    addIChangeListener() {
        document
            .getElementById("select-image")
            .addEventListener("click", this.changeImage)
    }

    addCompleteListener() {
        document
            .getElementById("complete")
            .addEventListener("click", this.completeEditing.bind(this))
    }

    renderData(data) {
        const parkingCard = new EditParkingCardComponent(document.getElementById('edit-space'));
        parkingCard.render(data);
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(this.pageRoot);
        header.render();

        this.getData();

        this.addIChangeListener();
        this.addCompleteListener();
    }
}