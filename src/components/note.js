import React from 'react';
// Draggable from https://github.com/mzabriskie/react-draggable/blob/master/example/index.html
import Draggable from 'react-draggable';
// markdown from https://github.com/chjj/marked
import marked from 'marked';
// react-compatible Font Awesome from https://gorangajic.github.io/react-icons/
import FaArrows from 'react-icons/lib/fa/arrows';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaCheck from 'react-icons/lib/fa/check';

const Note = (props) => {
  const title = props.note.title;
  const body = props.note.body;
  let editIcon, bodyArea;

  // edit icon and body of note are different depending on whether
  // note is being edited or not
  if (props.note.isEditing) {
    editIcon = <FaCheck />;
    bodyArea = (
      <textarea
        value={body}
        onChange={(event) => { props.onBodyChange(event, props.id); }}
      />
    );
  } else {
    editIcon = <FaPencil />;
    bodyArea = (
      <div dangerouslySetInnerHTML={{ __html: marked(body || '') }} />
    );
  }
  return (
    <Draggable
      handle="#arrows"
      axis="both"
      onStart={() => { props.onStartDrag(props.id); }}
      onDrag={(e, ui) => { props.onDrag(e, ui, props.id); }}
      onStop={props.onStopDrag}
      zIndex={props.note.zIndex}
      onMouseDown={(e) => { props.onMouseDown(e, props.id); }}
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
        <div id="body">{bodyArea}</div>
      </div>
    </Draggable>
  );
};

export default Note;
