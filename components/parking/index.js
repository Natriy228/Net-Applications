export class ParkingComponent {
    constructor(parent) {
        this.parent = parent
    }

    uniqueParkings(parkings1, parkings2) {
        let result = [];
        parkings1.forEach((item) => {if (!parkings2.includes(item)) result.push(item);});
        return result;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 100%;">
                    <img src="${data.page_src}" class="img-fluid" alt="${data.im_desc}">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <p>Другие ID: ${data.otherIDs}</p>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        data.otherIDs = this.uniqueParkings([1, 2, 3, 4], [data.id]);
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('afterbegin', html)
    }
}