/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['underscore', 'Backbone', 'text!views/message/messageView.htm'],
    function (_, Backbone, Template) {

        var MessageView = Backbone.View.extend({

            events: {
                'click #btnBack': 'btnBack_clickHandler'
            },

            render: function () {
                this.$el.html($(Template)).find('#appName').html(this.model.sender);
                this.$el.find('#messageContent').html(this.$el.find('#tmpl-msg').tmpl(this.model));
                return this;
            },
            btnBack_clickHandler: function (event) {
                $.mobile.jqmNavigator.popView();
            }

        });

        return MessageView;
    });