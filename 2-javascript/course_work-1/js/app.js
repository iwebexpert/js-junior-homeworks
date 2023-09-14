import NotesApp from "./NotesApp.js";

const notesApiUrl = "https://jsonplaceholder.typicode.com/todos";
new NotesApp(document.querySelector(".notes"), document.querySelector(".add-note"), notesApiUrl);
