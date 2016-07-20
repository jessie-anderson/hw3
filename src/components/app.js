import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import NoteBar from './notebar';

// top-level app (smart component, contains state for entire app)
class App extends Component {
  constructor(props) {
    super(props);
    // functions that will be passed as props to notebar and notes
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onNotebarInput = this.onNotebarInput.bind(this);
    this.onNotebarSubmit = this.onNotebarSubmit.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    // state
    this.state = {
      notes: Immutable.Map(),
      notebarInput: '',
      // currentNote is the note that is currently being
      // created in notebar
      currentNote: undefined,
    };
  }

  // what to do when user clicks to drag note
  onStartDrag() {
    return;
  }

  // what to do when user releases mouse from dragging note
  onStopDrag() {
    return;
  }

  // what to do while user is dragging mouse
  onDrag(e, ui, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => {
        return Object.assign({}, n, { x: ui.x }, { y: ui.y });
      }),
    });
  }

  // when user clicks delete button on note
  onDeleteClick(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }


  // when user clicks edit button on note
  onEditClick(id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => {
        return Object.assign({}, n, { isEditing: !n.isEditing });
      }),
    });
  }

  // when user changes body of note
  onBodyChange(event, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => {
        return Object.assign({}, n, { body: event.target.value });
      }),
    });
  }

  // when user inputs something into notebar
  onNotebarInput(event) {
    const defaultX = 20;
    const defaultY = 20;
    // change state to reflect that new note is being created
    this.setState({
      notebarInput: event.target.value,
      currentNote: {
        title: event.target.value,
        body: '',
        x: defaultX,
        y: defaultY,
        isEditing: false,
      },
    });
  }

  onNotebarSubmit(event) {
    event.preventDefault();
    this.setState({
      notes: this.state.notes.set(this.state.currentNote.title, this.state.currentNote),
      currentNote: undefined,
      notebarInput: '',
    });
  }

  render() {
    const notes = this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <Note
          id={id}
          key={id}
          note={note}
          onBodyChange={this.onBodyChange}
          onEditClick={this.onEditClick}
          onDeleteClick={this.onDeleteClick}
          onStartDrag={this.onStartDrag}
          onStopDrag={this.onStopDrag}
          onDrag={this.onDrag}
        />
      );
    });
    return (
      <div>
        <NoteBar
          onNotebarSubmit={this.onNotebarSubmit}
          onNotebarInput={this.onNotebarInput}
        />
        {notes}
      </div>
    );
  }
}

export default App;
