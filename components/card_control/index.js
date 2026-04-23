export class CardControlComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
        `
        <div style="display: grid; justify-content: center">
            <div class="card_control">
                <h5 style="text-align: center">Управление карточками</h5>
                <table style="margin-left: 10px">
                    <tr>
                        <td style="width: 210px; padding-top: 10px">
                            <p>Добавить новую карточку:</p>
                        </td>
                        <td>
                            <button class="btn btn-primary" id="new_card_accept">Добавить</button>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 210px; padding-top: 10px">
                            <p>Найти карточку:</p>
                        </td>
                        <td style="width: 210px">
                            <input class="inp-primary" type="text" id="find_card_title">
                        </td>
                        <td>
                            <button class="btn btn-primary" id="filter_accept">Найти</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        `
        )
    }

    addAddListener(listener) {
        document
            .getElementById(`new_card_accept`)
            .addEventListener("click", listener)
    }

    addFilterListener(listener) {
        document
            .getElementById(`filter_accept`)
            .addEventListener("click", listener)
    }

    render(add_listener, filter_listener) {
        const card_html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', card_html);
        this.addAddListener(add_listener);
        this.addFilterListener(filter_listener);
    }
}