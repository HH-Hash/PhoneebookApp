const persons = require('./persons');

const Info = (props) => {
var keyCount = Object.keys(persons).length;

return(
    
    <div>
        <p>Phonebook has info for ${keyCount} people</p>
    </div>
    
)
}
module.exports = { info };
export default Info