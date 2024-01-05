# adp2_ex2

This project will be a web application named Boya, that will work as social media for sharing messages.

The application will be under the server and every user who want to join it will need to go to http://localhost:2500/
and then the server will give him the login page. The server supports multiusers and Realtime messages by using socket.io.
To communicate with other user you have to verify that you both are connected to the same server. The server will store all
the data on mongo dB-server online such that all users will be synchronized with the same DB.

In the application the user can register to the app and then to login and start chatting with other users that logged in.

The app's homepage is the login page, since the user need to register first, click on the "click here" under the sign in button
(Not registered? Click Here to register), then you will be moved to the register page.

To register the app, the user need to choose a username and difficult password that will be longer than 7 characters, and will
contain at least one capital letter, lowercase letter and special symbol and will not contain '#'.

After well registration the user will be moved to the login page, and after logging he will be moved to the chats page.

The app has default user (username: "Boya") to demonstrate the use of the app without registering with 2 users.

To start a new chat with other signed in users:

click on the plus symbol with the mouse

search the other user's username

click to open the chat.

To log out click the log out button.

then you close the app it will not save the users you signed in.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

How to run:

In this exercise we have 3 part and we will run each part differently:

**To run part 1:** run the swagger server that imported in the exercise instructions, and then run the react app by:
get into the Boya folder in the terminal and then run:

### `npm start`

**To run part 2:** run our server by get into the server folder in the terminal and then run:

### `node app.js`

and then run the react app by: get into the Boya folder in the terminal and then run:

### `npm start`

**To run part 3:** run our server by get into the server folder in the terminal and then run:

### `node app.js`

And then go with your favorite browser, on every pc you want to chat with, to http://localhost:2500/ .
(make share you running the server only on one pc and that all the client are connected to the server by WI-FI and etc.
if client connecting by WIFI to the server he may need to go to http://server-External-Ip:2500/ .)
