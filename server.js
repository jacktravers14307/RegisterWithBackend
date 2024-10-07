const express = require("express");
const bcypt = require("bcrypt");
const path = require("path")
const mongoose = require("mongoose")


const PORT = 3000

const app = express()


mongoose.connect("mongodb://localhost:27017/crud")

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))



const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

const User = mongoose.model("User", userSchema)


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"))
})


app.post("/addUser", async (req, res) => {
    try{
        const { username, password, email } = req.body;
        const hashedPassword = await bcypt.hash(password,10)
        const newUser = new User({username, password: hashedPassword, email});
        await newUser.save()
        res.status(201).send("User Added Successfully")
    }catch(error){
        res.status(500).send("Error adding user")
    }
})


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})