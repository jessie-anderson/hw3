import React, { Component } from 'react';
import Draggable from 'react-draggable';

const Note = ({ note }) => {
  const title = note.title;
  const body = note.body;
  return (
    <Draggable
      handle=".note-mover"
    >
      <div className="sticky-note">
        <div className="note-title">{title}</div>
        <div className="note-body">{body}</div>
      </div>
    </Draggable>
  );
};

export default Note;
