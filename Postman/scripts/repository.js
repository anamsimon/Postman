define(['jquery', 'models/App', 'models/AppCollection'], function ($, App, AppCollection) {
    var _AppNames = ['BrandShare', 'Marcombox', 'Zabbix'];
    var _Apps;
    var repository = function () {
        this.GetApps = function () {
            var storage = new localStorageApp();

            if (_Apps == null)
                _Apps = new AppCollection();

            for (var i = 0; i < _AppNames.length; i++) {
                var app;
                var appJSON;
                //var appJSON = storage.Get(_AppNames[i]);
                if (appJSON == null) {
                    app = new App({ Name: _AppNames[i]  });
                    //storage.Set(_AppNames[i], app.toJSON());
                }
                else {
                    //app = new App(JSON.parse(appJSON));
                }
                _Apps.add(app);
            }
            return _Apps;
        }
    }

    var localStorageApp = function () {

        this.Set = function (key, value) {
            localStorage.setItem(key, value);
        }
        this.Get = function (key) {
            if (localStorage.getItem(key) != undefined) {
                return localStorage.getItem(key);
            }
            else {
                return null;
            }
        }

        this.Delete = function () {
            if (localStorage.getItem(key) != undefined) {
                localStorage.removeItem(key);
            }
        },
        this.Clear = function () {
            localStorage.clear();
        }


    }

    return new repository();
});