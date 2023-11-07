#! /usr/bin/env node

import inquirer from "inquirer";

while (true) {
    let { answer } = await inquirer.prompt({
        type: "input",
        name: "answer",
        message: "Type your words to count:"
    });

    let result = answer.split(" ");
    let charactors = result.join("");
    console.log(charactors);
    let word = "word"
    if (result.length != 1) {
        word = "words"
    }
    let lett = "letter"
    if (charactors.length != 1) {
        lett = "letters"
    }
    console.log(`Your wrote ${result.length} ${word} and ${charactors.length} ${lett}`);

    const { again } = await inquirer.prompt({
        type: "confirm",
        message: "Count again? ",
        default: true,
        name: "again",
    })
    if (!again) {
        console.log("Thanks for using my app!")
        break;
    }
}