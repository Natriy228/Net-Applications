import {ParkingComponent} from "../../components/parking/index.js";
import {MainPage} from "../main/index.js";
import {HeaderComponent} from "../../components/header/index.js";

function uniqueUsers(firstParkingCars, secondParkingCars) {
    let result = [];
    firstParkingCars.forEach((car) => {
        if (!secondParkingCars.includes(car)) result.push(car);
    });
    return result;
}

export class ParkingPage {
    constructor(parent, sourceData, cardID) {
        this.parent = parent;
        this.sourceData = sourceData;
        this.cardID = cardID;
    }

    get pageRoot() {
        return document.getElementById('parking-page');
    }

    getHTML() {
        return (
            `
                <div id="parking-page"></div>
            `
        );
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(this.pageRoot);
        header.render();

        const data = this.sourceData;
        data.otherIDs = uniqueUsers([1, 2, 3, 4], [parseInt(this.cardID)]);
        const stock = new ParkingComponent(this.pageRoot);
        stock.render(data);
    }
}