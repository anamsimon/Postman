define(['jquery', 'models/App', 'models/AppCollection', 'models/Message', 'models/MessageCollection'], function ($, App, AppCollection, Message, MessageCollection) {
    var _AppNames = ['BrandShare', 'Marcombox', 'Zabbix'];
    var _Apps;

    var db = window.openDatabase("postmanDB", "1.0", "Postman DB", 1000000);
    var _tableName = 'Notification';
    var _tableCreateSql = 'CREATE TABLE IF NOT EXISTS ' + _tableName + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, sender, message, isRead)';
    var _tableDropSql = 'DROP TABLE IF EXISTS  ' + _tableName ;
    

    var repository = function () {
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
                    app = new App({ Name: _AppNames[i] });
                    //storage.Set(_AppNames[i], app.toJSON());
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
            var insertSql = 'INSERT INTO ' + _tableName + ' ( sender, message, isRead) VALUES ("'
                + message.get('sender') + '","' + message.get('message') + '",' + isRead + ')';
            insertDB(insertSql, errorCB, onSuccess);
        }

        this.GetMessageBySender = function (sender, onSuccess) {            
            querySql = 'SELECT * FROM ' + _tableName + ' WHERE sender="' + sender + '"';

            queryDB(querySql, function (rows) {
                var messages = new MessageCollection();
                for (var i = 0; i < rows.length; i++) {
                    var item = rows.item(i);
                    var read = item.isRead == 0 ? false : true;
                    var msg = new Message({
                        sender: item.sender,
                        message: item.message,
                        type: '',
                        reply: '',
                        recievedOn: '',
                        isRead: read
                    });
                    messages.add(msg);
                }
                onSuccess(messages);
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
            }, errorCB, successCB);

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
                    console.log("Returned rows = " + results.rows.length);
                    onSuccess(results.rows);
                }, errorCB);
            }, errorCB);
        }

        function isTableExists( tableName, onSuccess) {
            if (tableName == null || db == null) {
                return false;
            }
            var query = "SELECT * FROM sqlite_master WHERE type = 'table' AND name = '" + tableName+"'";

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

    return new repository();
});