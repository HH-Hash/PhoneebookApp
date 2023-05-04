import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const checkDubli = persons.filter(function(x) {
    return x.name === newName
  })

  const addNumber = (event) => {
    event.preventDefault()
    const nameObject = [{
      name: newName,
      number: newNum
    }]

    if(checkDubli.length === 0){ 
        console.log(newName)
        console.log(persons)

        setPersons(persons.concat(nameObject))
    }
    else{
        alert(`${newName} is already added to phonebook`)
    }



    setNewName('')
    setNewNum('')
  }

 


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>

        <div>
          number: <input value={newNum} onChange={handleNumber}/>
        </div>


        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>
        {persons.map((person) => <div>{person.name} {person.number}</div>)}
      </div>

    </div>
  )

}

export default App