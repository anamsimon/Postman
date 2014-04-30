define(['Backbone', 'underscore'],
    function (Backbone, _) {
        var Message = Backbone.Model.extend(
            {
                defaults: {
                    id:'',
                    sender:'',
                    message: '',
                    type: '',
                    reply: '',
                    recievedOn:'',
                    isRead: false
                },
                initialize: function () {
                }
            }
        );

       
        return Message;
    });