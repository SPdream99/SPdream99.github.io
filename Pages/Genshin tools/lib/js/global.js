// Source: https://stackoverflow.com/a/72544812 .
class API {

    apiUrl = "https://api.genshin.dev";

    constructor() {
        this.items = [];
    }

    async fetchItems() {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        this.items = data;
        console.log("A:", this.items["types"].length);
        return data;
    }

    async showItems() {
        await this.fetchItems();
        console.log("B:", this.items["types"].length);
        return this.items;
    }
}

async function app() {
    n = new API();
    const items = await n.showItems();
    console.log("C:", items["types"].length);
}
app();