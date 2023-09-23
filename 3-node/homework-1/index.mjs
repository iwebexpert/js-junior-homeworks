import fs from "fs/promises";
import chalk from "chalk";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
fs.readFile("./files/test.txt", "utf-8")
	.then((data) => {
		const stringsCount = data.match(/^.+(\r\n)/gm).length;
		const lettersCount = data.match(/([a-zA-Z])/gm).length;
		const numbersCount = data.match(/(\d)/gm).length;
		const spacesCount = data.match(/( )/gm).length;
		return {
			data: data.trim(),
			stringsCount,
			lettersCount,
			numbersCount,
			spacesCount,
		};
	})
	.then((res) => {
		console.log(
			chalk.yellow("Содержимое файла:\n"),
			chalk.blue(res.data),
			`\r\nСтрок в файле: ${res.stringsCount}\n`,
			`Букв в файле: ${res.lettersCount}\n`,
			`Цифр в файле: ${res.numbersCount}\n`,
			`Пробелов в файле: ${res.spacesCount}`,
		);
	})
	.catch((e) => {
		console.log("Something went wrong!");
	});

const calc = () => {
	const operandOne = args._[0];
	const operator = args._[1];
	const operandTwo = args._[2];
	if (isNaN(operandOne) || isNaN(operandTwo)) {
		return "Не корректный ввод аргументов";
	}
	switch (operator) {
		case "+":
			return operandOne + operandTwo;
		case "-":
			return operandOne - operandTwo;
		case "*":
			return operandOne * operandTwo;
		case "/":
			if (operandTwo === 0) {
				console.log("На 0 делить нельзя");
				return false;
			}
			return operandOne / operandTwo;
		case "**":
			return operandOne ** operandTwo;
		default:
			throw new Error(
				"Не корректное или не поддерживаемое вычисление, проверьте аргументы",
			);
	}
};
const calculator = () => {
	try {
		console.log(chalk.green(`Result: ${calc()}`));
	} catch (e) {
		console.log(e.message);
	}
};
calculator();
