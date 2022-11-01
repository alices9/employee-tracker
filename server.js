const inquirer = require("inquirer");
const db = require("./db");

inquirer
    .prompt([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
        }
    ])
    .then((response) => {
        console.log(response.task);
        if (response.task === "view all departments") {
            db.query("SELECT * FROM department", function (err, results) {
                console.log(results)
            })
        }
    })