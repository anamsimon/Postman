/**
 * Created by Piotr Walczyszyn (@pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:20 AM
 */

require.config({
    paths: {
        // RequireJS plugin
        text: 'libs/require/text',
        // RequireJS plugin
        domReady: 'libs/require/domReady',
        // underscore library
        underscore: 'libs/underscore/underscore',
        // Backbone.js library
        Backbone: 'libs/backbone/backbone',
        // jQuery
        jquery: 'libs/jquery/jquery',
        // jQuery Mobile framework
        jqm: 'libs/jquery.mobile/jquery.mobile-1.4.2.min',
        // jQuery Mobile plugin for Backbone views navigation
        jqmNavigator: 'libs/jquery.mobile/jqmNavigator',
        jqTmpl: 'libs/jquery.tmpl/jquery.tmpl'

    },
    shim: {
        jquery: {
            exports: '$'
        },
        Backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        jqm: {
            deps: ['jquery', 'jqmNavigator']
        },
        jqTmpl: { deps: ['jquery'], exports: '$' }
    }
});

//this is test
//This is your Telerik BackEnd Services API key.
var baasApiKey = 'ZC4pI8IMrNUAkvUX';

//This is the scheme (http or https) to use for accessing Telerik BackEnd Services.
var baasScheme = 'http';

//This is your Android project number. It is required by Google in order to enable push notifications for your app. You do not need it for iPhone.
var androidProjectNumber = '665903716372';
//Set this to true in order to test push notifications in the emulator. Note, that you will not be able to actually receive 
//push notifications because we will generate fake push tokens. But you will be able to test your other push-related functionality without getting errors.
var emulatorMode = false;


require(['domReady', 'views/home/HomeView', 'views/message/MessageView', 'libs/everlive/everlive.extended', 'repository', 'notificationHandler', 'jqm', 'jqTmpl'],
    function (domReady, HomeView, MessageView, everliveX, repository, notificationHandler) {

        // domReady is RequireJS plugin that triggers when DOM is ready
        domReady(function () {

            function onDeviceReady(desktop) {
                // Hiding splash screen when app is loaded
                if (desktop !== true)
                    cordova.exec(null, null, 'SplashScreen', 'hide', []);

                // Setting jQM pageContainer to #container div, this solves some jQM flickers & jumps
                // I covered it here: http://outof.me/fixing-flickers-jumps-of-jquery-mobile-transitions-in-phonegap-apps/
                $.mobile.pageContainer = $('#container');

                // Setting default transition to slide
                $.mobile.defaultPageTransition = 'slide';

                // Error handle
                window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
                    alert(url + ":" + lineNumber + ": " + errorMsg);
                    return false;
                }

                // Pushing MainView

                //Initialize the Telerik BackEnd Services SDK
                var el = new Everlive({
                    apiKey: baasApiKey,
                    scheme: baasScheme
                });
                var apps = repository.GetApps();
                $.mobile.jqmNavigator.pushView(new HomeView({ model: apps }));
                //var notification = { 'payload': 'BrandShare says \A brand new activity has been created. Activity Id: 118583' };
                //var message = notificationHandler.Get(notification);
                //$.mobile.jqmNavigator.pushView(new MessageView({ model: message }));
                //BrandShare says "A brand new activity has been created. Activity Id: 118583"
                //$.mobile.jqmNavigator.pushView(new MessageView({ model: message }));

                everliveX.enablePushNotifications(el, androidProjectNumber, emulatorMode, function (notification) {
                    $('#message').html(JSON.stringify(notification));
                    alert(JSON.stringify(notification));
                    var message = notificationHandler.Get(notification);
                    $.mobile.jqmNavigator.pushView(new MessageView({ model: message }));
                    alert(JSON.stringify(notification));
                }, function () { });


            }

            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                // This is running on a device so waiting for deviceready event
                document.addEventListener('deviceready', onDeviceReady, false);
            } else {
                // On desktop don't have to wait for anything
                onDeviceReady(true);
            }

        });

    });