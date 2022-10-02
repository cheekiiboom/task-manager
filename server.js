// Michael Singer mis825@lehigh.edu

const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();

const Task = require("./Task");
let tasks = [
  new Task(1, "Do Math homework", "NextAction", "2022-09-30"),
  new Task(2, "Eat at Hawk's Nest", "WaitingFor: Bob", "2022-09-30"),
  new Task(4, "Do the laundry", "Someday/Maybe", "2022-09-30"),
  new Task(5, "Do something", "TalkTo: Susan", "2022-10-01"),
  new Task(6, "Buy a flying car", "Future", "2022-10-02"),
];

// Use the files in the public folder
app.use(express.static(__dirname + "/public"));

// parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/tasks", function (req, res) {
  res.json(getTasks());
});
app.post("/tasks", function (req, res) {
  // return error if no description
  if (!req.body.description) {
    return res.sendStatus(400);
  }

  // generate a new id that is not already in use
  let newId = 1;
  while (tasks.find((t) => t.id == newId)) {
    newId++;
  }
  const description = req.body.description;
  const type = req.body.type;
  const date = req.body.date;
  const task = new Task(newId, description, type, date);

  tasks.push(task);
  res.status(200).json(getTasks());
});
app.delete("/tasks/:id", function (req, res) {
  const id = req.params.id;
  tasks = tasks.filter((t) => t.id != id);
  res.status(200).json(getTasks());
});

// Start the server
app.listen(3000);

function getTasks() {
  return tasks;
}

console.log("http://localhost:3000");
