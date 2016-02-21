Rebook.bookmark_controller = {
    render: function(filter) {
        filter = filter || {
            where: {
                and: [{
                    folderId: localStorage.current_folder
                }, {
                    archived: false
                }]
            }
        };
        Rebook.fetch("bookmarks", JSON.stringify(filter)).then(function(bookmarks) {
            //empty the bookmark list after first render, to store the new ones
            if (Rebook.bookmarkVm) {
                Rebook.bookmarkVm.bookmarks[localStorage.previous_folder] = [];
            }
            Rebook.bookmarks = Rebook.bookmarks || [];
            Rebook.bookmarks[localStorage.current_folder] = bookmarks;
            Rebook.bookmarkVm = new Vue({
                el: '#bookmarks',
                data: {
                    bookmarks: Rebook.bookmarks,
                    except: true
                },
                methods: {
                    readMore: function(item) {
                        this.except = false;
                    },
                    archive: function(bookmarkArray) {
                        let bookmark = bookmarkArray[0];
                        let bookmark_item = bookmarkArray[1];
                        let data = {
                            id: bookmark_item.id,
                            archived: true
                        };
                        Rebook.update("bookmarks", data).then(function(bookmark) {
                            //bookmark.name = bookmark.url
                            //bookmark.url = "Processing...";
                            //Rebook.bookmarks[localStorage.current_folder].push(bookmark);
                            //Rebook.bookmarkVm.bookmarks[bookmark].$remove(bookmark_item);
                            Materialize.toast('Bookmark moved to archives', 4000, 'rounded');
                            $('.tooltipped').tooltip('remove');
                            Rebook.bookmark_controller.render();
                        });
                    },
                    delete: function(item) {
                        let data = {
                            id: item.id
                        };
                        Rebook.delete("bookmarks", data).then(function(bookmark) {
                            //bookmark.name = bookmark.url
                            //bookmark.url = "Processing...";
                            //Rebook.bookmarks[localStorage.current_folder].push(bookmark);
                            //Rebook.bookmarkVm.bookmarks[bookmark].$remove(bookmark_item);
                            Materialize.toast('Bookmark deleted', 4000, 'rounded');
                            $('.tooltipped').tooltip('remove');
                            Rebook.bookmark_controller.render();
                        });
                    }
                },
                ready: function() {
                    //initialize dynamic toolips
                    $('.tooltipped').tooltip({
                        delay: 50
                    });
                }
            });
            Rebook.bookmarkVm.bookmarks.$set(localStorage.current_folder, bookmarks);
            localStorage.previous_folder = localStorage.current_folder;
            Rebook.bookmarkVm.current_folder = localStorage.current_folder;
            Rebook.bookmarkVm.$watch('bookmarks', function(newVal, oldVal) {
                $('.tooltipped').tooltip({
                    delay: 50
                });
            });
            Rebook.bookmark_controller.newBookmarkInit();
        });
    },

    create: function(d, event, instance) {
        event.preventDefault();
        let data = {
            url: instance.new_bookmark_url,
            folderId: Rebook.newBookmarkVm.select,
            notes: instance.new_bookmark_notes
        };
        data.folderId = data.folderId || 0;
        Rebook.create("bookmarks", data).then(function(bookmark) {
            //bookmark.name = bookmark.url
            //bookmark.url = "Processing...";
            //Rebook.bookmarks[localStorage.current_folder].push(bookmark);
            Materialize.toast('Bookmark added and will appear shortly', 4000, 'rounded');
            $('.progress').removeClass('hide');
        });
    },

    newBookmarkInit: function() {
        //the new bookmark modal vm
        //a workaround for vue and materialize to play well together
        Rebook.folderIds = [{
            text: "Uncategorized",
            value: 0
        }];
        Rebook.folders.forEach(function(v, i, arr) {
            Rebook.folderIds.push({
                text: v.name,
                value: v.id
            });
        });
        Rebook.newBookmarkVm = new Vue({
            el: '#new_bookmark',
            data: {
                folderSelect: "",
                folderIds: Rebook.folderIds
            },
            methods: {
                create: function(d, event) {
                    Rebook.bookmark_controller.create(d, event, this);
                },
            },
            ready: function() {
                $('select').material_select();
            }
        });
        $('#folderSelect').change(function() {
            Rebook.newBookmarkVm.$set('select', $('#folderSelect').val());
        });
        Rebook.newBookmarkVm.$watch('folderIds', function(newVal, oldVal) {
            $('select').material_select();
        });
    }


};