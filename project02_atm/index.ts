#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const stopMessage = () => {
    return new Promise((res) => setTimeout(res, 2000));
}

const startMessage = async () => {
    console.log(chalk.yellow("Welcome to Zahoor ATM"));
    await stopMessage();
    console.log(chalk.yellow(`
    ╔╦╗┌─┐┬  ┬┌─┐┬  ┌─┐┌─┐┌─┐┌┬┐  ┌┐ ┬ ┬  ╦ ╦┬ ┬┌─┐┌─┐┬┌─┐┌─┐  ╔═╗┌─┐┬ ┬┌─┐┌─┐┬─┐
     ║║├┤ └┐┌┘├┤ │  │ │├─┘├┤  ││  ├┴┐└┬┘  ╠═╣│ │┌─┘├─┤│├┤ ├─┤  ╔═╝├─┤├─┤│ ││ │├┬┘
    ═╩╝└─┘ └┘ └─┘┴─┘└─┘┴  └─┘─┴┘  └─┘ ┴   ╩ ╩└─┘└─┘┴ ┴┴└  ┴ ┴  ╚═╝┴ ┴┴ ┴└─┘└─┘┴└─
`));
};

await startMessage();

let randomAmount = Math.random() * 50000;

const startAtm = async () => {

    const startApp = await inquirer.prompt([
        {
            name: "user_id",
            type: "input",
            message: "Please input your USER ID: ",
        },
        {
            name: "user_password",
            type: "password",
            message: "Please input your passowrd: ",
        },
        {
            name: "transaction",
            type: "list",
            message: "Please Select the transaction: ",
            choices: ["Check Balance", "Withdrawl", "Bill Payment", "Pin Change"],
        },
        {
            name: "userBalanceMenu",
            message: `You have $${randomAmount} in your account`,
            type: "list",
            choices: ["Main Menu", "Logout"],
            when(answers) {
                return answers.transaction === "Check Balance";
            },
        },
        {
            name: "transactionType",
            type: "list",
            message: "Please Select your transaction type: ",
            choices: ["Fast Cash", "Normal"],
            when(answers) {
                return answers.transaction === "Withdrawl";
            },
        },
        {
            name: "fastCash",
            type: "list",
            message: "Select your amount: ",
            choices: [500, 1000, 5000, 10000],
            when(answers) {
                return answers.transactionType === "Fast Cash";
            },
        },
        {
            name: "normalTransaction",
            type: "number",
            message: "Please Enter your amount: ",
            validate: function (input) {
                const number = parseFloat(input);
                if (isNaN(number)) {
                    return 'Please enter a valid number.';
                }
                return true;
            },
            filter: input => {
                return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
            },
            when(answers) {
                return answers.transactionType === "Normal";
            },
        },
        {
            name: "billMenu",
            message: "Please Select your bill: ",
            type: "list",
            choices: ["K-Electric", "PTCL", "Sui Gas"],
            when(answers) {
                return answers.transaction === "Bill Payment";
            },
        },
        {
            name: "pinChangeMenu",
            message: "Please Enter your Old Password: ",
            type: "password",
            when(answers) {
                return answers.transaction === "Pin Change";
            },
        },
        {
            name: "newPin",
            message: "Please Enter your New Password: ",
            type: "password",
            when(answers) {
                return answers.pinChangeMenu;
            },
        },

    ]);

    return startApp;
}

let answers = await startAtm();

if (answers.user_id && answers.user_password) {

    let fastAmount = answers.fastCash;
    let enteredAmount = answers.normalTransaction;

    if (answers.transactionType == "Fast Cash") {
        if (randomAmount > fastAmount) {
            console.log("Receipt");
            console.log(`Your previous balanace: ${randomAmount}`);
            console.log(`Your withdrawl: ${fastAmount}`);
            console.log(`Your current balance: ${randomAmount - fastAmount}`);
            console.log("Thank for using Zahoor ATM");
        } else {
            console.log("You have insufficient money in your account.")
            console.log(`Your current balance: ${randomAmount}`);
        }
    }

    if (answers.transactionType == "Normal") {
        if (randomAmount > enteredAmount) {
            console.log("Receipt");
            console.log(`Your previous balanace: ${randomAmount}`);
            console.log(`Your withdrawl: ${enteredAmount}`);
            console.log(`Your current balance: ${randomAmount - enteredAmount}`);
            console.log("Thank for using Zahoor ATM");
        } else {
            console.log("You have insufficient money in your account.");
            console.log(`Your current balance: ${randomAmount}`);
        }
    }
}

