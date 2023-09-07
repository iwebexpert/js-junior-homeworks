class Customer {
	name = null;
	email = null;
	password = null;
	basket = null;

	constructor(name, email, password, basket) {
		this.name = name;
		this.email = email;
		this.password = password;
		if (!(basket instanceof Basket)) {
			throw new Error('В качестве корзины был передан не экземпляр класса Basket');
		}
		this.basket = basket;
	}
}