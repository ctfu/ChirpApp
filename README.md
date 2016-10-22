##Modified MEAN Stack Twitter Clone App From Microsoft Virtual Academy

### What is new? 
The study example from Microsoft Virtual Academy didn't implement client session, which causes user to be logout every time when the page is refreshed. This example does client session handling through AngularJS module ngCookies. It is a simplified implementation just for demo purpose. Besides, api routes in this example are implemented only through HTTP calls without using ngResources.  

This application also incorporates [Mention.js](https://github.com/jakiestfu/Mention.js/) to have the @user functionality.

###Prerequisite
1. Node.js -- https://nodejs.org/
2. Mongodb -- https://www.mongodb.com/

### How to Run?
1. install the prerequisites
2. clone github repository: https://github.com/ctfu/ChirpApp.git
3. terminal run: `npm install`
4. terminal run:`mongod` (some operating system might need sudo permission)
5. terminal run: `npm start`
6. browser: `localhost:3000`

### Screen Shot
![add user](public/images/addUser.png)
![longout](public/images/logout.png)


