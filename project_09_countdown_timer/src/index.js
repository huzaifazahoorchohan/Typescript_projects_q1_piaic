#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
function countdownTimer(hours, minutes, seconds) {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + hours);
    targetTime.setMinutes(targetTime.getMinutes() + minutes);
    targetTime.setSeconds(targetTime.getSeconds() + seconds);
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const remainingTime = targetTime.getTime() - currentTime.getTime();
        if (remainingTime <= 0) {
            clearInterval(intervalId);
            console.log(chalk.red.bold("\nCountdown finished!"));
        }
        else {
            const totalSeconds = Math.floor(remainingTime / 1000);
            const remainingHours = Math.floor(totalSeconds / 3600);
            const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
            const remainingSeconds = totalSeconds % 60;
            console.log(`${remainingHours} hours ${remainingMinutes} minutes ${remainingSeconds} seconds`);
        }
    }, 1000);
}
async function startCountdown() {
    const questions = [
        {
            type: "number",
            name: "hours",
            message: "Enter the number of hours:",
            validate: (val) => {
                if (isNaN(val)) {
                    return `Please enter valid hours`;
                }
                else if (val > 24) {
                    return `You must enter Hours less than 24. `;
                }
                else {
                    return true;
                }
            },
        },
        {
            type: "number",
            name: "minutes",
            message: "Enter the number of minutes:",
            validate: (val) => {
                if (isNaN(val)) {
                    return `Please enter valid minutes`;
                }
                else if (val > 60) {
                    return `You must enter minutes less than 60. `;
                }
                else {
                    return true;
                }
            },
        },
        {
            type: "number",
            name: "seconds",
            message: "Enter the number of seconds:",
            validate: (val) => {
                if (isNaN(val)) {
                    return `Please enter valid seconds`;
                }
                else if (val > 60) {
                    return `You must enter seconds less than 60. `;
                }
                else {
                    return true;
                }
            },
        },
    ];
    const answers = await inquirer.prompt(questions);
    countdownTimer(answers.hours, answers.minutes, answers.seconds);
}
console.log(chalk.green.bold(`\n${chalk.yellow("<<==")} Welcome to COUNTDOWN TIMER ${chalk.yellow("==>>")}\n`));
startCountdown();
