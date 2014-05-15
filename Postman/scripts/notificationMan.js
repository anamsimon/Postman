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


        /*Go configuration*/

        var baseUrl = "http://go.brandshare.net:8153/";
        var pipelineName = "BrandShareDeploy";
        var credentialBase64 = "ZXJmYW5hLnNpa2RlcjpAbXJhc3AybzFv";

        //var baseUrl = "http://go.sashiimi.com:8153/";
        //var pipelineName = "SashimiApp";
        //var credentialBase64 = "YW5hbXNpbW9uOmdvMTI1Mg==";


        var targetUrl = baseUrl + "go/api/pipelines/" + pipelineName + "/schedule";
        /*Go configuration*/
       
        this.Reply = function (name,onSuccess, onError) {
            if (name.toLowerCase() == "go") {
                $.ajax({
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + credentialBase64);
                    },
                    crossDomain: true,
                    type: "POST",
                    url: targetUrl,
                    contentType: "application/json",
                    success: function (data) {
                        onSuccess(data);
                    },
                    error: function (error) {
                        onError(error);                      
                    }
                });
            }
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