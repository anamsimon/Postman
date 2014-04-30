define(['jquery', 'repository', 'models/Message'], function ($, repository, Message) {
    var niddle = 'says';
    var messageHandler = function () {
        this.Get = function (notification) {
            notification = notification.payload;
            var index = notification.indexOf(niddle);
            var sender = '';
            var message = '';
            if (index != -1) {
                sender = notification.substring(0, niddle - 1);
                message = notification.substring(niddle + niddle.length);
                return new Message(sender,message);
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


    return new messageHandler();
});