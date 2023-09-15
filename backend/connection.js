const mongoose = require('mongoose');

const url = 'mongodb+srv://utkarshsinha:proflink@cluster0.p9hyoj9.mongodb.net/Proflink?retryWrites=true&w=majority';
mongoose.connect(url)
.then((result) => {
   // console.log(result);
    console.log('connected to mongodb');
})
.catch((err)=>{
    console.log(err);
});

module.exports = mongoose;
