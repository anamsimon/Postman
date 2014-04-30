define(['jquery', 'repository', 'models/Message'], function ($, repository, Message) {
    var niddle = 'says';
    var notificationHandler = function () {
        this.Get = function (notification) {
            //notification = JSON.parse(notification);            
            var index = notification.message.indexOf(niddle);
            var sender = '';
            var message = '';
            if (index != -1) {
                sender = notification.message.substring(0, index - 1);
                message = notification.message.substring(index + 1 + niddle.length);
                return new Message({ sender: sender, message: message, isRead: false });
            }
            return null;
        }
    }

    //message
    //payload
    //collapse_key
    //from
    //foreground
    //event
    //coldstart


    return new notificationHandler();
});