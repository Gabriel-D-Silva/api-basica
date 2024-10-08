import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//
// DADOS DATABASE
// login: gabriel
// senha: SfMOKzsNWyXtU5a0
//

const app = express()
app.use(express.json())
const port = 3000

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            name: req.body.name,
            email:  req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            email:  req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {
    let users = [] 

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }
    res.status(200).json(users)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
        message: "usuario deletado"
    })
})

app.listen(port)