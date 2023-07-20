//modulos para sevir o servidor, trabalhar com url e arquivos
const http = require('http')
const data = require('./urls.json') //guarda no objeto data e joga no documento
const URL = require('url')
const fs = require('fs')
const path = require('path')


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

