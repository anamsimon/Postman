define(["Backbone", "models/Message"], function (Backbone, Message) {
    var MessageCollection = Backbone.Collection.extend({
        model: Message,
        initialize: function () {
        }

    });

    return MessageCollection;
});