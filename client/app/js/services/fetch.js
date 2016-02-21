Rebook.fetch = function(entity, filter) {
    let apiUrl = "http://169.45.234.69/rebook/api/";
    filter = filter || "{}";
    return fetch(apiUrl + entity + "?filter=" + filter)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            return json;
        }).catch(function(ex) {
            console.log('parsing failed', ex);
        });
};