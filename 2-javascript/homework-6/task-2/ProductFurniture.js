class ProductFurniture extends AbstractProduct {
	isUsed = false;
	sizes = {};
	constructor(title, price, rating, comment, isUsed = false, sizes = {}) {
		super(title, price, rating, comment);
		this.isUsed = isUsed;
		this.sizes = sizes
	}
}