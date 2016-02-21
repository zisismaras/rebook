$(document).ready(function() {
    // Initialize collapse button
    $(".button-collapse").sideNav();
    //intialize modal
    $('.modal-trigger').leanModal();
    //render the folders
    Rebook.folder_controller.render();
    //SSE setup to autoupdate bookmark list after crawl
    var urlToChangeStream = 'http://169.45.234.69/rebook/api/bookmarks/change-stream?_format=event-stream';
    var src = new EventSource(urlToChangeStream);
    src.addEventListener('data', function(msg) {
        var data = JSON.parse(msg.data);
        if (data.data && data.data.content && data.data.folderId !== 0) {
            $('.progress').addClass('hide');
            Rebook.bookmarks[data.data.folderId].push(data.data);
        }
    });
});