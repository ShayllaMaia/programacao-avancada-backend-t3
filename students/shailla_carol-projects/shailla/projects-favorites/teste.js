const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

//ler o JSON no express
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da API
const personroutes = require('./routes/Personroutes')
app.use('/person', personroutes)


//endpoint inicial para ser acessado no postman
app.get('/', (req, res) => {
    //tornar rota funcional
    res.json({message: 'Oi express!'})

}) 

//disponibilização da porta
const DB_USER = process.env.DB_USER
const DB_PSSWD = encodeURIComponent(process.env.DB_PSSWD)
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PSSWD}@cluster1.qoi1vhq.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Conectamos ao MongoDB!")
        app.listen(3000) 
    })
    .catch((err) => console.log(err))