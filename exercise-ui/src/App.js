import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {IoMdFitness} from 'react-icons/io';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <header><h1>Exercise Tracker
          </h1>
          <p>Log your workouts here!</p>
          <nav className="navbar">
            <ol>
              <li className="navlink"><Link to="/">Home</Link></li>
              <li className="navlink"><IoMdFitness/></li>
              <li className="navlink"><Link to="/add-exercise">Add</Link></li>
            </ol>
          </nav>
          </header>
          <Route path="/" exact>
            <HomePage  setExerciseToEdit={setExerciseToEdit}/>
          </Route>
          <Route path="/add-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
          <footer className="footer">© 2022 Abby Clarke</footer>
          </div>
      </Router>
    </div>
  );
}

export default App;