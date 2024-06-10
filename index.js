const express = require("express");
const {MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());


const uri = "mongodb+srv://biluuuu:Gc4in3g6qA4p1m9r@cluster0.yer4oak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    const ticketCollection = client.db("tickets").collection("ticket");
  
    app.post("/add-tickets", async (req, res) => {
        const service = req.body;
        console.log(service)
        const result = await ticketCollection.insertOne(service);
        res.send(result);
        });
    app.get("/all-tickets", async (req, res) => {
        const result = await ticketCollection.find({}).toArray();
        res.send(result);
        });
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);


app.get("/", (req, res)=>{
  res.send("working")
})


app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Gracefully shut down the server and close the MongoDB connection
// process.on("SIGINT", async () => {
//   console.log("Shutting down...");
//   await client.close();
//   process.exit();
// });
