const parkingService = require('../services/parkingService');

const getAllParkings = (req, res) => {
    const { title } = req.query;
    const Parkings = parkingService.findAll(title);
    res.json(Parkings);
};

const getParkingById = (req, res) => {
    const id = parseInt(req.params.id);
    const Parking = parkingService.findOne(id);
    
    if (!Parking) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(Parking);
};

const createParking = (req, res) => {
    const { src, title, text } = req.body;
    
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    
    const newParking = parkingService.create({ src, title, text });
    res.status(201).json(newParking);
};

const updateParking = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedParking = parkingService.update(id, req.body);
    
    if (!updatedParking) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(updatedParking);
};

const deleteParking = (req, res) => {
    const id = parseInt(req.params.id);
    const success = parkingService.remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.status(204).send();
};

module.exports = {
    getAllParkings,
    getParkingById,
    createParking,
    updateParking,
    deleteParking
};