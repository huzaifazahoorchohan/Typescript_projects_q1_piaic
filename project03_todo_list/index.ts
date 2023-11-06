#! /usr/bin/env node

import inquirer from "inquirer";

let todoList: string[] = [];
let todoQuit: boolean = true;

const createTodo = async (todoArry: string[]) => {

    do {
        let questions = await inquirer.prompt({
            type: "list",
            message: "Please select your action:",
            name: "select",
            choices: ["ADD TODO", "UPDATE TODO", "READ TODOS", "DELETE TODO", "QUIT TODO"],
        });

        if (questions.select == "ADD TODO") {
            let addTodo = await inquirer.prompt({
                type: "input",
                message: "Please write your todo:",
                name: "todo",
            });
            todoArry.push(addTodo.todo);
            console.log(todoArry);
        }

        if (questions.select == "UPDATE TODO") {
            let selectedTodo = await inquirer.prompt({
                type: "list",
                message: "Which todo you want to update?",
                name: "updateTodoItem",
                choices: todoArry.map(todo => todo),
            });

            let updateTodo = await inquirer.prompt({
                type: "input",
                message: "Please update your todo:",
                name: "updatedTodo",
            });

            let updatedTodoIndex = todoArry.indexOf(selectedTodo.updateTodoItem);

            let newTodos = todoArry.filter(todo => todo !== selectedTodo.updateTodoItem);
            newTodos.splice(updatedTodoIndex, 0, updateTodo.updatedTodo);
            todoArry = newTodos;
            console.log(todoArry);
        }

        if (questions.select == "READ TODOS") {
            console.log(todoArry);
        }

        if (questions.select == "DELETE TODO") {
            let deleteTodo = await inquirer.prompt({
                type: "list",
                message: "Which todo you want to delete?",
                name: "deleteTodoItem",
                choices: todoArry.map(todo => todo),
            });

            let newTodos = todoArry.filter(todo => todo !== deleteTodo.deleteTodoItem);
            todoArry = [...newTodos]
            console.log(todoArry);
        }

        if (questions.select == "QUIT TODO") {
            todoQuit = false;
        }

    } while (todoQuit);

}

createTodo(todoList);