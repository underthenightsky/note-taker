// page.js

'use client';
import React, { useState } from 'react';
import NoteList from './components/NoteList';
import DarkModeToggle from './components/DarkModeToggle';
import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: 'Meeting',
            description: 'Review project, assign task',
            important: false,
        },
        {
            id: 2,
            title: 'Grocery',
            description: 'Milk, Sugar, Apples, eggs',
            important: false,
        },
    ]);

    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    return (
        <div className="container col-md-9 mb-3 mt-5 
        border  bg-white text-black dark:bg-black  dark:text-white">
            <div className="col text-center
           ">
                <h2>Note Taking App</h2>
                <DarkModeToggle/>
            </div>
            <NoteList notes={notes} setNotes={setNotes} onDelete={deleteNote} />
        </div>
    );
};

export default IndexPage;