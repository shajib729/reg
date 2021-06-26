const express = require("express")
const app = express()
const bycrypt = require("bcryptjs")
const path=require("path")
const hbs = require("hbs")
require("./db/conn")
const Register = require("./models/registers")

const port = process.env.PORT || 3000

const static_path = path.join(__dirname,'../public')
const template_path = path.join(__dirname, '../templates/views')
const partial_path = path.join(__dirname, '../templates/partials')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partial_path)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/delete", (req, res) => {
    res.render("delete")
})

app.get("/deleted", (req, res) => {
    res.render("deleted")
})

app.get("/wrongemail", (req, res) => {
    res.render("wrongemail")
})

// create a new user in our database
app.post("/register",async (req, res) => {
    try {

        const password = req.body.password
        const cpassword = req.body.confirmpassword

        if (password === cpassword) {
            req.body.password=await bycrypt.hash(req.body.password,10)
            const registerEmployee = new Register(req.body)
            const registered = await registerEmployee.save()

            res.status(201).render("index")
            console.log(registered);
        } else {
            res.send("Password are not matching")
        }
    } catch (err) {
        res.status(400).send(err)
    }
})


// mathc user to login 

app.post("/login", async (req, res) => {
    try {

        const email = req.body.email;
        const userInput = await Register.findOne({ email: email })
        
        const password = await bycrypt.compare(req.body.password, userInput.password);

        if (password) {
            res.status(201).render("index");
        } else {
            res.send("Invalid Login Details")
        }
        
    } catch (err) {
        res.send("Invalid Login Details").status(400)
    }
})


// delete user

app.post("/delete", async (req, res) => {
    try {

        const email = req.body.email;

        const userInfo = await Register.findOne({ email: email })

        if (userInfo!=null) {
            await Register.deleteOne({ email: email })
            res.render("deleted")
        } else {
            res.render("wrongemail")
        }
        
    } catch (err) {
        res.send("Error..").status(500)
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})