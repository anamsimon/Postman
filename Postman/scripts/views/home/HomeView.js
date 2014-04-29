/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'views/next/NextView', 'views/app/appView', 
    'text!views/home/HomeView.htm','models/app'],
    function ($, _, Backbone, NextView,appView, Template, app) {
        var HomeView = Backbone.View.extend({

            events:{
                'click #btnNextView': 'btnNextView_clickHandler',
                'click .btnApp':'btnApp_clickHandler'
            },

            render:function () {
                //this.$el.html($(Template));
                this.$el = $(Template);
                this.$el.find('#appGrid').append(this.$el.find('#tmpl-app-btn').tmpl(this.model));
                return this;
            },

            btnNextView_clickHandler:function (event) {
                $.mobile.jqmNavigator.pushView(new NextView);
            },

            btnApp_clickHandler: function (event) {
                $.mobile.jqmNavigator.pushView(new appView({ model: { Name: $(event.target).data('name') } }));
    }

});
return HomeView;
});