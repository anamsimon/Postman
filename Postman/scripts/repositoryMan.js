define(['jquery', 'models/App', 'models/AppCollection', 'models/Message', 'models/MessageCollection'],
    function ($, App, AppCollection, Message, MessageCollection) {
        var _AppNames = ['BrandShare', 'Marcombox', 'Zabbix', 'GO'];
        //var _Apps;

        var db = window.openDatabase("postmanDB", "1.0", "Postman DB", 1000000);
        var _tableName = 'Notification';
        var _tableCreateSql = 'CREATE TABLE IF NOT EXISTS ' + _tableName + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, sender, message, recievedOn, replyOptions, isRead)';
        //var _tableDropSql = 'DROP TABLE IF EXISTS  ' + _tableName;


        var repositoryMan = function () {
            this.Init = function () {
                populateDB();
            }

            this.GetApps = function (onSuccess) {
                var apps = new AppCollection();

                for (var i = 0; i < _AppNames.length; i++) {
                    var app = new App({ Name: _AppNames[i], Messages: new MessageCollection() });
                    apps.add(app);
                    //this.GetMessageBySender(app.get('Name'), function (msgs, sender) {
                    //    var allApps = apps.GetByName(sender);
                    //    if (allApps.length > 0) {
                    //        a = allApps[0];
                    //        a.set('Messages', msgs);
                    //        a.set('UnreadMessageCount', msgs.GetUnreadCount());
                    //        if (i == _AppNames.length - 1) {
                    //            onSuccess(apps);
                    //        }
                    //    }
                    //});
                }

                this.GetAllMessages(function (msgs) {
                    msgs.each(function (msg) {
                         apps.AddMessage(msg);                        
                    });
                    onSuccess(apps);
                });

            }

            this.InsertMessage = function (message, onSuccess) {
                //console.log('InsertMessage');
                var isRead = message.get('isRead') == true ? 1 : 0;
                var insertSql = 'INSERT INTO ' + _tableName + ' ( sender, message, recievedOn, replyOptions, isRead) VALUES ("'
                    + message.get('sender') + '","' + message.get('message') + '","' + message.get('recievedOn').toString() + '","'
                    + JSON.stringify(message.get('replyOptions')).replace(/"/g, '\'') + '",' + isRead + ')';
                insertDB(insertSql, onSuccess);
            }

            this.MarkMessagesAsRead = function (ids, onSuccess) {
                querySql = 'UPDATE ' + _tableName + ' SET isRead=1' + ' WHERE id IN (' + ids.join(",") + ")";
                updateDB(querySql, onSuccess);

            }

            this.GetAllMessages = function (onSuccess) {
                querySql = 'SELECT * FROM ' + _tableName + ' ORDER BY id DESC';
                queryDB(querySql, function (rows) {
                    onSuccess(ConvertRowItemsToMessages(rows));
                });

            }
            this.GetMessageBySender = function (sender, onSuccess) {
                querySql = 'SELECT * FROM ' + _tableName + ' WHERE sender="' + sender + '" ORDER BY id DESC';
                queryDB(querySql, function (rows) {
                    onSuccess(ConvertRowItemsToMessages(rows), sender);
                });
            }

            function ConvertRowItemsToMessages(rows) {
                var messages = new MessageCollection();
                for (var i = 0; i < rows.length; i++) {
                    var msg = ConvertRowItemToMessage(rows.item(i));
                    if (msg != null)
                        messages.add(msg);
                }
                return messages;
            }

            function ConvertRowItemToMessage(item) {
                var read = item.isRead == 0 ? false : true;

                var msg = new Message({
                    id: item.id,
                    sender: item.sender,
                    message: item.message,
                    type: '',
                    replyOptions: JSON.parse(item.replyOptions.replace(/'/g, '"')),
                    recievedOn: new Date(item.recievedOn),
                    isRead: read
                });
                return msg;
            }

            function populateDB() {
                isTableExists(_tableName, function (exist) {
                    if (!exist) {
                        db.transaction(function (tx) {
                            //tx.executeSql(_tableDropSql);
                            tx.executeSql(_tableCreateSql);
                        }, errorCB, successCB);
                    }
                });

            }

            function insertDB(insertSql, onSuccess) {
                db.transaction(function (tx) {
                    tx.executeSql(insertSql, [], function (tx, results) {
                        //console.log('insertDB');
                        onSuccess(results.insertId);
                    });
                }, errorCB);

            }
            function updateDB(query, onSuccess, onError) {
                db.transaction(function (tx) {
                    tx.executeSql(query);
                }, function () {
                    if (onError) onError();
                    else errorCB();
                }, onSuccess);

            }


            function errorCB(err) {
               // alert("Error processing SQL: " + err.code);
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