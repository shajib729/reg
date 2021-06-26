const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/regform", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log("Error Connection");
})