/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'views/next/NextView', 'views/app/appView', 'text!views/home/HomeView.tpl'],
    function ($, _, Backbone, NextView,appView, Template) {
        var HomeView = Backbone.View.extend({

            events:{
                'click #btnNextView': 'btnNextView_clickHandler',
                'click .btnApp':'btnApp_clickHandler'
            },

            render:function () {
                this.$el.html(_.template(Template));
                return this;
            },

            btnNextView_clickHandler:function (event) {
                $.mobile.jqmNavigator.pushView(new NextView);
            },

            btnApp_clickHandler: function (event) {
                $.mobile.jqmNavigator.pushView(new appView);
            }

        });
        return HomeView;
    });