import React, { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNumber}>
      <div>
        name: <input value={props.newName} onChange={props.handleChange} />
      </div>
      <div>
        number: <input value={props.newNum} onChange={props.handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Phonebook = (props) => {
  return (
    <div>
      {props.persons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNum(event.target.value)
  }

  const checkDubli = persons.filter(function(x) {
    return x.name === newName
  })

  const addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNum
    }
    if (checkDubli.length === 0) {
      phonebookService
        .create(nameObject)
        .then(response => {
          phonebookService
            .getAll()
            .then(response => {
              setPersons(response.data)
              setNewName('')
              setNewNum('')
            })
        })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <PersonForm addNumber={addNumber} newName={newName} newNum={newNum} handleChange={handleChange} handleNumber={handleNumber} />
      </div>
      <h2>Persons</h2>
      <Phonebook persons={persons} />
    </div>
  )
}

export default App
