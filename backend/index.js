const express = require('express');

const app = express();
const port = 5000;

const cors = require('cors');
//import router
const UserRouter = require('./routers/userRouter');
const CreatePostRouter = require('./routers/addPostRouter');
const Util = require('./routers/util');
const LikesRouter = require('./routers/likesRouter');
const FollowRouter = require('./routers/followRouter');

app.use(cors({
    origin : ['http://localhost:3000']
}));
app.use(express.json());

//import middleware
app.use('/user', UserRouter);
app.use('/addpost', CreatePostRouter);
app.use('/util', Util);
app.use('/likes', LikesRouter);
app.use('/follow', FollowRouter);

app.use(express.static('./uploads'));
//creating routes
app.get('/',(req, res)=>{
    res.send('response from express server');
})

// /home
app.get('/home',(req, res)=>{
    res.send('response from express home');
})
// /add
app.get('/add',(req, res)=>{
    res.send('response from express add');

});

app.listen(port, () => {
    console.log('server started');
});