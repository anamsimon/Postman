
define(['jquery', 'underscore', 'Backbone', 'views/message/MessageListView',
    'text!views/home/HomeView.htm', 'models/App', 'repositoryMan'],
    function ($, _, Backbone, MessageListView, Template, App, repositoryMan) {
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
                        self.updateCount(app);                      
                        //self.$el.trigger("create");                       
                        //console.log('create called' + JSON.stringify( app));
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
                var app = this.model.GetByName(name);
                if (app != null)
                    $.mobile.jqmNavigator.pushView(new MessageListView({ model: app }));
            }

        });
        return HomeView;
    });