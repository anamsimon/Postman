define(["Backbone", "models/App"], function (Backbone, App) {
    var AppCollection = Backbone.Collection.extend({
        model: App,

        initialize: function () {
        }

    });

    return AppCollection;
});