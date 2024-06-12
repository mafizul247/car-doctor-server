const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k95s6zq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'Unauthorization Access' })
    }
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'Unauthorization Access' })
        }
        req.decoded = decoded
        next();
    })
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const serviceCollections = client.db('carDoctorDB').collection('services');
        const bookingCollections = client.db('carDoctorDB').collection('bookings');

        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h' });
            res.send({ token });
            // console.log(token)
        })

        app.get('/services', async (req, res) => {
            const result = await serviceCollections.find().toArray();
            res.send(result);
        })

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: new ObjectId(id) };
            const options = {
                projection: { title: 1, price: 1, service_id: 1, img: 1 }
            }
            const result = await serviceCollections.findOne(query, options);
            res.send(result);
        })

        app.get('/bookings', verifyJWT, async (req, res) => {
            // console.log(req.headers);
            // console.log(req.decoded.email);
            const email = req.query.email;
            if(req.decoded.email !== req.query.email) {
                return res.status(403).send({error: true, message: 'Forbidden Access'});
            }

            let query = {};
            if (email) {
                query = { email: email }
            }
            const result = await bookingCollections.find(query).sort({ entryDate: -1 }).toArray();
            res.send(result);
        })

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            booking.entryDate = new Date();
            const result = await bookingCollections.insertOne(booking);
            res.send(result);
        })

        app.patch('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const bookingStatus = req.body;
            // bookingStatus.confirmDate = new Date();
            const updateBooking = {
                $set: { ...bookingStatus }
            };
            const result = await bookingCollections.updateOne(filter, updateBooking);
            res.send(result);
        })

        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bookingCollections.deleteOne(query);
            res.send(result);
            // console.log(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Car Doctor server is running');
})

app.listen(port, () => {
    console.log(`Car Doctor server is running port ${port}`);
})