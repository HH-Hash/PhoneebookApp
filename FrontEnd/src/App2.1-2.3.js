const Course = ({ course }) => {

  const Header = (props) => {
    return(
      <div>
        <h1>
          {props.course.name}
        </h1>
      
      
      </div>
    )
  }

    const Content = (props) => {
      const part = props.course.parts.map(part => <p> {part.name} {part.exercises}</p>)
      return(
        <div>
          {part}
        </div>
      )
    }
    const Total = (props) => {
      const total = props.course.parts.reduce((sum, x) => sum + x.exercises, 0)
      return(
        <div>
          <b>Total of {total} exercises</b>
        </div>
      )
    }

    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }




const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
