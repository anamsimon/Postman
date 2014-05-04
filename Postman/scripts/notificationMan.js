define(['jquery', 'repositoryMan', 'models/Message'], function ($, repositoryMan, Message) {
    //var niddle = 'says';
    var notificationMan = function () {

        this.Process = function (apps, notification, onSuccess) {
            var messageId = notification.payload.id;
            var sender = notification.payload.title;
            var message = notification.payload.message;
            var reply = notification.payload.replyOptions;

            var processedMsg = new Message(
                { sender: sender, message: message, isRead: false, recievedOn: new Date(),
                replyOptions: reply
                });

            //console.log("Process");
            repositoryMan.InsertMessage(processedMsg, function (insertId) {
                processedMsg.set('id', insertId);
                //console.log(insertId);
                apps.AddMessage(processedMsg);
                onSuccess(processedMsg);
            });
                        

        }
       
        //this.Process = function (apps,notification) {
        //    //notification = JSON.parse(notification);            
        //    var index = notification.message.indexOf(niddle);
        //    var sender = '';
        //    var message = '';
        //    if (index != -1) {
        //        sender = notification.message.substring(0, index - 1);
        //        message = notification.message.substring(index + 1 + niddle.length);
        //        var processedMsg = new Message({ sender: sender, message: message, isRead: false, recievedOn: new Date() });
        //        repositoryMan.InsertMessage(processedMsg);
        //        apps.AddMessage(processedMsg);
        //        return processedMsg;
        //    }
        //    return null;
        //}
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