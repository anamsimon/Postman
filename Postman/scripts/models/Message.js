define(['Backbone', 'underscore'],
    function (Backbone, _) {
        var Message = Backbone.Model.extend(
            {
                defaults: {
                    id: '',
                    sender: '',
                    message: '',
                    type: '',
                    reply: '',
                    recievedOn: '',
                    replyOptions: [],
                    isRead: false
                },
                initialize: function () {
                },
                MarkAsRead: function () {
                    this.set('isRead', true);
                }
            }
        );


        return Message;
    });