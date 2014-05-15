define(['underscore', 'Backbone', 'text!views/message/MessageView.htm', 'repositoryMan', 'notificationMan'],
    function (_, Backbone, Template, repositoryMan, notificationMan) {


        var MessageView = Backbone.View.extend({

            events: {
                'click #btnBack': 'btnBack_clickHandler',
                'click .btnReply': 'btnReply_clickHandler'

            },

            render: function () {
                var self = this;
                self.$el.html($(Template)).find('#appName').html(self.model.get('sender'));
                var msgTmpl = self.$el.find('#tmpl-msg').tmpl(self.model.toJSON());
                if (self.model.get('replyOptions').length > 0) {
                    msgTmpl.find('#replyOptions').append(self.$el.find('#tmpl-msg-reply').tmpl(self.model.toJSON()));
                }
                else if (self.model.get('sender').toLowerCase() == 'go') {
                    msgTmpl.find('#replyOptions').append(self.$el.find('#tmpl-msg-reply').tmpl({ replyOptions: ['Rerun'] }));
                }
                self.$el.find('#messageContent').append(msgTmpl);
                MessageViewLoaded = true;
                if (self.model.get('isRead') == false) {
                    repositoryMan.MarkMessagesAsRead([self.model.id], function () {
                        self.model.MarkAsRead();
                    })
                }
                return this;
            },
            btnBack_clickHandler: function (event) {
                $.mobile.jqmNavigator.popView();
                MessageViewLoaded = false;
            },
            btnReply_clickHandler: function (event) {
                var reply = $(event.currentTarget).data('reply');

                if (reply == 'Rerun') {
                    notificationMan.Reply(this.model.get('sender'), function (data) {
                        alert(data);
                    }, function (error) {
                        alert(JSON.stringify(error.responseText));
                    });
                }
            }
        });

        return MessageView;
    });