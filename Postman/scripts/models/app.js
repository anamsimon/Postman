define(['Backbone', 'underscore', "models/MessageCollection"],
    function (Backbone, _, MessageCollection) {
        var App = Backbone.Model.extend(
            {
                defaults: {
                    Name: null,
                    Messages: null,
                    UnreadMessageCount: 0
                },
                initialize: function () {
                    Messages = new MessageCollection();
                },
                AddMessage: function (message) {
                    var self = this;
                    this.get('Messages').add(message);
                    if (message.get('isRead') == false) {
                        this.AddUnreadCount(1);
                        message.on('change:isRead', function () {
                            if (this.get('isRead') == true)
                                self.AddReadCount(1);
                        });
                    }
                },
                AddUnreadCount: function (count) {
                    this.set('UnreadMessageCount', this.get('UnreadMessageCount') + count);
                },
                AddReadCount: function (count) {
                    if (this.get('UnreadMessageCount') > 0)
                        this.set('UnreadMessageCount', this.get('UnreadMessageCount') - count);
                }
            }
        );


        return App;
    });