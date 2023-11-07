#! /usr/bin/env node
import * as readline from 'readline';
class Student {
    constructor(name, coursesEnrolled = [], balance = 0) {
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.balance = balance;
        this.studentID = `S${Student.nextStudentID++}`;
    }
    enrollCourse(courseName) {
        this.coursesEnrolled.push(courseName);
    }
    viewBalance() {
        return this.balance;
    }
    payTuition(amount) {
        this.balance -= amount;
    }
    showStatus() {
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses Enrolled: ${this.coursesEnrolled.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
}
Student.nextStudentID = 1000;
const students = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function createStudent() {
    rl.question('Enter student name: ', (name) => {
        const student = new Student(name);
        students.push(student);
        console.log(`Student created with ID: ${student.studentID}`);
        mainMenu();
    });
}
function enrollStudent() {
    rl.question('Enter student ID: ', (studentID) => {
        const student = students.find((s) => s.studentID === studentID);
        if (student) {
            rl.question('Enter course name to enroll: ', (courseName) => {
                student.enrollCourse(courseName);
                console.log(`Enrolled ${student.name} in ${courseName}`);
                mainMenu();
            });
        }
        else {
            console.log('Student not found.');
            mainMenu();
        }
    });
}
function viewBalance() {
    rl.question('Enter student ID: ', (studentID) => {
        const student = students.find((s) => s.studentID === studentID);
        if (student) {
            console.log(`Balance for ${student.name}: $${student.viewBalance()}`);
            mainMenu();
        }
        else {
            console.log('Student not found.');
            mainMenu();
        }
    });
}
function payTuition() {
    rl.question('Enter student ID: ', (studentID) => {
        const student = students.find((s) => s.studentID === studentID);
        if (student) {
            rl.question('Enter the amount to pay: ', (amountStr) => {
                const amount = parseFloat(amountStr);
                if (!isNaN(amount)) {
                    student.payTuition(amount);
                    console.log(`Tuition paid. New balance for ${student.name}: $${student.viewBalance()}`);
                }
                else {
                    console.log('Invalid amount.');
                }
                mainMenu();
            });
        }
        else {
            console.log('Student not found.');
            mainMenu();
        }
    });
}
function showStatus() {
    rl.question('Enter student ID: ', (studentID) => {
        const student = students.find((s) => s.studentID === studentID);
        if (student) {
            student.showStatus();
            mainMenu();
        }
        else {
            console.log('Student not found.');
            mainMenu();
        }
    });
}
function mainMenu() {
    console.log('\nStudent Management System');
    console.log('1. Create Student');
    console.log('2. Enroll Student in a Course');
    console.log('3. View Balance');
    console.log('4. Pay Tuition');
    console.log('5. Show Student Status');
    console.log('6. Exit');
    rl.question('Select an option (1-6): ', (choice) => {
        switch (choice) {
            case '1':
                createStudent();
                break;
            case '2':
                enrollStudent();
                break;
            case '3':
                viewBalance();
                break;
            case '4':
                payTuition();
                break;
            case '5':
                showStatus();
                break;
            case '6':
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please enter a valid option (1-6).');
                mainMenu();
                break;
        }
    });
}
mainMenu();
