export class EditParkingCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getCardHTML() {
        return (
        `
            <div class="card">
                <img class="card-img-top" src="" alt="Preview of new image">
                <div class="card-body">
                    <input class="inp-primary" type="text" id="new_card_title" style="width: 270px; margin-bottom: 7px">
                    <input class="inp-primary" type="text" id="new_card_desc" style="width: 270px; margin-bottom: 7px">
                    <table>
                        <tr>
                            <td>
                                <button class="btn btn-primary" id="" data-id="">Припарковать</button>
                            </td>
                            <td>
                                <button class="btn btn-primary" id="" data-id="">Удалить</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        `
        )
    }

    render(data) {
        const card_html = this.getCardHTML();
        this.parent.insertAdjacentHTML('beforeend', card_html);

        document.getElementById("new_card_title").value = data.title;
        document.getElementById("new_card_desc").value = data.text;
        document.getElementsByClassName("card-img-top")[0].src = data.src;
    }
}