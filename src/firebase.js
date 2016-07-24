import Firebase from 'firebase';
import Immutable from 'immutable';

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

export function addNote(note, defaultX, defaultY, highestIndex) {
  database.ref('notes').push(note);
  database.ref('defaultX').set(defaultX + 5);
  database.ref('defaultY').set(defaultY + 5);
  database.ref('highestIndex').set(highestIndex + 1);
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function editBody(id, newBody) {
  database.ref('notes').child(id).update({ body: newBody });
}

export function deleteAllNotes() {
  database.ref('notes').set({});
}

export function changeEditStatus(id, editStatus) {
  database.ref('notes').child(id).update({ isEditing: editStatus });
}

export function updateZIndices(notes, highestIndex, pressedIndex, noteId) {
  notes.forEach((note, id) => {
    if ((notes.get(id).zIndex >= pressedIndex) && (id !== noteId)) {
      database.ref('notes').child(id).update({ zIndex: note.zIndex - 1 });
    } else if (id === noteId) {
      database.ref('notes').child(id).update({ zIndex: highestIndex });
    }
  });
}

export function updatePosition(id, x, y) {
  database.ref('notes').child(id).update({ x, y });
}
