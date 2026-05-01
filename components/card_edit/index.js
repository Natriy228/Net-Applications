export class EditParkingCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getCardHTML(parking_data) {
        return (
        `
            <div class="card">
                <img class="card-img-top" src="https://cdn-user30887.skyeng.ru/uploads/67699897a7e97794600638.webp" alt="Preview of new image">
                <div class="card-body">
                    <input class="inp-primary" type="text" id="new_card_title" style="width: 270px; margin-bottom: 7px">
                    <input class="inp-primary" type="text" id="new_card_desc" style="width: 270px; margin-bottom: 7px">
                    <table>
                        <tr>
                            <td>
                                <button class="btn btn-primary" id="click-card-${parking_data.id}" data-id="${parking_data.id}">Припарковать</button>
                            </td>
                            <td>
                                <button class="btn btn-primary" id="delete-card-${parking_data.id}" data-id="${parking_data.id}">Удалить</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        `
        )
    }

    render(data) {
        const card_html = this.getCardHTML(data);
        this.parent.insertAdjacentHTML('beforeend', card_html);

        document.getElementById("new_card_title").value = data.title;
        document.getElementById("new_card_desc").value = data.text;
        document.getElementsByClassName("card-img-top")[0].src = data.src;
    }
}