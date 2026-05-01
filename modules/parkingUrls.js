class ParkingUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getParkings() {
        return `${this.baseUrl}/parkings`;
    }

    getParkingById(id) {
        return `${this.baseUrl}/parkings/${id}`;
    }

    getParkingsByTitle(title) {
        return `${this.baseUrl}/parkings?title=${title}`;
    }

    createParking() {
        return `${this.baseUrl}/parkings`;
    }

    removeParkingById(id) {
        return `${this.baseUrl}/parkings/${id}`;
    }

    updateParkingById(id) {
        return `${this.baseUrl}/parkings/${id}`;
    }
}

export const parkingUrls = new ParkingUrls();