#! /usr/bin/env node
import inquirer from "inquirer";
import dotenv from 'dotenv';
dotenv.config();
let apiKey = process.env.API_KEY;
let apiLink = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/PKR`;
let getCountriesData = async (data) => {
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rates;
};
let data = await getCountriesData(apiLink);
let countries = Object.keys(data);
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "countryName",
    message: "Please select your first currency:",
    choices: countries,
});
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "countryName",
    message: "Please select your second currency:",
    choices: countries,
});
let apiLink2 = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${firstCountry.countryName}/${secondCountry.countryName}`;
let getConversion = async (data) => {
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rate;
};
let convertedData = await getConversion(apiLink2);
console.log("Result");
console.log(`1 ${firstCountry.countryName} === ${convertedData} ${secondCountry.countryName}`);
