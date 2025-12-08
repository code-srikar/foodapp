require('dotenv').config();
const port = process.env.PORT || 5000;
const backend = process.env.BACKEND_SERVER;
const cors = require('cors')

const express = require('express');
const app = express();
app.use(cors({origin:'https://s-quick-bite.netlify.app',credentials:true}))

const mongoose = require('mongoose');

const ordermanagement = require('./routers/Adminrouters/ordermanagement.routers')
const restaurantManagementRouter = require('./routers/Adminrouters/restaurantmanagement.routers')
const menuManagementRouter = require('./routers/Adminrouters/menumanagement.routers')

const ordermanagementUserRouter = require('./routers/Userrouters/ordermanagement.routers')
const restaurantmanagementUserRouter = require('./routers/Userrouters/restaurantmanagement.routers')
const userauthentication = require('./routers/Userrouters/userauthentication.routers')



mongoose.connect("mongodb+srv://" + backend)
    .then(console.log("Connected"))
    .catch(err => console.log(err));

app.use(express.json());

//User Endpoints
app.use('/api', userauthentication)
app.use('/api/orders', ordermanagementUserRouter)
app.use('/api/restaurants', restaurantmanagementUserRouter)


//Admin Endpoints
app.use('/api/admin/orders', ordermanagement);
app.use('/api/admin/restaurants', restaurantManagementRouter);
app.use('/api/admin/restaurants', menuManagementRouter);






app.listen(port, () => console.log(`Server running at ${port}`));    
