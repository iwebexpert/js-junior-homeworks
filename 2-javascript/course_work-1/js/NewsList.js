import NewsListItem from "./NewsListItem.js";

export default class NewsList {
	listContainer = null;
	listItems = [];

	constructor(listContainer) {
		this.listContainer = listContainer;
	}

	createItems(itemsData) {
		this.listItems = itemsData.map((noteData) => new NewsListItem(noteData));
		return true;
	}

	getNoteIndexById(id) {
		return this.listItems.findIndex((note) => note.id === parseInt(id, 10));
	}

	createItem(itemData) {
		return new NewsListItem(itemData);
	}

	renderItem(item) {
		this.listContainer.insertAdjacentHTML("afterbegin", item.render());
	}

	addOneItem(itemData) {
		const newItem = this.createItem(itemData);
		this.listItems.unshift(newItem);
		this.renderItem(newItem);
	}

	removeItem(id) {
		const deleteIndex = this.getNoteIndexById(id);
		if (deleteIndex !== -1) {
			this.listItems.splice(deleteIndex, 1);
		}
	}

	showItem(container, id) {
		const showIndex = this.getNoteIndexById(id);
		if (showIndex !== -1) {
			container.innerHTML = null;
			container.dataset.displayedNote = id;
			container.value = `${this.listItems[showIndex].title}\n${this.listItems[showIndex].description}`;
		}
	}

	editItem(id, data) {
		const editIndex = this.getNoteIndexById(id);
		if (editIndex !== -1) {
			for (let key in data) {
				this.listItems[editIndex][key] = data[key];
			}
			const listElement = this.listContainer.querySelector(`[data-note-id="${id}"]`);
			listElement.querySelector(".note__title").textContent = data["title"];
			listElement.querySelector(".note__intro").textContent = data["description"];
			return this.listItems[editIndex];
		}
		console.log("Не выбрана заметка для редактирования!");
	}
}
