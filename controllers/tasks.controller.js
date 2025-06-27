const {
  insertTaskWithDetails,
  deleteTaskById,
  updateTaskStatus,
  getAllTasksByUser,
} = require("../models/taskQueries");

const { suggestions } = require("../services/ai.service");

// POST /tasks -> create task
async function addTask(req, resp) {
  try {
    const { id: userId } = req.user;
    const { title, description, priority, duedate, tag, groupId, assignedTo } = req.body;

    if (!userId) return resp.status(401).json({ message: "Unauthorized" });
    if (!title) return resp.status(400).json({ message: "Missing task title" });

    const task = await insertTaskWithDetails({
      title,
      description,
      duedate,
      priority,
      tag,
      createdBy: userId,
      assignedTo: assignedTo || null,
      groupId: groupId || null,
    });

    if (!task || typeof task.id !== "number") {
      return resp.status(500).json({ message: "Failed to insert task" });
    }

    console.log(`Task added: "${title}" with taskId ${task.id}`);
    return resp.status(200).json({ message: "Task added", task });
  } catch (err) {
    console.error("Error in inserting task:", err.message);
    return resp.status(500).json({ message: "Error in adding task" });
  }
}

// DELETE /tasks/:id
async function deleteTask(req, resp) {
  try {
    const taskId = req.params.id;
    if (!taskId) return resp.status(400).json({ message: "Missing task ID" });

    const affectedRows = await deleteTaskById(taskId);
    if (affectedRows === 0) {
      return resp.status(404).json({ message: "Task not found or not deleted" });
    }

    return resp.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    return resp.status(500).json({ message: "Error deleting task" });
  }
}

// PATCH /tasks/:id → mark complete/incomplete
async function updateTask(req, resp) {
  try {
    const taskId = req.params.id;
    const { isCompleted } = req.body;

    if (typeof isCompleted !== "boolean") {
      return resp.status(400).json({ message: "isCompleted must be boolean" });
    }

    const affectedRows = await updateTaskStatus(taskId, isCompleted);
    if (affectedRows === 0) {
      return resp.status(404).json({ message: "No task updated" });
    }

    return resp.status(200).json({ message: "Task status updated" });
  } catch (err) {
    console.error("Error updating task status:", err.message);
    return resp.status(500).json({ message: "Error updating task" });
  }
}

// GET /suggestions
async function getSuggestions(req, resp) {
  try {
    const userId = req.user.id;
    const allTasks = await getAllTasksByUser(userId);

    const aiSuggestions = await suggestions(allTasks);
    return resp.status(200).json({ suggestions: aiSuggestions });
  } catch (err) {
    console.error("Error generating suggestions:", err.message);
    return resp.status(500).json({ message: "Error generating suggestions" });
  }
}

module.exports = {
  addTask,
  deleteTask,
  updateTask,
  getSuggestions,
};
