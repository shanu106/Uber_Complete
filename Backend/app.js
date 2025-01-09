
// require Packages start here 

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./database/connectDB');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.routes');
const captainRoute = require('./routes/captain.routes');
const mapsRoute = require('./routes/maps.routes');
const rideRoute = require('./routes/ride.routes');
// require Packages end here 
// app.use start here 

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
  app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');  // Frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Allowed methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // Allowed headers
    res.header('Access-Control-Allow-Credentials', 'true');  // Allow credentials if you're sending cookies
    res.sendStatus(200);  // Send OK status
  });
connectDB();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user', userRoute);
app.use('/captain', captainRoute);
app.use('/map',mapsRoute);
app.use('/ride',rideRoute)

// app.use end here 

// routers of index 

app.get('/', (req, res)=>{
    res.redirect('/user-login');
})


module.exports = app;