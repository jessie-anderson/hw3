import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import SmartNotebar from './smartNotebar';
import DeleteButton from './deletebutton';

// top-level app (smart component, contains state for entire app)
class App extends Component {
  constructor(props) {
    super(props);
    // functions that will be passed as props to notebar and notes
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onNotebarSubmit = this.onNotebarSubmit.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    // state
    this.state = {
      notes: Immutable.Map(),
      highestIndex: 0,
      defaultX: 20,
      defaultY: 20,
    };
  }

  // when user clicks any note, it will come to the front
  onMouseDown(e, id) {
    const pressedIndex = this.state.notes.get(id).zIndex;
    let newNotes = Immutable.Map();
    this.state.notes.forEach((note, curId) => {
      if ((note.zIndex >= pressedIndex) && (curId !== id)) {
        newNotes = newNotes.set(curId,
          Object.assign({}, note, { zIndex: note.zIndex - 1 }));
      } else if (id === curId) {
        newNotes = newNotes.set(curId,
          Object.assign({}, note, { zIndex: this.state.highestIndex }));
      } else {
        newNotes = newNotes.set(curId, note);
      }
    });
    this.setState({
      notes: newNotes,
    });
  }

  // what to do when user clicks to drag note
  onStartDrag(id) {
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

  onNotebarSubmit(event, newTitle) {
    event.preventDefault();
    const newNote = {
      title: newTitle,
      body: '',
      x: this.state.defaultX,
      y: this.state.defaultY,
      isEditing: false,
      zIndex: this.state.highestIndex,
    };
    this.setState({
      notes: this.state.notes.set(this.state.highestIndex, newNote),
      defaultX: this.state.defaultX + 5,
      defaultY: this.state.defaultY + 5,
      highestIndex: this.state.highestIndex + 1,
    });
  }

  // delete all notes
  onDeleteButtonClick() {
    this.setState({
      notes: Immutable.Map(),
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
          onMouseDown={this.onMouseDown}
        />
      );
    });
    return (
      <div>
        <div id="controls">
          <SmartNotebar
            id="note-bar"
            onNotebarSubmit={this.onNotebarSubmit}
          />
          <div id="delete-button">
            <DeleteButton onDeleteButtonClick={this.onDeleteButtonClick} />
          </div>
        </div>
        {notes}
      </div>
    );
  }
}

export default App;
