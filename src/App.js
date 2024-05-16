import logo from './logo.svg';
import './App.css';
import TodoList from './Components/TodoList';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import React,{useEffect} from 'react';

function App() {

  useEffect(() => {
    document.body.style.backgroundColor = '#3AAFA9';

    // Limpiar el efecto cuando el componente se desmonte
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div >
      <TodoList />
    </div>
  );
}

export default App;
