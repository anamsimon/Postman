/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['underscore', 'Backbone', 'text!views/app/appView.tpl'],
    function (_, Backbone, Template) {

        var appView = Backbone.View.extend({

            events:{
                'click #btnBack':'btnBack_clickHandler'
            },

            render:function () {
                this.$el.html(_.template(Template));
                return this;
            },

            btnBack_clickHandler:function (event) {
                $.mobile.jqmNavigator.popView();
            }

        });

        return appView;
    });