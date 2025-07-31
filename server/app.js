require('dotenv').config({quiet: true})
const express = require("express")
const dbConnect = require('./app/config/dbConfig')
const path = require('path')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express()

// DB connect
dbConnect()


app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Needed if you're using cookies or Authorization headers
}));
// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public')); // just in case
// 👇 This will expose `public/uploads` at `/uploads` in the URL
app.use('/uploads', express.static(path.join(__dirname, 'app/public/uploads')));

//Routes
const authRouter = require('./app/routes/authRouter')
const dashboardRouter = require('./app/routes/dashboardRouter')
const filesRouter = require('./app/routes/fileRoutes')
const paymentRoutes = require('./app/routes/paymentRoutes');
const adminRoutes = require('./app/routes/adminRoutes');
app.use('/api/payment', paymentRoutes);
app.use('/api', authRouter)
app.use('/api', dashboardRouter)
app.use('/api', filesRouter)
app.use('/api/admin', adminRoutes)

const port = 8001
app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
    
})