export class CardAdderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
        `
        <div style="display: grid; justify-content: center">
            <div class="adder">
                <h5 style="text-align: center">Добавление карточки</h5>
                <table>
                    <tr>
                        <td style="width: 80px; padding-top: 10px">
                            <p>Название:</p>
                        </td>
                        <td style="width: 250px">
                            <input class="inp-primary" type="text" id="new_card_title">
                        </td>
                        <td style="width: 85px; padding-top: 10px">
                            <p>Описание:</p>
                        </td>
                        <td style="width: 250px">
                            <input class="inp-primary" type="text" id="new_card_desc">
                        </td>
                        <td>
                            <button class="btn btn-primary" id="new_card_accept">Добавить</button>
                    </tr>
                </table>
            </div>
        </div>
        `
        )
    }

    addAcceptListener(listener) {
        document
            .getElementById(`new_card_accept`)
            .addEventListener("click", listener)
    }

    render(accept_listener) {
        const card_html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', card_html);
        this.addAcceptListener(accept_listener);
    }
}