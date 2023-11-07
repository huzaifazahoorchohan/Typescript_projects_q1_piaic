#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName: string;
let points: number = 0;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Welcome to Zahoor Quiz'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    You have 5 Questions.
    If your given answer will be wrong, you will loss ${chalk.bgRed('- 10')}
    If you're right you will get         ${chalk.bgGreen('+ 10')}
    You will get your result in the end...
  `);
}

async function handleAnswer(isCorrect: any) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: chalk.green(`Great! ${playerName}\n`) });
        points += 10;
    } else {
        spinner.error({ text: chalk.red(`Sorry! wrong answer ${playerName}!\n`) });
        points -= 10;
    }
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

function winner() {
    console.clear();
    figlet(`${playerName} ! Your Result :  ${points}`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');
        process.exit(0);
    });
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'What is the capital city of Pakistan?\n',
        choices: [
            'Karachi',
            'Lahore',
            'Islamabad',
            'Faisalabad',
        ],
    });

    return handleAnswer(answers.question_1 === 'Islamabad');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Pakistan shares its longest border with which neighboring country?\n',
        choices: ['India', 'Afghanistan', 'China', 'Iran'],
    });
    return handleAnswer(answers.question_2 === 'Afghanistan');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `Which river is the longest in Pakistan and serves as a key waterway?\n`,
        choices: ['River Ravi', 'River Jhelum', 'River Sutlej', 'River Indus'],
    });

    return handleAnswer(answers.question_3 === 'River Indus');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'What is the official language of Pakistan?\n',
        choices: [
            `English`,
            `Urdu`,
            `Punjabi`,
            `Sindhi`,
        ],
    });
    return handleAnswer(answers.question_4 === 'Urdu');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'Pakistan became an independent country on which date?\n',
        choices: ['August 14, 1947', 'September 6, 1965', 'December 25, 1971', 'July 1, 1950'],
    });

    return handleAnswer(answers.question_5 === 'August 14, 1947');
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();