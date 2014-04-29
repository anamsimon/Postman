define(['Backbone', 'underscore', "models/MessageCollection"],
    function (Backbone, _, MessageCollection) {
        var App = Backbone.Model.extend(
            {
                defaults: {
                    Name: null,
                    Messages:null
                },
                initialize: function () {
                    Messages = new MessageCollection();
                }
            }
        );

       
        return App;
    });