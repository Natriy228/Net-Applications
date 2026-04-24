export class ParkingCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getCardHTML(parking_data) {
        return (
        `
            <div class="card">
                <img class="card-img-top" src="${parking_data.src}" alt="${parking_data.im_desc}">
                <div class="card-body">
                    <h5 class="card-title">${parking_data.title} (${parking_data.isp})</h5>
                    <p class="card-text">${parking_data.text}</p>
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

    addClickListener(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    addDeleteListener(data, listener) {
        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", listener)
    }

    render(data, click_listener, delete_listener) {
        const card_html = this.getCardHTML(data);
        this.parent.insertAdjacentHTML('beforeend', card_html);
        this.addClickListener(data, click_listener);
        this.addDeleteListener(data, delete_listener);
    }
}