define(["Backbone", "models/App"], function (Backbone, App) {
    var AppCollection = Backbone.Collection.extend({
        model: App,

        GetByName: function (name) {            
            var apps = this.where({ Name: name });
            if (apps.length > 0)
                return apps[0];
            else return null;
        },

        AddMessage: function (message) {
            var app = this.GetByName(message.get('sender'));
            if (app!=null)
                app.AddMessage(message);
        }

    });

    return AppCollection;
});