const router = require('express').Router()
const Person = require('../models/Person')

//criação de dados
router.post('/', async (req, res) => {
    const {name, url} = req.body
    const Person = {
        name,
        url
    }

    //criando dados no mongodb
    try{
        await Person.create()
        res.status(201).json({message: 'Inserido no sistema com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//leitura de dados
router.get('/', async (req,res) => {
    try {
        const dados = await Person.find()
        res.status(200).json(dados)
    } catch (error) {
        res.status(500).json({error: error})
        
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const Person = await Person.findOne({_id: id})
        if (!Person){
            res.status(422).json({message: 'URL não encontrada'})
            return
        }
        res.status(200).json(Person)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//update
router.patch('/:id', async (req, res) =>{
    const id = req.params.id
    const {name, url} = req.body
    const person = {
        name, 
        url
    }
    try {
        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({message: 'URL não encontrada'})
            return
        }

        res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//deletar
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    if(updatePerson.matchedCount === 0) {
        res.status(422).json({message: 'URL não encontrada'})
        return
    }
    try {
        await Person.deleteOne({_id:id})
        res.status(200).json({message: 'Link removido com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }

})

module.exports = router