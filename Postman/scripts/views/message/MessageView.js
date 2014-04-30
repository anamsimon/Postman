define(['underscore', 'Backbone', 'text!views/message/MessageView.htm'],
    function (_, Backbone, Template) {

        var MessageView = Backbone.View.extend({

            events: {
                'click #btnBack': 'btnBack_clickHandler'
            },

            render: function () {
                this.$el.html($(Template)).find('#appName').html(this.model.get('sender'));
                this.$el.find('#messageContent').html(this.$el.find('#tmpl-msg').tmpl(this.model.toJSON()));
                MessageViewLoaded = true;
                return this;
            },
            btnBack_clickHandler: function (event) {
                $.mobile.jqmNavigator.popView();
                MessageViewLoaded = false;
            }

        });

        return MessageView;
    });