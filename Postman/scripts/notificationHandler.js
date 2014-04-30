define(['jquery', 'repository', 'models/Message'], function ($, repository, Message) {
    var niddle = 'says';
    var notificationHandler = function () {
        this.Get = function (notification) {
            payload = notification.payload;
            var index = payload.indexOf(niddle);
            var sender = '';
            var message = '';
            if (index != -1) {
                sender = payload.substring(0, index - 1);
                message = payload.substring(index + 1 + niddle.length);
                return new Message({ sender: sender, body: message });
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