const { createUsersTable } = require("./models/userQueries");
const { createTasksTable } = require("./models/taskQueries");

(async () => {
  await createUsersTable();
  await createTasksTable();
})();
