Rebook.folder_controller = {
    render: function() {
        Rebook.folderVm = new Vue({
            el: '#folders',
            data: {
                folders: []
            },
            methods: {
                showBookmarks: function(id, event) {
                    Rebook.folder_controller.showBookmarks(id, event, this);
                },
                showArchived: Rebook.folder_controller.showArchived
            }
        });
        Rebook.folderMobileVm = new Vue({
            el: '#nav-mobile',
            data: {
                folders: []
            },
            methods: {
                showBookmarks: function(id, event) {
                    Rebook.folder_controller.showBookmarks(id, event, this);
                },
                showArchived: Rebook.folder_controller.showArchived
            }
        });
        Rebook.newFolderVm = new Vue({
            el: '#new_folder',
            data: {
                folders: []
            },
            methods: {
                create: function(d, event) {
                    if (this.$validation1.valid) Rebook.folder_controller.create(d, event, this);
                },
                showArchived: Rebook.folder_controller.showArchived
            }
        });

        Rebook.fetch("folders").then(function(folders) {
            Rebook.folders = folders;
            Rebook.folderVm.folders = folders;
            Rebook.folderMobileVm.folders = folders;
            //get bookmarks for first folder on load by default
            Rebook.folder_controller.showBookmarks(folders[0].id);

        });
    },

    create: function(d, event, instance) {
        event.preventDefault();
        let data = {
            name: instance.folder_name,
            description: instance.folder_description
        };
        Rebook.create("folders", data).then(function(folder) {
            Rebook.folders.push(folder);
            Materialize.toast('New folder added', 4000, 'rounded');
            Rebook.folderIds.push({
                text: folder.name,
                value: folder.id
            });
        });
    },
    showBookmarks: function(id, event, instance) {
        localStorage.current_folder = id;
        Rebook.bookmark_controller.render();
    },
    showArchived: function(id, event, instance) {
        Rebook.bookmark_controller.render({
            where: {
                archived: true
            }
        });
    }
};