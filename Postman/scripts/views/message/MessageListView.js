define(['underscore', 'Backbone', 'text!views/message/MessageListView.htm', 'repositoryMan', 'views/message/MessageView'],
    function (_, Backbone, Template, repositoryMan, MessageView) {

        var MessageListView = Backbone.View.extend({

            events: {
                'click #btnBack': 'btnBack_clickHandler',
                'click .btnMsg': 'btnMsg_clickHandler'
            },

            render: function () {
                var self = this;
                this.$el.html($(Template)).find('#appName').html(this.model.get('Name'));
                var listview = this.$el.find('#msg-listview');

                var listTemplate = this.$el.find('#tmpl-list');
                var dividerTemplate = this.$el.find('#tmpl-list-divider');
                var itemTemplate = this.$el.find('#tmpl-list-item');

                var list = listTemplate.tmpl();
                var date = null;
                var unreadIds = [];
                self.model.get('Messages').each(function (message) {
                    if (date != message.get('recievedOn').toDateString()) {
                        date = message.get('recievedOn').toDateString();
                        list.append(dividerTemplate.tmpl({ recievedDate: message.get('recievedOn').toLocaleDateString() }));
                    }
                    list.append(itemTemplate.tmpl(message.toJSON()));
                    if (message.get('isRead') == false) {
                        unreadIds.push(message.id);
                        message.set('isRead', true);
                        self.model.AddReadCount(1);
                    }
                });

                repositoryMan.MarkMessagesAsRead(unreadIds, function () {})

                listview.append(list);           
                return this;
            },

            btnBack_clickHandler: function (event) {
                $.mobile.jqmNavigator.popView();
            },

            btnMsg_clickHandler: function (event) {
                var id = $(event.currentTarget).data('id');
                $.mobile.jqmNavigator.pushView(new MessageView({ model: this.model.get('Messages').get(id) }));
            }


        });

        return MessageListView;
    });