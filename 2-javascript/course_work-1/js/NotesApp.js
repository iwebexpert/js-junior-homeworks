import NewsList from "./NewsList.js";

export default class NotesApp {
	notes = null;

	constructor(AppRootElement, AddNoteModal, apiUrl) {
		this.appElement = AppRootElement;
		this.apiUrl = apiUrl;
		this.notesDisplayContainer = this.appElement.querySelector(".notes__show");
		this.addNoteModal = AddNoteModal;
		this.init().finally(()=> console.log("Приложение запущено!"));
	}

	async getInitialNotes() {
		try {
			const res = await fetch(this.apiUrl);
			if (res.ok) {
				return res.json();
			}
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	handleAddNote(event) {
		const editedId = event.target.closest(".note").dataset.noteId;
		if (event.target.classList.contains("note__delete")) {
			if (this.notesDisplayContainer.dataset.displayedNote === editedId) {
				delete this.notesDisplayContainer.dataset.displayedNote;
				this.notesDisplayContainer.value = null;
			}
			this.notes.removeItem(editedId);
			event.target.closest(".note").remove();
			return;
		}
		this.notes.showItem(this.notesDisplayContainer, editedId);
	}

	handleNoteEdit(event) {
		const editContainer = event.target.closest(".notes").querySelector(".notes__show");
		const editedId = editContainer.dataset.displayedNote || null;
		if (editedId === null) {
			return false;
		}
		const rawData = editContainer.value;
		const data = this.prepareEditedData(rawData);
		this.notes.editItem(editedId, data);
	}

	handleCloseAddNoteModal(event) {
		const noteTitleInput = this.addNoteModal.querySelector("#note-title");
		const noteDescriptionInput = this.addNoteModal.querySelector("#note-text");
		setTimeout(() => {
			noteTitleInput.value = null;
			noteDescriptionInput.value = null;
		}, 500);
	}

	prepareListeners() {
		const addNoteBtn = this.addNoteModal.querySelector("#add-note");
		const addNoteCloseElems = this.addNoteModal.querySelectorAll("#add-note-close, .btn-close");
		const dispatchClick = new Event("click");
		this.notes.listContainer.addEventListener("click", (event) => this.handleAddNote(event));
		document.querySelector(".note__edit").addEventListener("click", (event) => this.handleNoteEdit(event));
		addNoteBtn.addEventListener("click", (e) => {
			if (addNoteCloseElems[0]) {
				addNoteCloseElems[0].dispatchEvent(dispatchClick);
			}
			return this.addNote();
		});
		addNoteCloseElems.forEach((closeElem) => {
			closeElem.addEventListener("click", (event) => this.handleCloseAddNoteModal(event));
		});
	}

	async init() {
		try {
			const resNotes = await this.getInitialNotes();
			this.notes = new NewsList(this.appElement.querySelector(".notes__list"));
			this.notes.createItems(resNotes);
			this.notes.listContainer.insertAdjacentHTML("afterbegin", this.notes.listItems.map((listItem) => listItem.render()).join(""));
			this.prepareListeners();
		} catch (e) {
			console.log("Не удалось получить заметки");
		}
	}

	prepareEditedData(rawData) {
		const data = rawData.trim().split("\n");
		return {title: data.splice(0, 1).join("\n"), description: data.join("\n")};
	}

	addNote() {
		const noteTitleInput = this.addNoteModal.querySelector("#note-title");
		const noteDescriptionInput = this.addNoteModal.querySelector("#note-text");
		const noteId = this.notes.listItems.length + 1;
		if (!noteId || !noteTitleInput || !noteDescriptionInput) {
			return false;
		}
		this.notes.addOneItem({
			id: noteId,
			title: noteTitleInput.value,
			description: noteDescriptionInput.value
		});
		noteTitleInput.value = null;
		noteDescriptionInput.value = null;
		return true;
	}
}
