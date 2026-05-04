const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const Parkings = fileService.readData(dataFilePath);
    if (title) {
        return Parkings.filter(stock => 
            stock.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return Parkings;
};

const findOne = (id) => {
    const Parkings = fileService.readData(dataFilePath);
    return Parkings.find(stock => stock.id === id);
};

const create = (stockData) => {
    const Parkings = fileService.readData(dataFilePath);
    
    const newId = Parkings.length > 0 
        ? Math.max(...Parkings.map(s => s.id)) + 1 
        : 1;
        
    const newStock = { id: newId, ...stockData };
    console.log(stockData);
    Parkings.push(newStock);
    fileService.writeData(dataFilePath, Parkings);
    
    return newStock;
};

const update = (id, stockData) => {
    const Parkings = fileService.readData(dataFilePath);
    const index = Parkings.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    Parkings[index] = { ...Parkings[index], ...stockData };
    fileService.writeData(dataFilePath, Parkings);
    
    return Parkings[index];
};

const remove = (id) => {
    const Parkings = fileService.readData(dataFilePath);
    const filteredParkings = Parkings.filter(s => s.id !== id);
    
    if (filteredParkings.length === Parkings.length) {
        return false;
    }
    
    fileService.writeData(dataFilePath, filteredParkings);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };