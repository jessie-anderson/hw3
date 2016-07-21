import React from 'react';

const NoteBar = (props) => {
  return (
    <form onSubmit={(event) => { props.onNotebarSubmit(event); }} id="note-bar">
      <input type="text" value={props.notebarInput} onChange={props.onNotebarInput} placeholder="new note title" />
      <input type="submit" value="Create" />
    </form>
  );
};

export default NoteBar;
