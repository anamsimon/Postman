
define(function () {

    //Initializes the device for push notifications.
    var messageBar = "#message";
    var successText = "SUCCESS!<br /><br />The device has been initialized for push notifications.<br /><br />";
    var enablePushNotifications = function (everlive, androidProjectNumber, emulatorMode, onAndroidPushReceived, onIosPushReceived) {
        //Initialization settings
        var pushSettings = {
            android: {
                senderID: androidProjectNumber
            },
            iOS: {
                badge: "true",
                sound: "true",
                alert: "true"
            },
            notificationCallbackAndroid: onAndroidPushReceived,
            notificationCallbackIOS: onIosPushReceived
        }

        $(messageBar).html("Initializing push notifications...");

        var currentDevice = everlive.push.currentDevice(emulatorMode);

        currentDevice.enableNotifications(pushSettings)
            .then(
                function (initResult) {
                    $(messageBar).html(successText + "Checking registration status...");
                    return currentDevice.getRegistration();
                },
                function (err) {
                    $(messageBar).html("ERROR!<br /><br />An error occured while initializing the device for push notifications.<br/><br/>" + err.message);
                }
            ).then(
                function (registration) {
                    onDeviceIsRegistered();
                },
                function (err) {
                    if (err.code === 801) {
                        registerInEverlive(everlive, function () { onDeviceIsRegistered();});
                    }
                    else {
                        $(messageBar).html("ERROR!<br /><br />An error occured while checking device registration status: <br/><br/>" + err.message);
                    }
                }
            );
    };

    var registerInEverlive = function (everlive, onsuccess) {
        var currentDevice = everlive.push.currentDevice();

        if (!currentDevice.pushToken) currentDevice.pushToken = "some token";
        everlive.push.currentDevice()
            .register({ Age: 30 })
            .then(
                onsuccess(),
                function (err) {
                    alert('REGISTER ERROR: ' + JSON.stringify(err));
                }
            );
    };

    var onDeviceIsRegistered = function () {
        $(messageBar).html("Device registered");
    };

    return { enablePushNotifications: enablePushNotifications };
});


