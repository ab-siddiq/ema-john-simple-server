const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntdjh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("emaJohn").collection("product");
    app.get("/product", async (req, res) => {
        const page = parseInt(req.query.page);      
        const size = parseInt(req.query.size);      
      const query = {};
      const cursor =  productCollection.find(query);
      let product;
      if(page || size){
        products = await cursor.skip(page*size).limit(size).toArray();
      }else{
        products = await cursor.toArray();
      }
      
      res.send(products);
    });

    app.get('/productCount',async(req,res)=>{
        const  query = {};
        const cursor = productCollection.find(query);
        const count = await productCollection.estimatedDocumentCount();
        res.send({count});
    })
  } finally {//
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server");
});

app.listen(port, () => {
  console.log("listening port ", port);
});

app.get("/", (req, res) => {});
