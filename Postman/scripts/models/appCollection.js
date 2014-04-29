define(["Backbone", "models/app"], function (Backbone, app) {
    var appCollection = Backbone.Collection.extend({
        model: app,

        initialize: function () {
        }

    });

    return appCollection;
});