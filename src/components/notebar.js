import React from 'react';

const NoteBar = (props) => {
  return (
    <form onSubmit={(event) => { props.onNotebarSubmit(event); }} id="note-bar">
      <input onChange={props.onNotebarInput} placeholder="new note title" />
      <input type="submit" />
    </form>
  );
};

export default NoteBar;
