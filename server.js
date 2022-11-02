const inquirer = require("inquirer");
const db = require("./db/connection.js");
const table = require("console.table");


function startApp() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "nothing else"]
        }
    ])
    .then((response) => {
        console.log(response.task);
        if (response.task === "view all departments") {
            db.query("SELECT * FROM department", function (err, results) {
                console.log(results);
                console.table("All departments", [...results]);
                startApp();
            });
        } else if (response.task === "view all roles") {
            db.query("SELECT * FROM role", function (err, results) {
                console.log(results);
                console.table("All roles", [...results]);
                startApp();
            });
        } else if (response.task === "view all employees") {
            db.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id", function (err, results) {
                console.log(results);
                console.table("All employees", [...results]);
                startApp();
            });
        } else if (response.task === "add a department") {
            addDepartment();
        } else if (response.task === "add a role") {
            addRole();
        } else if (response.task === "add an employee") {

        } else if (response.task === "update an employee role") {

        } else {
            console.log("Goodbye");
            process.exit();
        }
    })
}

function addDepartment() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "dept",
            message: "What is the name of the department?"
        }
    ])
    .then((response) => {
        db.query("INSERT INTO department(name) VALUES (?)", response.dept, () => {
            console.log(`${response.dept} was added to the list of departments.`);
        })
        startApp();
    })
}

function addRole() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the role's salary?"
        }
    ])
    .then((response) => {
        db.query("INSERT INTO role(title, salary) VALUES (?, ?)", [response.role, response.salary], () => {
            console.log(`${response.dept} was added to the list of departments.`);
        })
        startApp();
    })
}


startApp()

// inquirer
//     .prompt([
//         {
//             type: "list",
//             name: "task",
//             message: "What would you like to do?",
//             choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
//         }
//     ])
//     .then((response) => {
//         console.log(response.task);
//         if (response.task === "view all departments") {
//             db.query("SELECT * FROM department", function (err, results) {
//                 console.log(results);
//                 console.table("All departments", [...results]);
//             });
//         } else if (response.task === "view all roles") {
//             db.query("SELECT * FROM role", function (err, results) {
//                 console.log(results);
//                 console.table("All roles", [...results]);
//             });
//         } else if (response.task === "view all employees") {
//             db.query("SELECT id, first_name, last_name FROM employee", function (err, results) {
//                 console.log(results);
//                 console.table("All employees", [...results]);
//             });
//         } else {
//             console.log("Goodbye");
//             process.exit();
//         }
//     })