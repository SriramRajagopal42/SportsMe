const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions));
app.use(express.json());

const uri = "mongodb+srv://sjsavioj:fPP3thotpp52kP4Z@cluster0.xbdaslo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const Mongo = require("./mongodb.js");
const mongoClient = new Mongo(uri);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/login', async (req, res) => {
  const response =  await mongoClient.validateUser(req.body['email'], req.body['password']);
  res.json(response);
  });
  

app.post('/register', async (req, res) => {
  const response = await mongoClient.addUser(req.body['email'], req.body['password']);
  res.json(response);
});



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  mongoClient.sendPing();
});

