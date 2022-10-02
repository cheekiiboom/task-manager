// Michael Singer mis825@lehigh.edu

module.exports = class Task {
    constructor(id, description, taskType, date) {
        this.id = id;
        this.description = description;
        this.taskType = taskType;
        this.date = date;
    }
}