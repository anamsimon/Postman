This application is a basic example of using Push Notifications provided by Everlive.

### Requirements
- Registration in Everlive (http://www.everlive.com) and Icenium (http://www.icenium.com)
- The certificates required for APNS (Apple Push Notifications Service)
- Active GCM (Google Cloud Messaging) service and Google project API key

### Install
1. Log in Icenium (Myst/Graphite) and clone the repository.
2. Open the main.js file located in the '/scripts/app' folder. 
3. Locate the string GOOGLE_PROJECT_NUMBER and replace it with your Google project number. More details on obtaining the project number can be found here: https://developers.google.com/console/help/#projectnumber
4. Locate the string EVERLIVE_API_KEY and replace it with the API Key of your 'Friends' project in Everlive. It can be found in the API Keys section.
5. Enable Push Notifications in Everlive. Go to your project settings and in the Push Notifications section activate the push providers.
5. Deploy the project to mobile device and run it.
