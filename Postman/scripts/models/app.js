define(['Backbone', 'underscore'],
    function (Backbone, _) {
        var app = Backbone.Model.extend(
            {
                defaults: {
                    Name:null
                },
                initialize: function () {                    
                }
            }
        );

       
        return app;
    });