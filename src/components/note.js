import React from 'react';
// Draggable from https://github.com/mzabriskie/react-draggable/blob/master/example/index.html
import Draggable from 'react-draggable';
// react-compatible Font Awesome from https://gorangajic.github.io/react-icons/
import FaArrows from 'react-icons/lib/fa/arrows';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaCheck from 'react-icons/lib/fa/check';

const Note = (props) => {
  const title = props.note.title;
  const body = props.note.body;
  let editIcon, bodyArea;
  if (props.note.isEditing) {
    editIcon = <FaCheck />;
    bodyArea = <input value={body} onChange={(event) => { props.onBodyChange(event, props.id); }} />;
  } else {
    editIcon = <FaPencil />;
    bodyArea = (
      <div id="body">{body}</div>
    );
  }
  return (
    <Draggable
      handle="FaArrows"
      axis="both"
      /*
      onStart={props.note.onStartDrag}
      onDrag={props.note.onDrag}
      onStop={props.note.onStopDrag}
      */
    >
      <div id="note">
        <div id="title">
          <ul>
            <li>{title}</li>
            <li onClick={() => { props.onDeleteClick(props.id); }} ><FaTrashO /></li>
            <li onClick={() => { props.onEditClick(props.id); }}>{editIcon}</li>
          </ul>
          <div id="arrows"><FaArrows /></div>
        </div>
        <div>{bodyArea}</div>
      </div>
    </Draggable>
  );
};

export default Note;
