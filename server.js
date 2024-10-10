const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON
app.use(express.json());
app.use(cors())



// connect to MongoDB
mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
});

// Defining the mongoose schema for the user. The schema will represent the structure of the user data in the database
// all feilds are required and have to be unique except for password, that doesnt have to be unique
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
})

// Creating model named "User" from the userSchema, this model is what will be use to interact with the users collection in the database
const User = mongoose.model("User", userSchema)

// define route for user registration
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body // Extracting the username, email and password from the request body

    try{
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create a new user object
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save()

        // Send a successful response
        res.status(201).json({ message: "User Registered" })
    }catch(error){
        // send an error response
        res.status(400).json({ error: error.message})
    }

});

// route for logging in
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await User.findOne({ username });
        if(!user){
            return res.status(400).json({ error: "Invalid email or password"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ error: "Invalid email or password"})
        }

        res.status(200).json({ message: "Login successful" });
    }catch(error){
        res.status(500).json({ error: error.message })
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})