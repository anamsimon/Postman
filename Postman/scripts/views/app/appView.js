/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['underscore', 'Backbone', 'text!views/app/AppView.htm', 'repositoryMan', 'views/message/MessageView'],
    function (_, Backbone, Template, repositoryMan, MessageView) {

        var AppView = Backbone.View.extend({

            events: {
                'click #btnBack': 'btnBack_clickHandler',
                'click .btnMsg': 'btnMsg_clickHandler'
            },

            render: function () {
                var self = this;
                this.$el.html($(Template)).find('#appName').html(this.model.Name);
                var listview = this.$el.find('#msg-listview');

                var listTemplate = this.$el.find('#tmpl-list');
                var dividerTemplate = this.$el.find('#tmpl-list-divider');
                var itemTemplate = this.$el.find('#tmpl-list-item');

                var list = listTemplate.tmpl();
                var date = null;

                self.model.Messages.each(function (message) {
                    if (date != message.get('recievedOn').toDateString()) {
                        date = message.get('recievedOn').toDateString();
                        list.append(dividerTemplate.tmpl({ recievedDate: date }));
                    }
                    list.append(itemTemplate.tmpl(message.toJSON()));
                    if (message.get('isRead') == false) {
                        repositoryMan.MarkMessageRead(message, function () {
                            message.set('isRead', true);
                        })
                    }
                });
                listview.append(list);

                //repositoryMan.GetMessageBySender(this.model.Name, function (messages) {
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
            },

            btnMsg_clickHandler: function (event) {
                var id = $(event.target).data('id');
                $.mobile.jqmNavigator.pushView(new MessageView({ model: this.model.Messages.get(id) }));
            }


        });

        return AppView;
    });