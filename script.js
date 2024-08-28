document.addEventListener('DOMContentLoaded', () => {
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');
    const saveNoteButton = document.getElementById('saveNote');
    const notesContainer = document.getElementById('notesContainer');

    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('li');
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button onclick="deleteNote(${index})">Eliminar</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    };

    const saveNote = () => {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();

        if (title && content) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push({ title, content });
            localStorage.setItem('notes', JSON.stringify(notes));
            noteTitleInput.value = '';
            noteContentInput.value = '';
            loadNotes();
        } else {
            alert('Por favor, ingrese un título y contenido para la nota.');
        }
    };

    const deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    };

    saveNoteButton.addEventListener('click', saveNote);

    // Load notes when the page is first loaded
    loadNotes();
});
