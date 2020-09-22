const functions = require('firebase-functions');
const express = require("express")
const cors = require("cors");
const stripe = require("stripe")("sk_test_51HTfqYCBzNNFVvGbjItGHwLut80pC8zW1J9hSnAl5OhSHTsy5yxnF6wHE0U7GMlws4heh83VtqhkEkAUzXScJ7YX00WpdXDRfx")

const app = express()
app.use(cors({origin:true}))
app.use(express.json())

app.get("/",(req, res)=>res.status(200).send("Hello world"))
app.post("/payments/create", async (req,res)=>{
    const total = req.query.total
    console.log("payment request received boom! for this amount", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency: "usd"
    })
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})
exports.api = functions.https.onRequest(app)