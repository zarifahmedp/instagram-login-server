const express = require("express")
const ObjectId = require('mongodb').ObjectId
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
app.use(cors())
app.use(express.json())

// <<--connecting to server-->> //
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://INSTAGRAMLOGIN:YutjmYTz70atajDq@cluster0.qw3m2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// DB USER ------------>>
// Username : INSTAGRAMLOGIN
// password : YutjmYTz70atajDq 

async function run() {
    try {
        await client.connect();
        console.log('Connected To Database');
        const database = client.db("InstagramLogin");
        const usersCollection = database.collection("usersCollection");

        // <<<--------------------Blogs------------------------>>> 
        // [Post Blogs]
        app.post('/users', async (req, res) => {
            const newUsers = req.body
            console.log('hitting the user', newUsers);
            const result = await usersCollection.insertOne(newUsers)
            console.log('New User', newUsers);
            res.json(result)
        })

        // [Get Blogs]
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({})
            const users = await cursor.toArray()
            res.send(users)
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


// listening to port 
app.get('/', (req, res) => {
    res.send('Instagram Login [Backend]')
})

app.listen(port, () => {
    console.log('Running Instagram Login On Port:', port);
})