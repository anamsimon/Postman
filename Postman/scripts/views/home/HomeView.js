
define(['jquery', 'underscore', 'Backbone', 'views/next/NextView', 'views/app/AppView',
    'text!views/home/HomeView.htm', 'models/App', 'repositoryMan'],
    function ($, _, Backbone, NextView, AppView, Template, App, repositoryMan) {
        var HomeView = Backbone.View.extend({

            events: {
                'click .btnApp': 'btnApp_clickHandler'
            },

            render: function () {
                var self = this;
                this.$el.html($(Template));
                this.$el.find('#appGrid').append(this.$el.find('#tmpl-app-btn').tmpl(this.model.toJSON()));
                //$.each(this.model.models,function (i,app) {
                //    app.on('change', function () {
                //        //self.$el.find('#appGrid').empty().append(self.$el.find('#tmpl-app-btn').tmpl(self.model.toJSON()));
                //        self.$el.find('#appGrid button[data-name=' + app + '] span').empty().append();
                //    });
                //});
                $.each(this.model.models, function (i, app) {
                    app.on('change', function () {
                        repositoryMan.GetMessageBySender(app.get('Name'), function (msgs, sender) {
                            app.set('Messages', msgs);
                            app.set('UnreadMessageCount', msgs.GetUnreadCount());
                            self.updateCount(app);
                        });
                    });
                });
                return this;
            },
            updateCount: function (app) {
                //alert(app.get('UnreadMessageCount'));
                if (app.get('UnreadMessageCount') > 0) {
                    this.$el.find('#appGrid button[data-name=' + app.get('Name') + '] span')
                        .empty().attr('class', 'ui-li-count ui-body-inherit').append(app.get('UnreadMessageCount'));
                }
                else {
                    this.$el.find('#appGrid button[data-name=' + app.get('Name') + '] span')
                    .empty().attr('class', '');
                }
            },
            btnApp_clickHandler: function (event) {
                var name = $(event.target).data('name');
                repositoryMan.GetMessageBySender(name, function (messages) {
                    $.mobile.jqmNavigator.pushView(new AppView({ model: { Name: name, Messages: messages } }));
                });

            }

        });
        return HomeView;
    });