define(["Backbone", "models/Message"], function (Backbone, Message) {
    var MessageCollection = Backbone.Collection.extend({
        model: Message,      
        GetUnreadCount: function () {
            return this.where({ isRead: false}).length;
        },
    });

    return MessageCollection;
});