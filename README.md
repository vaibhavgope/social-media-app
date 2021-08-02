# Basic social media app created with MERN stack

### Libraries and dependencies:

1. Used axios for making API calls as it makes the calls shorter and simpler to understand.
2. Some UI elements have been created with Material-UI library. It contains a wide variety of pre-built UI components that look good.
3. Used react-google-login for login and authentication as google is the most ubiquitous of all social platforms and nearly everyone already has a google account and this module provides us with many functions and hooks out of the box.

### Approach:

1. Created very basic frontend first so that I can see changes in real time later when building backend.
2. Used part of email before @ as a unique identifier in many cases as that part will always be unique due to the fact that two users can't have same email address.
3. OAuth takes care of a lot of authentication and session management etc. So didn't have to implement all of that from scratch.
4. Using two models in mongoDB database, one for storing users and other for storing all of the posts.

### Further improvements:

1. Ability to change profile picture can be added.
2. More custom validators can be added so we don't make unnecessary requests to the server.
3. The UI is very basic and can be made to look much better.
4. Ability to add posts other than text like images, gifs etc.
5. Visual feedback of any error that occurs in the backend.

To run the app:
Clone the repo and then go to the root directory using: `cd social-media-app`

1. Install modules and start the frontend:
   `npm install && npm start`
2. Go to backend directory and start the backend:
   `cd social-media-backend && npm install && npm start`

NOTE: Make sure MongoDB is installed and is running.
