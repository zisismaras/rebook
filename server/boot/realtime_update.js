var es = require('event-stream');

module.exports = function(app) {
    app.models.bookmark.createChangeStream(function(err, changes) {
        changes.pipe(es.stringify());
    });
};
