require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const path = require('path');
const app = express()
const fs = require('fs');
app.use(express.json())
app.use(morgan()) 
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/person')


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


//TEHT3.2 objektien määrän näyttämien ja serveri pyyntöaika
app.get('/info', (req, res) => {
  const currentTime = new Date().toString();
  res.send(`Phonebook has info for ${persons.length} persons. <br><br>${currentTime}`);
});

//TEHT3.3 id:llä henkilön näyttäminen
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})


//TEHTÄVÄ 3.14 poisto päivittyy tietokantaan
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//Virheiden käsittely middlewaressa
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id muotoilu virheellinen!' })
  }

  next(error)
}
app.use(errorHandler)

//tiny morgan logs
morgan('tiny')
morgan(':method :url :status :res[content-length] - :response-time ms') 

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
