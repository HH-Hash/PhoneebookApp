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



 let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
] 



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})



 //TEHT3.1 json datana näyttäminen
app.get('/api/persons', (req, res) => {
  res.json(persons);
});  




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

  //response.json(person)
})

//TEHTÄVÄ 3.4 id:llä poistaminen
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  person = persons.filter(person => person.id !== id)

  response.status(204).end()
})


//TEHTÄVÄ 3.5 post pyynnöllä numeron lisääminen
const generateId = () => {
    return Math.floor(Math.random() * 100);
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  //error jos nimi jo listalla
   if (persons.find(person => person.name === body.name)){
    response.status(404).json({
      error:'person is already in the book'
    })
  } 
    //error jos nimeä ei annettu
   if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  //error jos numeroa ei annettu
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  persons = persons.concat(person)
  response.json(person)
})

//tiny morgan logs
morgan('tiny')
morgan(':method :url :status :res[content-length] - :response-time ms') 

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
