import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { useState, useEffect } from "react"
import '../App.css';



const TodoList = () => {
    const [todoArray, setTodoArray] = useState([])
    const [Data, setData] = useState({ titulo: '' })

        //Ingeee no se que pasa que si guarda y trae los datos del localstorage pero como que se llama dos veces esta funcion y al final como que se borran
        //deje los console.logs para que se le facile ver el problema
    useEffect(() => {
        const data = window.localStorage.getItem('todoItems')
        console.log(data)
        console.log(JSON.parse(data))
        if (data != null) {
            setTodoArray(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        const data = JSON.stringify(todoArray)
        window.localStorage.setItem('todoItems', data)
    }, [todoArray])

    const handleChange = ({ target }) => {
        setData({ ...Data, [target.name]: target.value })
    }

    const toggleComplete = (id) => {
        const newTodo = [...todoArray]
        let todo = newTodo.find((todo) => todo.id == id)
        todo.isComplete = !todo.isComplete
        setTodoArray(newTodo)
    }

    const addTodo = (e) => {
        e.preventDefault();
        if (Data.titulo != '') {
            const todo = Data
            todo.isComplete = false
            todo.id = Date.now()
            setTodoArray([...todoArray, todo])
            setData({ titulo: '' })
        }
    }

    const deleteAllComplete = () => {
        const newTodo = todoArray.filter(todo => todo.isComplete == false)
        setTodoArray(newTodo)
    }

    const deleteAll = () => {
        const newTodo = todoArray.filter(todo => todo.id == 0)
        setTodoArray(newTodo)
    }


    return (

        <div className="container w-75">
            <br />
            <h1>Lista de quehaceres</h1>
            <br />
            <form className="input-group shadow rounded p-3 formBackground" onSubmit={addTodo}>
                <input className="form-control" type="text" name="titulo" placeholder="Tarea" value={Data.titulo} onChange={handleChange} />
                <input className="btn btn-primary" type="submit" value="Crear nuevo" />
            </form>

            <div className="shadow rounded p-3 mt-5 w-100 formBackground">
                <div className="d-flex list-group-item align-items-center justify-content-between">
                    <button className="btn btn-danger" onClick={deleteAll}>Eliminar todo</button>
                    <button className="btn btn-danger" onClick={deleteAllComplete}>Eliminar completados</button>
                </div>
                <br />
                <hr />
                <br />
                {
                    todoArray.map((todo) =>
                        <div key={todo.id} className="d-flex align-items-center list-group-item">
                            <input type="checkbox" className="form-check-input mx-2" onChange={() => { toggleComplete(todo.id) }} checked={todo.isComplete} />
                            <p className={'p-0 m-0 flex-grow-1 ${todo.isComlete ? "text-decoration-line-through" : "" }'}>
                                {todo.titulo}

                            </p>

                            {todo.isComplete && <span className="badge bg-success">Completada</span>}
                            <p> <br /></p>
                        </div>

                    )
                }
            </div>
        </div>


    )
}

export default TodoList