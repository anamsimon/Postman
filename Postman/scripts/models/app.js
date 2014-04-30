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
                AddUnreadCount: function (count) {
                    this.set('UnreadMessageCount', this.get('UnreadMessageCount') + count);
                }
                //UnreadMessageCount: function () {
                //    var count = 0;
                //    this.Messages.each(function (msg) {
                //        if (msg.get('isRead') == false)
                //            count++;
                //    });
                //    return count;
                //}
            }
        );


        return App;
    });