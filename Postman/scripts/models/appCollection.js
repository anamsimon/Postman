define(["Backbone", "models/App"], function (Backbone, App) {
    var AppCollection = Backbone.Collection.extend({
        model: App,

        GetByName: function (name) {
            return this.where({ Name: name });
        },
        

    });

    return AppCollection;
});