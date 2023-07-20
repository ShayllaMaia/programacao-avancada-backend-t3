//modulos para sevir o servidor, trabalhar com url e arquivos
const http = require('http')
const data = require('./urls.json') //guarda no objeto data e joga no documento
const URL = require('url')
const fs = require('fs')
const path = require('path')
const express = require ('express')
const app = express() //inicialmente é assim que se "chama" o express instalado no node_modules
const mongoose = require('mongoose')

const Person = require('./models/person')


http.createServer((req,res) => {
    //desestruturação 
    const {name, url, del } = URL.parse(req.url, true).query

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    function writeFile(cb){
        fs.writeFile(
            path.join(__dirname, 'urls.json'),
            JSON.stringify(data, null, 2),
            err => {
                if (err) throw err
                cb('Operação realizada com sucesso!')
            }
        )
    }
    //configuração de rotas
    //se nome é falso e url tbm, vai entrar nesse if e vai mostrar os dados na tela
    if(!name || !url){
        return res.end(JSON.stringify(data)) //esse data está dentro do documento
    }
    if(del){
        data.urls = data.urls.filter(item => item.url != url)
        return writeFile(message => res.end(message))
    }

    //guarda no objeto data e joga no documento
    data.urls.push({name, url})
    return writeFile(message => res.end(message))

}).listen(3000, () => console.log('API rodando...'))


//como chamar quando finalizar: http://localhost:3000/?name=teste&url=http&del=1, um de cada vez

app.use(  //aqui são middlewares
    express.urlencoded ({ //a aplicação fica apta a ler JSON
        extend: true
    })
)

app.use(express.json()) //esse middleware finaliza o anterior

//rota da API
app.post('/Person',  async (req, res) => {
    // req.body

    // {name: 'carolpinheirobd', salary: 5000, approved: false}
    const {name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({error:'o nome é obrigatorio!'})
    }

    const Person = {
        name,
        salary,
        approved 
    }
    try {
        await Person.create(person)


        res.status(201).json({message:'Inserido no sistema'})

    } catch (error) {
        res.status(500).json({error:})
    }
})

// app.listen(5000) o listen vai concretizar o que foi definidio nos middlewares anteriores //

app.get('/', (req, res) => { //aqui mostra a requisiçao

    res.json({message: 'teste' })

})

//ip access do atlas: 187.7.250.2/32 e descriçao My IP Address

//mongoexport --uri mongodb+srv://carolpinheirobd:<api89>@apicluster.83ggofl.mongodb.net/<API REST> --collection <COLLECTION> --type <FILETYPE> --out <FILENAME>

//verifica uma porta
const DB_USER = 'carolpinheirobd'
const DB_PASSWORD = encondeURIComponent('api89')

mongoose.connect(
    'mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.83ggofl.mongodb.net/?retryWrites=true&w=majority'
    )
.then(() =>{ //ajustar isso que ta errado
    console.log('Conectado ao MongoDB')
    app.listen(5000)
})
.catch((err) => console.log(err))

