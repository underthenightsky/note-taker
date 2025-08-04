// NoteList.js
import React, { useState } from 'react';
import Note from './Note';
import 'bootstrap/dist/css/bootstrap.min.css';

const NoteList = ({ notes, setNotes, onDelete }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImportant, setNewImportant] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);

    const handleAddNote = () => {
        const newNote = {
            id: notes.length + 1,
            title: newTitle,
            description: newDescription,
            important: newImportant,
        };
        setNotes([...notes, newNote]);
        setNewTitle('');
        setNewDescription('');
        setNewImportant(false);
    };

    const onMarkImportant = (id) => {
        setNotes(
            notes.map((note) =>
                note.id === id ? {
                    ...note,
                    important: !note.important
                } : note
            )
        );
    };

    const handleUpdateNote = (id, updatedTitle, updatedDescription, updatedImportant) => {
        const updatedNotes = notes.map((note) =>
            note.id === id ? {
                ...note,
                title: updatedTitle,
                description: updatedDescription,
                important: updatedImportant
            } : note
        );
        setNotes(updatedNotes);
        setEditingNoteId(null);
        setNewTitle('');
        setNewDescription('');
        setNewImportant(false);
    };

    return (
        <div className='container'>
            <div className="row mb-3">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Note Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </div>
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Note Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="importantCheck"
                            checked={newImportant}
                            onChange={(e) => setNewImportant(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="importantCheck">
                            Mark as Important
                        </label>
                    </div>
                </div>
                <div className="col">
                    {editingNoteId ? (
                        <button
                            className="btn btn-success"
                            onClick={() => handleUpdateNote(
                                editingNoteId,
                                newTitle,
                                newDescription,
                                newImportant
                            )}
                        >
                            Save
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleAddNote}>
                            Add Note
                        </button>
                    )}
                </div>
            </div>
            <div className="row">
                {notes.map((note) => (
                    <div key={note.id} className="col-md-4 mb-3">
                        <Note
                            note={note}
                            onMarkImportant={onMarkImportant}
                            onDelete={onDelete}
                            onEdit={() => {
                                setNewTitle(note.title);
                                setNewDescription(note.description);
                                setNewImportant(note.important);
                                setEditingNoteId(note.id);
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoteList;