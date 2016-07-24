import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import SmartNotebar from './smartNotebar';
import DeleteButton from './deletebutton';
import * as Firebase from '../firebase';

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

  // subscribe to any changes in info in Firebase
  componentDidMount() {
    Firebase.updateInfo('notes', (snapshot) => {
      this.setState({
        notes: Immutable.Map(snapshot.val()),
      });
    });
    Firebase.updateInfo('defaultX', (snapshot) => {
      this.setState({
        defaultX: snapshot.val(),
      });
    });
    Firebase.updateInfo('defaultY', (snapshot) => {
      this.setState({
        defaultY: snapshot.val(),
      });
    });
    Firebase.updateInfo('highestIndex', (snapshot) => {
      this.setState({
        highestIndex: snapshot.val(),
      });
    });
  }

  // when user clicks any note, it will come to the front
  onMouseDown(e, id) {
    const notes = this.state.notes;
    const highestIndex = this.state.highestIndex;
    const pressedIndex = this.state.notes.get(id).zIndex;
    Firebase.updateZIndices(notes, highestIndex, pressedIndex, id);
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
    Firebase.updatePosition(id, ui.x, ui.y);
  }

  // when user clicks delete button on note
  onDeleteClick(id) {
    Firebase.deleteNote(id);
  }


  // when user clicks edit button on note
  onEditClick(id) {
    const editStatus = this.state.notes.get(id).isEditing;
    Firebase.changeEditStatus(id, !editStatus);
  }

  // when user changes body of note
  onBodyChange(event, id) {
    Firebase.editBody(id, event.target.value);
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
    Firebase.addNote(newNote, this.state.defaultX, this.state.defaultY,
                      this.state.highestIndex);
  }

  // delete all notes
  onDeleteButtonClick() {
    Firebase.deleteAllNotes();
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
