define(['Backbone', 'underscore'],
    function (Backbone, _) {
        var Message = Backbone.Model.extend(
            {
                defaults: {
                    sender:'',
                    body: '',
                    type: '',
                    reply: '',
                    recieved:'',
                    isRead: false
                },
                initialize: function (from, msg) {
                    this.sender = from;
                    this.message= msg;
                }
            }
        );

       
        return Message;
    });