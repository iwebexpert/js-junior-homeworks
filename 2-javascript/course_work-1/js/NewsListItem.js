export default class NewsListItem {
	id;
	title;
	constructor(rawData) {
		for (let key in rawData) {
			this[key] = rawData[key];
		}
		this.description = rawData.description || `Placeholder Text ${this.title}[${this.id}]`;
	}
	render() {
		return `<div class="notes__item note" data-note-id="${this.id}">
    <header class="note__header mb-2">
      <h5 class="h5 note__title">${this.title}</h5>
      <div class="note__controls">
        <button class="note__delete">Удалить</button>
      </div>
    </header>
    <div class="note__intro">${this.description}</div>
  </div>`;
	}
}
