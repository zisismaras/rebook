var read = require('read-art');

module.exports = function(Bookmark) {
    Bookmark.validatesPresenceOf('url', 'folderId');
    Bookmark.afterRemote('create', function(context, bookmark, next) {
        var favicon = bookmark.url.match((/^.+?[^\/:](?=[?\/]|$)/))[0] + "/favicon.ico";
        var title;
        var parsedContent;
        var parsedExcept;
        read(bookmark.url, {
            output: 'json',
            charset: 'utf8',
            break: true
        }, function(err, art, options, resp) {
            if (err) {
                art = {};
                title = bookmark.url;
                parsedContent = "Could not create Article View, please view original.";
                parsedExcept = "Could not create Article View, please view original.";
            } else {
                title = art.title;
                content = art.content;
                html = art.html;
                parsedContent = "";
                parsedExcept = "";
                content.forEach(function(v, i, arr) {
                    if (v.type === "img") {
                        v.value = '<img src="' + v.value + '" class="responsive-img"></img>';
                    }
                    parsedContent = parsedContent + "<br><br>" + v.value;
                });
                if (content[0] && content[1]) {
                    parsedExcept = content[0].value + "<br><br>" + content[1].value;
                } else {
                    parsedExcept = content[0].value;
                }
            }
            bookmark.updateAttributes({
                content: parsedContent,
                name: title,
                except: parsedExcept,
                favicon: favicon
            });
        });
        next();
    });
};