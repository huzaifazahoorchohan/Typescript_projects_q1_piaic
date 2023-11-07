#! /usr/bin/env node
import inquirer from 'inquirer';
class Person {
    constructor() {
        this.personality = 'Mystery';
    }
    talkToOtherPerson() {
        this.personality = 'Friendly';
        console.log(`You are: ${this.personality}`);
    }
    talkToYourself() {
        this.personality = 'Introspective';
        console.log(`You are: ${this.personality}`);
    }
}
class Student extends Person {
    constructor() {
        super(...arguments);
        this._name = '';
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
}
async function OOP() {
    const student = new Student();
    const { choice } = await inquirer.prompt({
        type: 'number',
        name: 'choice',
        message: 'Enter 1 to talk to another person, 2 to talk to yourself:'
    });
    if (choice === 1) {
        student.talkToOtherPerson();
    }
    else if (choice === 2) {
        student.talkToYourself();
    }
    else {
        console.log(`You are still a ${student.personality}.`);
    }
    const { studentName } = await inquirer.prompt({
        type: 'input',
        name: 'studentName',
        message: 'Enter student name:',
    });
    student.name = studentName;
    console.log(`Your name is : ${student.name}, and your Personality Type is : ${student.personality}`);
}
OOP();
