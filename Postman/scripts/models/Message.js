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
                initialize: function () {
                }
            }
        );

       
        return Message;
    });