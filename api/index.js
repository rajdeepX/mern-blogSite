
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const User = require("./models/User")
const Post = require("./models/Post")
const { default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt');
const app = express()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const uploadFile = multer({ dest: 'uploads/' })
const fs = require("fs");
const path = require("path");

const salt = bcrypt.genSaltSync(10);



// app.use(cors())
app.use(
    cors({
      origin: ["http://localhost:5173", "https://blogsite-mern-blog.onrender.com"],
      credentials: true,
    })
  );

app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + "/uploads"))


const secret = process.env.SECRET

const url = process.env.MONGODB_URL

mongoose.connect(url)


app.post("/register", async (req, res) => {

    try {
        const { username, password } = req.body  // this is the data that is sent from the client as a request to the server

        // res.json({ requestData: { username, password } }) // this is the response from the server to the client. Here the response is sent back to the client as to verify it is received in the server.

        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }

})


app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userDoc = await User.findOne({ username })
        const passOk = bcrypt.compareSync(password, userDoc.password);

        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true, // ✅ Required for HTTPS
                    sameSite: "None", // ✅ Required for cross-origin requests
                }).json({ id: userDoc._id, username });
            });
        }
        else {
            res.status(400).json("wrong credentials")
        }
    } catch (error) {

    }
})


app.get("/profile", (req, res) => {
    const { token } = req.cookies
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
    })
    res.json(req.cookies)
})


app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok")
})


app.post("/post", uploadFile.single('files'), async (req, res) => {
    // console.log(res.json());
    const { originalname, path } = req.file
    const parts = originalname.split(".")
    const ext = parts[parts.length - 1]
    const newPath = path + "." + ext
    fs.renameSync(path, newPath)

    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body

        const postDoc = await Post.create({
            title,
            summary,
            content,
            image: newPath,
            author: info.id,
        })

        res.json(postDoc)
    })




})

app.put("/post", uploadFile.single('files'), async (req, res) => {

    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file
        const parts = originalname.split(".")
        const ext = parts[parts.length - 1]
        newPath = path + "." + ext
        fs.renameSync(path, newPath)
    }

    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { id, title, summary, content } = req.body

        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)

        if (!isAuthor) {
            return res.status(400).json("You are not the author!")
        }

        await postDoc.updateOne({
            title,
            content,
            summary,
            image: newPath ? newPath : postDoc.image,
        })

        res.json(postDoc)
    })
})


app.get("/post", async (req, res) => {
    // const post = 
    res.json(await Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20)
    )
})


app.get(`/post/:id`, async (req, res) => {
    const { id } = req.params
    const postDoc = await Post.findById(id).populate("author", ["username"])
    res.json(postDoc)
})




app.listen(3000, () => {
    console.log("Server started at port: 3000");
})


