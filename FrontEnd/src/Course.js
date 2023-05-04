const Course = (props) => {

    const Header = () => {
        return (
            <h1> {props.course.name}</h1>
        )
    }

    const Content = () => {
        return (
            <div>
                {props.course.parts.map(part => (
                    <p key={part.id}>
                        {part.name} {part.exercises}
                    </p>
                ))}
            </div>
        );
    };

    const Total = () =>{
        const total = props.course.parts.reduce((acc, curr)=> acc + curr.exercises, 0);
        return(
            <b> Total of {total} exercises</b>
        );
    };

    return(
        <div>
            <Header />
            <Content/>
            <Total />
        </div>
    )



}
export default Course