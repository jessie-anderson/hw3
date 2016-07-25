import Firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCfrP62rK7kG7LZPyKpt9AC4jDiLqGSb78',
  authDomain: 'sticky-notes-fb6b9.firebaseapp.com',
  databaseURL: 'https://sticky-notes-fb6b9.firebaseio.com',
  storageBucket: 'sticky-notes-fb6b9.appspot.com',
};
Firebase.initializeApp(config);

// Get a reference to the database service
const database = Firebase.database();

// subscribe to a change in 'attribute' in Firebase
export function updateInfo(attribute, callback) {
  database.ref(attribute).on('value', (snapshot) => {
    callback(snapshot);
  });
}

// push new note to database
export function addNote(note, defaultX, defaultY, highestIndex) {
  database.ref('notes').push(note);
  database.ref('defaultX').set(defaultX + 5);
  database.ref('defaultY').set(defaultY + 5);
  database.ref('highestIndex').set(highestIndex + 1);
}

// delete note from database
export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

// edit the body of the note with the given id, push change to database
export function editBody(id, newBody) {
  database.ref('notes').child(id).update({ body: newBody });
}

// delete all notes from database and reset other state variables
// basically set app back to initial state
export function deleteAllNotes() {
  database.ref('notes').set({});
  database.ref('defaultX').set(20);
  database.ref('defaultY').set(20);
  database.ref('highestIndex').set(0);
}

// change edit status of note with given id, push change to database
export function changeEditStatus(id, editStatus) {
  database.ref('notes').child(id).update({ isEditing: editStatus });
}

// update all z indices of notes according to which one needs to come to front
export function updateZIndices(notes, highestIndex, pressedIndex, noteId) {
  notes.forEach((note, id) => {
    if ((notes.get(id).zIndex >= pressedIndex) && (id !== noteId)) {
      database.ref('notes').child(id).update({ zIndex: note.zIndex - 1 });
    } else if (id === noteId) {
      database.ref('notes').child(id).update({ zIndex: highestIndex });
    }
  });
}

// update position of note with given id when dragged
export function updatePosition(id, x, y) {
  database.ref('notes').child(id).update({ x, y });
}
