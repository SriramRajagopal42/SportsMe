# SportsMe

SportsMe is a full stack web application connecting users to sports! This app will allow users to effortlessly create and join groups looking for games in a variety of different sports, providing an easy way for users to find other people to play sports with and line up their schedules.

## Features

- Users are able to create and join different groups  
- Groups are able to be customized based on the sport, location, and number of people  
- Filter posts based on requirements set by user  
- Users who create posts can add additional comments if desired  
- Add friends (users that you frequently play with), accept friend requests, and remove friends    
- Automatically sends notifications regarding friend requests to users via email  

## Technologies

- JavaScript
- Node.js
- React.js
- Express.js
- MongoDB

## Setup

In order to run a local instance of SportsMe, first clone or download a copy of this repository. Then, follow the instructions below!

### .env File

In the backend folder, create a `.env` file with the following contents:  
PORT=4000  
MONGO_URI=mongodb+srv://sjsavioj  
@cluster0.xbdaslo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0  
SECRET=sportsme  
GMAIL=sportsme.emailmanager@gmail.com  
GMAILPASS=ehud eoxx klip fvne  
mongo_password=fPP3thotpp52kP4Z  
mongo_user=sjsavioj  


### Dependencies

This will download a set of `node_modules` for both the backend and frontend servers.

#### Main Backend Dependencies:

- **Express.js**: The web server library that powers the backend.
- **Mongoose**: An object-document mapping (ODM) library for MongoDB.

#### Main Frontend Dependencies:

- **React.js**: The library for building user interfaces.
- **react-router-dom**: Enables navigation and routing in the application, simulating paths for different pages.

## Instructions

### Setup

To setup the dependencies for the frontend application, run:

```bash
cd backend
npm install
cd ../frontend
npm install
```
### Running  
To start the application:

```bash
cd backend
npm run dev
```
To start the application:  
```bash
cd frontend
npm start
```
The frontend will be available on http://localhost:3000, which should appear in your browser automatically.  

## Authors  
The app SportsMe was created by Savio Joseph, Arnav Kushwah, Sriram Rajagopal, Sailesh Gunaseelan, and Pranav Akella as a project for CS35L.


