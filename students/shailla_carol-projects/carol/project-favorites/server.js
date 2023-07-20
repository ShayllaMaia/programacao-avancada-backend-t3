/*
const http = require('http')
const fs = require('fs')
const path = require('path')
const { fileURLToPath } = require('url')

http.createServer((req,res)=>{
    const file = (req.url === '/') ? 'index.html'  //tem o conteudo do css e js
    : req.url
    
    //dinamico, deixa chegar em qualquer coisa 
    const pathFile = path.join(__dirname,'public', file) //pega o caminho

    //aceita 3 extensões (html, css e js), qualquer coisa diferente disso só deixa passar
    const extname = path.extname(pathFile)
    const permitidos = ['.html', '.css', '.js']
    //buscar no vetor se a extensao que ta na requisição é uma das três, se n for faz rotina de bloquear a aplicação
    const aceitos = permitidos.find( item => { item === extname }) //procurar dentro do vetor alguém
    if(!aceitos) return

    fs.readFile(pathFile, (err,content)=>{ //lê esse caminho
        if(err) throw err

        res.end(content)
    })
	
    /*if(req.url === '/')
    //não tem os conteudos do css e etc, era somente estático
        fs.readFile(path.join(__dirname,'public','index.html'), (err,content)=>{
            if(err) throw err

            res.end(content)
        })
        
}).listen(3000,()=>{
    console.log('Testando...')
})
*/

const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req,res)=>{
	
    const file = (req.url === '/') ? 'index.html' : req.url
    const pathFile = path.join(__dirname,'public',file)

    const extname = path.extname(pathFile)
    const allowedFileTypes = ['.html','.css','.js']
    const allowed = allowedFileTypes.find(item => item == extname)
    if(!allowed) return

    fs.readFile(pathFile , (err,content)=>{
        if(err) throw err

        res.end(content)
    })

    
}).listen(5000,()=>{
    console.log('Servidor rodando...')
})