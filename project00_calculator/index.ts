#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from 'chalk-animation';

const stopAnimation = () => {
    return new Promise((res) => setTimeout(res, 2000));
}

const startMessage = async () => {
    const rainbow = chalkAnimation.rainbow('Welcome to CLI Calculator');
    await stopAnimation();
    rainbow.stop();
    console.log(chalk.green(`
    ╔╦╗┌─┐┬  ┬┌─┐┬  ┌─┐┌─┐┌─┐┌┬┐  ┌┐ ┬ ┬  ╦ ╦┬ ┬┌─┐┌─┐┬┌─┐┌─┐  ╔═╗┌─┐┬ ┬┌─┐┌─┐┬─┐
     ║║├┤ └┐┌┘├┤ │  │ │├─┘├┤  ││  ├┴┐└┬┘  ╠═╣│ │┌─┘├─┤│├┤ ├─┤  ╔═╝├─┤├─┤│ ││ │├┬┘
    ═╩╝└─┘ └┘ └─┘┴─┘└─┘┴  └─┘─┴┘  └─┘ ┴   ╩ ╩└─┘└─┘┴ ┴┴└  ┴ ┴  ╚═╝┴ ┴┴ ┴└─┘└─┘┴└─
`));

};

await startMessage();

const startCalculation = async () => {
    let answers = await inquirer.prompt([
        {
            message: "Please select your calculation method: ",
            name: "operator",
            type: "list",
            choices: ["Addition", "Subtraction", "Multiplication", "Divide"],
        },
        {
            message: "Please enter your first number: ",
            name: "first_number",
            type: "number",
            validate: function (input) {
                const number = parseFloat(input);
                if (isNaN(number)) {
                    return chalk.bgRed.bold('Please enter a valid number.');
                }
                return true;
            },
            filter: input => {
                return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
            },
        },
        {
            message: "Please enter your second number: ",
            name: "second_number",
            type: "number",
            validate: function (input) {
                const number = parseFloat(input);
                if (isNaN(number)) {
                    return chalk.bgRed.bold('Please enter a valid number.');
                }
                return true;
            },
            filter: input => {
                return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
            },
        },
    ]);

    let { operator, first_number, second_number } = answers;

    switch (operator) {
        case "Addition":
            console.log(chalk.blue(`${first_number} + ${second_number} = `) + chalk.green.bold(first_number + second_number));
            break;
        case "Subtraction":
            console.log(chalk.blue(`${first_number} - ${second_number} = `) + chalk.green.bold(first_number - second_number));
            break;
        case "Multiplication":
            console.log(chalk.blue(`${first_number} X ${second_number} = `) + chalk.green.bold(first_number * second_number));
            break;
        case "Divide":
            console.log(chalk.blue(`${first_number} / ${second_number} = `) + chalk.green.bold(first_number / second_number));
            break;
        default:
            break;
    }
}

const startAgain = async () => {
    do {
        await startCalculation();
        var userAnswer = await inquirer.prompt({
            name: "userWant",
            message: "Do you want to calculate again?",
            type: "list",
            choices: ["No thanks!", "Yes"],
        })
        if (userAnswer.userWant === "No thanks!") {
            console.log(chalk.bgGreen.white.bold("Thank you for using my CLI calculator! - Huzaifa Zahoor"));
        }
    } while (userAnswer.userWant === "Yes");
}

startAgain();