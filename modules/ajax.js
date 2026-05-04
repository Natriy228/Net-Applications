class Ajax {
    // Старый GET
    // get(url, callback) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', url);
    //     xhr.send();

    //     xhr.onreadystatechange = () => {
    //         if (xhr.readyState === 4) {
    //             this._handleResponse(xhr, callback);
    //         }
    //     };
    // }
    
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    get = async (url, callback) => {
        try {
            const result = await fetch(url);
            const resultj = await result.json();
            callback(resultj, result.statusText);
        }
        catch (e) {
            console.log(e);
        }
    }

    // Старый post
    // post(url, data, callback) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', url);
    //     xhr.setRequestHeader('Content-Type', 'application/json');
    //     xhr.send(JSON.stringify(data));

    //     xhr.onreadystatechange = () => {
    //         if (xhr.readyState === 4) {
    //             this._handleResponse(xhr, callback);
    //         }
    //     };
    // }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    post = async (url, data, callback) => {
        try {
            const result = await fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(data)});
            const resultt = await result.text();
            callback(resultt, result.statusText);
        }
        catch (e) {
            console.log(e);
        }
    }

    // Старый patch
    // patch(url, data, callback) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('PATCH', url);
    //     xhr.setRequestHeader('Content-Type', 'application/json');
    //     xhr.send(JSON.stringify(data));

    //     xhr.onreadystatechange = () => {
    //         if (xhr.readyState === 4) {
    //             this._handleResponse(xhr, callback);
    //         }
    //     };
    // }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    patch = async (url, data, callback) => {
        try {
            const result = await fetch(url, {method: 'PATCH', headers: { 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(data)});
            const resultt = await result.text();
            callback(resultt, result.statusText);
        }
        catch (e) {
            console.log(e);
        }
    }

    // Старый delete
    // delete(url, callback) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('DELETE', url);
    //     xhr.send();

    //     xhr.onreadystatechange = () => {
    //         if (xhr.readyState === 4) {
    //             this._handleResponse(xhr, callback);
    //         }
    //     };
    // }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    delete = async (url, callback) => {
        try {
            const result = await fetch(url, {method: 'DELETE'});
            const resultt = await result.text();
            callback(resultt, result.statusText);
        }
        catch (e) {
            console.log(e);
        }
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {XMLHttpRequest} xhr - Объект запроса
     * @param {function} callback - Функция обратного вызова
     */
    _handleResponse(xhr, callback) {
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax();