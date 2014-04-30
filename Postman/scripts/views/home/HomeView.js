/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'views/next/NextView', 'views/app/AppView', 
    'text!views/home/HomeView.htm','models/App'],
    function ($, _, Backbone, NextView,AppView, Template, App) {
        var HomeView = Backbone.View.extend({

            events:{              
                'click .btnApp':'btnApp_clickHandler'
            },

            render:function () {
                this.$el.html($(Template));                
                this.$el.find('#appGrid').append(this.$el.find('#tmpl-app-btn').tmpl(this.model.toJSON()));
                return this;
            },

            btnApp_clickHandler: function (event) {
                $.mobile.jqmNavigator.pushView(new AppView({ model: { Name: $(event.target).data('name') } }));
    }

});
return HomeView;
});