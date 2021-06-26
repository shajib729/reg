const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://shajib:shajib786@cluster0.emb7s.mongodb.net/regform", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log("Error Connection");
})