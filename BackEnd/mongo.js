const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

//lukee nimen komennon osasta 3 osa TEHT3.11
const name = process.argv[3]
//lukee numeron komennon osasta 4 osa TEHT3.11
const number = process.argv[4]

const url =
  `mongodb+srv://[username]:[password].@cluster0.esedjtk.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


//Tallentaa yhteystiedon mikäli sellainen annettu komennossa eli komennolla node mongo.js salasana nimi numero osa TEHT3.11

if(name!= undefined){

    const person = new Person({
        name: name,
        number: number,
      }) 
      
      person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
      })

}





//Tulostaa phonebook nimen ja numeron node mongo.js salasana komennolla osa TEHT3.11

Person.find({}).then(result => {
    console.log("Phonebook")
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })


