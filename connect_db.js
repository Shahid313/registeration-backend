const mongoose = require('mongoose')
 function connect (){
    const uri = 'mongodb+srv://payment:payment@cluster0.n1abu.mongodb.net/paypal?retryWrites=true&w=majority'
    try{
         mongoose.connect(uri,{ useNewUrlParser: true,useUnifiedTopology: true })
        const connection = mongoose.connection;
        connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
        })
    }catch(e){
        console.log(e)
    }
}

module.exports = connect