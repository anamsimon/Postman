define(['jquery'], function ($) {
    var niddle = 'says';
    var messageHandler = function () {
        this.Handle = function (notification) {
            var index = notification.indexOf(niddle);
            var sender = '';
            var message = '';
            if (index != -1) {
                sender = notification.substring(0, niddle - 1);
                message = notification.substring(niddle + niddle.length);
            }
        }
    }

    return new messageHandler();
});