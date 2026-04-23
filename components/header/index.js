import {MainPage} from "../../pages/main/index.js";

export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
        `
        <div class="header" style="padding-left: 7px; padding-top: 7px; margin-bottom: 10px">
            <button class="btn btn-primary" id="home_button"><image src="../../resources/images/homev.png" width="40" height="40"></button>
        </div>
        `
        )
    }

    returnToMainPage() {
        const mainPage = new MainPage(document.getElementById('root'));
        mainPage.render(false);
    }

    addHomeListener(listener) {
        document
            .getElementById(`home_button`)
            .addEventListener("click", listener)
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addHomeListener(this.returnToMainPage);
    }
}