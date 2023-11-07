#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
// Game Variables
const enemies = ["Skeleton", "Warrior", "Assassin", "Zombie"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
// Player Variables
let health = 100;
let attackDamage = 50;
let healthPotionPlot = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;
let running = true;
console.log(chalk.greenBright.bold("\n\tWelcome to the Dungeon!"));
Game: while (running) {
    console.log("-----------------------------------------");
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    let enemyhealth = Math.floor(Math.random() * 1 * maxEnemyHealth) + 1;
    console.log(chalk.yellowBright(`\t# ${enemy} has appeared! #`));
    while (enemyhealth > 0) {
        console.log(`\n\tYour Health is ${chalk.bold(health + " HP.")}`);
        console.log(`\t${enemy}'s Health is ${chalk.bold(enemyhealth + " HP.")}\n`);
        let play = await inquirer.prompt({
            type: "list",
            message: "What action you wanna do.",
            choices: ["1. Attack", "2. Drink Health Potion", "3. Run"],
            name: "action"
        });
        if (play.action == "1. Attack") {
            let damagedealt = Math.floor(Math.random() * attackDamage);
            let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
            enemyhealth -= damagedealt;
            health -= damageTaken;
            console.log(`\n\t# You strike the ${enemy} for ${chalk.green.bold(damagedealt + " HP")} damage. #`);
            console.log(`\t# You receive ${chalk.red.bold(damageTaken + " HP")} damage in retaliation. #`);
            if (health < 1) {
                console.log(chalk.red(`\t~ You have taken too much damage, you are too weak to go on!`));
                break;
            }
        }
        else if (play.action == "2. Drink Health Potion") {
            if (healthPotionPlot > 0) {
                health += healthPotionHealAmount;
                healthPotionPlot--;
                console.log(`\t# You drink a health potion, healing yourself for ${chalk.green.bold(healthPotionHealAmount + " HP")}. #`);
                console.log(`\t# You now have ${chalk.bold(health + " HP")}. #`);
                console.log(`\t# You have ${chalk.bold(healthPotionPlot)} health potions left. #`);
            }
            else {
                console.log(`You have no health potion left. Defeat enemy for a chance to get one!`);
            }
        }
        else if (play.action == "3. Run") {
            console.log(`\t~ You ran away from ${enemy}`);
            continue Game;
        }
    }
    if (health < 1) {
        console.log(chalk.red.bold(`\t~ You limped out from the dungeon, weak from battle.\n`));
        break;
    }
    // When enemy defeated.
    console.log(chalk.yellow("\n-----------------------------------------------------"));
    console.log(`\t# ${enemy} was defeated! #`);
    console.log(`\t# You have ${chalk.bold(health + " HP")} left. #`);
    if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
        healthPotionPlot++;
        console.log(`\t# The ${enemy} dropped a health potion. #`);
        console.log(chalk.green.bold(`\t# You now have ${healthPotionPlot} health potion(s). #`));
    }
    console.log(chalk.yellow("-----------------------------------------------------\n"));
    //  Continue the code for fighting from last stage.
    let playagain = await inquirer.prompt({
        type: "list",
        name: "choice",
        choices: ["1. Continue Fighting.", "2. Exit Dungeon."],
        message: "What would you like to do now?"
    });
    if (playagain.choice == "1. Continue Fighting.") {
        console.log(`\t\n# You continue your Adventure! #`);
        continue Game;
    }
    else if (playagain.choice == "2. Exit Dungeon.") {
        console.log(`\t# You exit the Dungeon successfully from the Adventure! #\n`);
    }
    // stop the game.
    running = false;
}
// End Note.
console.log(chalk.greenBright(`\t##########################################`));
console.log(chalk.greenBright(`\t~ Thanks for Playing the Adventure Game! ~`));
console.log(chalk.greenBright(`\t##########################################`));
