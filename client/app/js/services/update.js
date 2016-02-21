Rebook.update = function(entity, data) {
    let apiUrl = "http://169.45.234.69/rebook/api/";
    return fetch(apiUrl + entity, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            return json;
        }).catch(function(ex) {
            console.log('parsing failed', ex);
        });
};