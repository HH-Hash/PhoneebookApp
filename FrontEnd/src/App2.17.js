import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import './index.css'

const PersonForm = ({ addNumber, newName, newNum, handleChange, handleNumber }) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        <div>
            name:
        </div>
        <div>
            <input value={newName} onChange={handleChange} class="Forminput" />
        </div>
      </div>
      <div>
        <div>
             number:
        </div>
        <div>
             <input value={newNum} onChange={handleNumber} class="Forminput"/>
        </div>
         
      </div>
      <div>
        <button type="submit" class="Submitbutton">add</button>
      </div>
    </form>
  )
}




const Phonebook = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
        <div class="Row">
            <div class="ColumnA"> 
            {person.name} 
            </div>
            <div class="ColumnB">
            {person.number}{' '}
            </div>
            <div class="ColumnC">
            <button onClick={() => deletePerson(person)} class="Deletebutton">delete</button>
        </div>
        </div>
        </div>

      ))}
    </div>
  )
}

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="informative">
        {message}
      </div>
    )
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16,
      margin: 100
    }
  
    return (
      <div style={footerStyle}>
        <br />
        <em>Phonebook app, Department of Computer Science, University of Turku 2023 by Henri Heinonen</em>
      </div>
    )
  }




const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)

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
        setMessage(`New contact ${newName} added succesfully.`)
        setTimeout(() => {
            setMessage(null)
          }, 2000)
     
        
        //console.log(props.Notification)
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
          setMessage(`Contact information for ${newName} changed succesfully`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)

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
        setMessage(`${personToDelete.name} has been deleted from the books`)
        setTimeout(() => {
            setMessage(null)
          }, 2000)
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
                <h1 class="header">Phonebook</h1>
                <Notification message={message}/>            
            <div>
            <div>
                search{' '}
            </div>
            <div>
                <input value={searchTerm} onChange={handleSearch} class="Forminput" />
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

     
     
      <h2>Phonebook</h2>
      <Phonebook persons={personsToShow} deletePerson={deletePerson} />
      <Footer />
      </div>
      )}

      export default App
