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
        if (response.task === "view all departments") {
            db.query("SELECT department.id, department.name AS `Group Type` FROM department", function (err, results) {
                console.log("All departments")
                console.table(results);
                startApp();
            });
        } else if (response.task === "view all roles") {
            db.query("SELECT role.id, role.title AS `Group Name`, role.salary, department.name AS `Group Type` FROM role JOIN department ON role.department_id = department.id", function (err, results) {
                console.log("All roles");
                console.table(results);
                startApp();
            });
        } else if (response.task === "view all employees") {
            db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS `Group Name`, department.name AS `Group Type`, role.salary, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id", function (err, results) {
                console.log("All employees");
                console.table(results);
                startApp();
            });
        } else if (response.task === "add a department") {
            addDepartment();
        } else if (response.task === "add a role") {
            addRole();
        } else if (response.task === "add an employee") {
            addEmployee();
        } else if (response.task === "update an employee role") {
            updateEmployeeRole();
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
        db.query("INSERT INTO department(name) VALUES (?)", response.dept, (err, result) => {
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
        db.query("INSERT INTO role(title, salary) VALUES (?, ?)", [response.role, response.salary], (err, result) => {
            console.log(`${response.role} was added to the list of roles.`);
        })
        startApp();
    })
}

function addEmployee() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "first",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last",
            message: "What is the employee's last name?"
        }
    ])
    .then((response) => {
        db.query("INSERT INTO employee(first_name, last_name) VALUES (?, ?)", [response.first, response.last], (err, result) => {
            console.log(`${response.first} ${response.last} was added to the list of empoloyees.`);
        })
        startApp();
    })
}

function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "first",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "newRole",
            message: "What is their new role?",
            choices: []
        }
    ])
    .then((response) => {
        db.query("UPDATE employee SET (first_name, last_name) VALUES (?, ?)", [response.first, response.last], (err, result) => {
            console.log(`${response.first} ${response.last} was added to the list of empoloyees.`);
        })
        startApp();
    })
}

startApp()
