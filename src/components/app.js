import React, { Component } from 'react';
import Immutable from 'immutable';
// import marked from 'marked';
import Note from './note';
import NoteBar from './notebar';

// import Welcome from './welcome';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);
    // init component state here
    const note1 = {
      title: 'Note 1',
      body: 'This is a test note',
      x: 50,
      y: 50,
      isEditing: false,
    };
    const note2 = {
      title: 'Note 2',
      body: 'This is a second test note',
      x: 20,
      y: 20,
      isEditing: false,
    };
    const note3 = {
      title: 'Note 3',
      body: 'This is a third test note',
      x: 70,
      y: 70,
      isEditing: false,
    };
    let staticNotes = Immutable.Map();
    staticNotes = staticNotes.set('a', note1);
    staticNotes = staticNotes.set('b', note2);
    staticNotes = staticNotes.set('c', note3);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onNotebarInput = this.onNotebarInput.bind(this);
    this.onNotebarSubmit = this.onNotebarSubmit.bind(this);
    this.state = {
      notes: staticNotes,
      notebarInput: '',
      currentNote: undefined,
      //...
    };
  }
/*
  onDrag(e, ui) {
      const {x, y} = this.state.deltaPosition;
      this.setState({
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        }
      });
    },
*/
  onDeleteClick(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  onEditClick(id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { isEditing: !n.isEditing }); }),
    });
  }

  onBodyChange(event, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { body: event.target.value }); }),
    });
  }

  onNotebarInput(event) {
    const defaultX = 20;
    const defaultY = 20;
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
    });
    this.setState({
      currentNote: undefined,
    });
  }

  render() {
    const notes = this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <Note onBodyChange={this.onBodyChange} onEditClick={this.onEditClick} onDeleteClick={this.onDeleteClick} id={id} note={note} />
      );
    });
    return (
      <div>
        <NoteBar onNotebarSubmit={this.onNotebarSubmit} onNotebarInput={this.onNotebarInput} />
        {notes}
      </div>
    );
  }
}

export default App;
