class ProductTechnology extends AbstractProduct {
	isUsed = null;
	hasBatarry = null;

	constructor(title, price, rating, comment, isUsed = false, hasBatarry = false) {
		super(title, price, rating, comment);
		this.isUsed = isUsed;
		this.hasBatarry = hasBatarry;
	}
}