const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://krishna:krishna123@cluster0.epqt2.mongodb.net/ecommerce?retryWrites=true&w=majority', 
{
    useNewUrlParser :true,
    useUnifiedTopology : true,
    useFindAndModify : false 
})
.then(ok => console.log("connected to mongodb"))
.catch(err => console.log("mongodb connection error",err))

module.exports = mongoose