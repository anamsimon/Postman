define(['jquery', 'repositoryMan', 'models/Message'], function ($, repositoryMan, Message) {
    var niddle = 'says';
    var notificationMan = function () {
        this.Process = function (notification) {
            //notification = JSON.parse(notification);            
            var index = notification.message.indexOf(niddle);
            var sender = '';
            var message = '';
            if (index != -1) {
                sender = notification.message.substring(0, index - 1);
                message = notification.message.substring(index + 1 + niddle.length);
                var processedMsg = new Message({ sender: sender, message: message, isRead: false, recievedOn: new Date() });
                repositoryMan.InsertMessage(processedMsg);
                return processedMsg;
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


    return new notificationMan();
});