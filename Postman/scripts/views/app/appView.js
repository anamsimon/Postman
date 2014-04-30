/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['underscore', 'Backbone', 'text!views/app/AppView.htm', 'repository'],
    function (_, Backbone, Template, repository) {

        var AppView = Backbone.View.extend({

            events: {
                'click #btnBack': 'btnBack_clickHandler'
            },

            render: function () {
                var self = this;
                this.$el.html($(Template)).find('#appName').html(this.model.Name);
                var listview = this.$el.find('#msg-listview');
                var itemTemplate = this.$el.find('#tmpl-msg-list-item');

                repository.GetMessageBySender(this.model.Name, function (messages) {
                    self.model.Messages = messages;
                    self.model.Messages.each(function (message) {
                        listview.append(itemTemplate.tmpl(message.toJSON()));
                    });
                });
                return this;
            },

            btnBack_clickHandler: function (event) {
                $.mobile.jqmNavigator.popView();
            }

        });

        return AppView;
    });