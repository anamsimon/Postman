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

                var listTemplate = this.$el.find('#tmpl-list');
                var dividerTemplate = this.$el.find('#tmpl-list-divider');
                var itemTemplate = this.$el.find('#tmpl-list-item');

                var list = listTemplate.tmpl();
                self.model.Messages.each(function (message) {
                    list.append(dividerTemplate.tmpl());
                    list.append(itemTemplate.tmpl(message.toJSON()));
                });
                listview.append(list);

                //repository.GetMessageBySender(this.model.Name, function (messages) {
                //    self.model.Messages = messages;
                //    var list = listTemplate.tmpl();
                //    self.model.Messages.each(function (message) {
                //        list.append(dividerTemplate.tmpl());
                //        list.append(itemTemplate.tmpl(message.toJSON()));
                //    });
                //    listview.append(list);
                //});
                return this;
            },

            btnBack_clickHandler: function (event) {
                $.mobile.jqmNavigator.popView();
            }

        });

        return AppView;
    });