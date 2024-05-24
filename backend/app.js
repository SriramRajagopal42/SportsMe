const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('./jwt.js');
const cookieParser = require("cookie-parser");

require('dotenv').config();


const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const mongo_password = process.env.mongo_password;
const mongo_user = process.env.mongo_user;
const uri = `mongodb+srv://sjsavioj:${mongo_password}@cluster0.xbdaslo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
const Mongo = require("./mongodb.js");
const mongoClient = new Mongo(uri);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const jwt_secret_key = process.env.jwt_key;
app.post('/login', async (req, res) => {
  const response =  await mongoClient.validateUser(req.body['email'], req.body['password']);
  const jwt_token = jwt.generate_jwt(req.body['user'], req.body['email'], jwt_secret_key);
  res.cookie('token', jwt_token, { httpOnly: true, secure: true }).status(200).json(response);
  });
  

app.post('/register', async (req, res) => {
  const response = await mongoClient.addUser(req.body['email'], req.body['password'], req.body['user']);
  const jwt_token = jwt.generate_jwt(req.body['user'], req.body['email'], jwt_secret_key);
  res.cookie('token', jwt_token, { httpOnly: true, secure: true }).status(200).json(response);
});



const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  mongoClient.sendPing();
});

