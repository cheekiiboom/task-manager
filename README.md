# Homework Assignment 5 - Task Manager

Author:

Email:

### CSE 264 – Web Systems Programming

- Due Tuesday, October 4th @ 11:59pm
- No extensions under any circumstances.

### Objective

- To gain experience creating a simple app that uses jQuery, Node.js, Express and Ajax.

### Overview

You will create a simple task manager that allows the user to add and delete several different types of tasks.

The task manager page you create should look something close to the following:
(Refer to the image posted with the link to this assignment on Coursesite)  
The current list of tasks is shown in the table on the left. The form with 2 buttons on the right is used to add and delete tasks.

### Instructions & steps

To add a task the user does the following:

- Fills in a description
- Clicks on the date field and selects a date from the datepicker (Google: html date picker)
- Selects one of 5 task types from the dropdown: Next Action, Waiting, Talk, Future, and Someday/Maybe. If the user selects Waiting or Talk to an additional text box should appear under the dropdown for the user to enter the person or thing waited for or talked to.
- Finally, the user clicks Add and the new task is saved to a collection of tasks in the Node application on the server and the form is reset.

To delete one or more tasks, the user:

- Toggles the check boxes of the tasks to be deleted
- Clicks the Delete button.
- The user is prompted with a pop-up window with a "Really delete?" message. If the user selects yes, then the tasks are immediately deleted from the list and the task list is refreshed with the updated list of tasks.

### Requirements

- Setup your project by running npm init and installing any modules with the --save so that the node_modules folder can be deleted and later restored by running npm install.
- To represent the tasks on the server you need to create a Javascript class named Task with a constructor to represent a task that contains four fields: id, description, task type and date.
- The due date field must use an html datepicker to select the date.
- Your application should be a Node.js application using Express to handle requests from the user.
- The Add and Delete buttons must call js functions that do Ajax calls to the server, sending the necessary information from the page and receiving back an updated list of tasks which are used to replace the current tasks in the table. Do not reload the page. Each Ajax call should have it's own router in the server script.
- All your js should be put into a separate file and loaded into your page with a &lt;script&gt; tag.
- All your css should be put into a separate file and loaded into your page with a &lt;link&gt; tag.
- **After the page has loaded** it should use an Ajax call to retrieve the initial set of tasks from the server. Create another router for this.
- If you close the web page and then re-open it the same set of tasks should be loaded. Ie., the task list should persist as long as the node script stays running. Feel free to hard code an initial set of tasks into the server script.
- Use jQuery to manpulate the DOM and do the Ajax calls.
- Place your NAME and EMAIL in a comment on every page in the application.
