#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const stopMessage = () => {
    return new Promise((res) => setTimeout(res, 2000));
}

const startMessage = async () => {
    console.log(chalk.yellow("Number Guessing Game"));
    console.log("Starting game...");
    await stopMessage();
    console.log(chalk.yellow(`
    ╔╦╗┌─┐┬  ┬┌─┐┬  ┌─┐┌─┐┌─┐┌┬┐  ┌┐ ┬ ┬  ╦ ╦┬ ┬┌─┐┌─┐┬┌─┐┌─┐  ╔═╗┌─┐┬ ┬┌─┐┌─┐┬─┐
     ║║├┤ └┐┌┘├┤ │  │ │├─┘├┤  ││  ├┴┐└┬┘  ╠═╣│ │┌─┘├─┤│├┤ ├─┤  ╔═╝├─┤├─┤│ ││ │├┬┘
    ═╩╝└─┘ └┘ └─┘┴─┘└─┘┴  └─┘─┴┘  └─┘ ┴   ╩ ╩└─┘└─┘┴ ┴┴└  ┴ ┴  ╚═╝┴ ┴┴ ┴└─┘└─┘┴└─
`));
};

await startMessage();

let tries = 3;
let userScore = 0;

const askNumber = async () => {

    const random_number: number = Math.round(Math.random() * 11) - 1; // Generating random number between 1 and 10

    let question = await inquirer.prompt({
        name: "user_number",
        type: "number",
        message: "Guess any number between 1 and 10: ",
        validate: function (input) {
            const number = parseFloat(input);
            if (isNaN(number) || number > 10) {
                return 'Please enter a valid number.';
            }
            return true;
        },
        filter: input => {
            return Number.isNaN(input) || Number(input) <= 0 || Number(input) > 10 ? '' : Number(input)
        },
    });

    let { user_number } = question;

    if (user_number === random_number) {
        userScore++;
        console.log(chalk.green(`Great! You scored 1. Total Score: ${userScore}`));
        tries = 3;
    } else {
        tries--;
        console.log(chalk.red(`Sorry! Wrong number. ${tries} tries left. Total Score: ${userScore}`));
    }

    if (tries < 1) {
        console.log(chalk.bgRed("Game Over"));
        let startAgain = await inquirer.prompt({
            type: "list",
            message: "Do you want to play again? Note: It will reset score",
            choices: ["Yes", "No"],
            name: "userWantGame",
        });
        let { userWantGame } = startAgain;

        if (userWantGame === "Yes") {
            tries = 3;
            userScore = 0;
            await askNumber();
        } else {
            console.log("Thank you for playing my game - Huzaifa Zahoor");
        }

    }

}


do {
    await askNumber();
} while (tries > 0);
