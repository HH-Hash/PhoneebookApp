import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const PersonForm = ({ addNumber, newName, newNum, handleChange, handleNumber }) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input value={newName} onChange={handleChange} />
      </div>
      <div>
        number: <input value={newNum} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}




const Phonebook = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const checkDubli = persons.filter(function (x) {
    return x.name === newName
  })

  const addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNum,
    }
    if (checkDubli.length === 0) {
      phonebookService.create(nameObject).then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
      })
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName)
        const changedPerson = { ...person, number: newNum }
        phonebookService.update(person.id, changedPerson).then((response) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : response.data))
          )
          setNewName('')
          setNewNum('')
        })
      }
    }
  }

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      phonebookService.remove(personToDelete.id).then(() => {
        setPersons(persons.filter((p) => p.id !== personToDelete.id))
      })
    }
  }

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

  const personsToShow =
    searchTerm === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return (
          <div>
            <h2>Phonebook</h2>
            <div>
              <div>
                filter shown with{' '}
                <input value={searchTerm} onChange={handleSearch} />
              </div>
            </div>
            <h2>Add a new</h2>
            <PersonForm
              addNumber={addNumber}
              newName={newName}
             
      newNum={newNum}
      handleChange={handleChange}
      handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Phonebook persons={personsToShow} deletePerson={deletePerson} />
      </div>
      )}

      export default App