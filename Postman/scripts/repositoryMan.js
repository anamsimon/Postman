define(['jquery', 'models/App', 'models/AppCollection', 'models/Message', 'models/MessageCollection'],
    function ($, App, AppCollection, Message, MessageCollection) {
        var _AppNames = ['BrandShare', 'Marcombox', 'Zabbix','GO'];
        var _Apps;

        var db = window.openDatabase("postmanDB", "1.0", "Postman DB", 1000000);
        var _tableName = 'Notification';
        var _tableCreateSql = 'CREATE TABLE IF NOT EXISTS ' + _tableName + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, sender, message, recievedOn, isRead)';
        var _tableDropSql = 'DROP TABLE IF EXISTS  ' + _tableName;


        var repositoryMan = function () {
            this.Init = function () {
                populateDB();
            }

            this.GetApps = function () {
                if (_Apps == null)
                    _Apps = new AppCollection();

                for (var i = 0; i < _AppNames.length; i++) {
                    var app;
                    var appJSON;
                    //var appJSON = storage.Get(_AppNames[i]);
                    if (appJSON == null) {
                        app = new App({ Name: _AppNames[i], Messages: new MessageCollection() });
                        //this.GetMessageBySender(app.get('Name'), function (msgs, sender) {
                        //    var apps = _Apps.GetByName(sender);
                        //    if (apps.length > 0) {
                        //        a = apps[0];
                        //        a.set('Messages', msgs);
                        //        a.set('UnreadMessageCount', msgs.GetUnreadCount());
                        //    }
                        //});
                    }
                    else {
                        //app = new App(JSON.parse(appJSON));
                    }
                    _Apps.add(app);
                }
                return _Apps;
            }

            this.InsertMessage = function (message, onSuccess) {
                var isRead = message.get('isRead') == true ? 1 : 0;
                var insertSql = 'INSERT INTO ' + _tableName + ' ( sender, message, recievedOn, isRead) VALUES ("'
                    + message.get('sender') + '","' + message.get('message') + '","' + message.get('recievedOn').toString() + '",' + isRead + ')';
                insertDB(insertSql,  onSuccess);
            }

            this.MarkMessageRead = function (message, onSuccess) {
                querySql = 'UPDATE ' + _tableName + ' SET isRead=1' + ' WHERE id=' + message.get('id');
                updateDB(querySql, function() {
                    var apps = _Apps.GetByName(message.get('sender'));
                    if (apps.length > 0) {
                        a = apps[0];
                        msgs = a.get('Messages');
                        message.set('isRead',true);
                        msgs.get(message.id).set('isRead', true);
                        a.set('UnreadMessageCount', msgs.GetUnreadCount());
                    }
                });

            }

            this.GetMessageBySender = function (sender, onSuccess) {
                querySql = 'SELECT * FROM ' + _tableName + ' WHERE sender="' + sender + '" ORDER BY id DESC';

                queryDB(querySql, function (rows) {
                    var messages = new MessageCollection();
                    for (var i = 0; i < rows.length; i++) {
                        var item = rows.item(i);
                        var read = item.isRead == 0 ? false : true;
                        var msg = new Message({
                            id: item.id,
                            sender: item.sender,
                            message: item.message,
                            type: '',
                            reply: '',
                            recievedOn: new Date(item.recievedOn),
                            isRead: read
                        });
                        messages.add(msg);
                    }
                    onSuccess(messages, sender);
                });
            }

            function populateDB() {
                isTableExists(_tableName, function (exist) {
                    if (!exist) {
                        db.transaction(function (tx) {
                            tx.executeSql(_tableDropSql);
                            tx.executeSql(_tableCreateSql);
                        }, errorCB, successCB);
                    }
                });

            }

            function insertDB(insertSql, onSuccess) {
                db.transaction(function (tx) {
                    tx.executeSql(insertSql);
                }, errorCB, onSuccess);

            }
            function updateDB(query, onSuccess) {
                db.transaction(function (tx) {
                    tx.executeSql(query);
                }, errorCB, onSuccess);

            }


            function errorCB(err) {
                alert("Error processing SQL: " + err.code);
            }

            function successCB() {
                //alert("success!");
            }

            function queryDB(query, onSuccess) {
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, results) {                        
                        onSuccess(results.rows);
                    }, errorCB);
                }, errorCB);
            }

            function isTableExists(tableName, onSuccess) {
                if (tableName == null || db == null) {
                    return false;
                }
                var query = "SELECT * FROM sqlite_master WHERE type = 'table' AND name = '" + tableName + "'";

                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, results) {
                        if (results.rows.length > 0) {
                            onSuccess(true);
                        }
                        else {
                            onSuccess(false);
                        }
                        onSuccess(results.rows.item);
                    }, errorCB);
                }, errorCB);
            }

            //function querySuccess(tx, results) {
            //    console.log("Returned rows = " + results.rows.length);
            //    // this will be true since it was a select statement and so rowsAffected was 0
            //    if (!results.rowsAffected) {
            //        console.log('No rows affected!');
            //        return false;
            //    }
            //    // for an insert statement, this property will return the ID of the last inserted row
            //    console.log("Last inserted row ID = " + results.insertId);
            //}

        }

        return new repositoryMan();
    });