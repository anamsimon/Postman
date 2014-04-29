define(['jquery', 'models/app', 'models/appCollection'], function ($, App, AppCollection) {
    var appNames = ['BrandShare', 'Marcombox', 'Zabbix'];

    var repository = function () {
        this.GetApps = function () {
            var storage = new localStorageApp();
            var apps = new AppCollection();
            for (var i = 0; i < appNames.length; i++) {
                var app;
                var appJSON = storage.Get(appNames[i]);
                if (appJSON == null) {
                    app = new App({ Name: appNames[i] });
                }
                else {
                    app = new App(JSON.parse(appJSON));
                }
                apps.add(app);
            }
            return apps;
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