import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory()
    
    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfuly added the exercise");
        } else{
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div>
            <h3>Add Exercise</h3>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select value={unit} onChange= {e => setUnit(e.target.value)}>
                <option value={'lbs'}>lbs</option>
                <option value={'kgs'}>kgs</option>
                </select>
            <input
                type="text"
                value={date}
                placeholder="Enter date: MM-DD-YY"
                onChange={e => setDate(e.target.value)} />
            <button className="button1"
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;