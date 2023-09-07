class Reader {
	surname = null
	name = null;
	patronymic = null;
	readerTicketNumber = null;
	dateOfBirth = null;
	email = null;
	books = [];

	constructor(surname, name, patronymic, readerTicketNumber, dateOfBirth, email) {
		this.surname = surname;
		this.name = name;
		this.patronymic = patronymic;
		this.readerTicketNumber = readerTicketNumber;
		this.dateOfBirth = dateOfBirth;
		this.email = email;
	}

	receiveBook(books) {
		let newBooks = [];
		let answer = `${this.surname} ${this.surname || ''} ${this.patronymic || ''} взял книги: `;
		for (const book of books) {
			if (!this.books.includes(book)) {
				newBooks.push(book);
			}
			answer += `"${book.bookTitle}", `;
		}
		this.books = [...this.books, ...newBooks];
		return answer.trim().slice(0, -1);
	}

	returnBook(books) {
		let answer = `${this.surname} ${this.surname || ''} ${this.patronymic || ''} вернул книги: `;
		for (const book of books) {
			this.books = this.books.filter(exBook => exBook !== book);
			answer += `"${book.bookTitle}", `;
		}
		return answer.trim().slice(0, -1);
	}
}