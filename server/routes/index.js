const router = require("express").Router();
const ControllerUser = require("../controllers/users.js");
// const ControllerTask = require("../controllers/tasks.js");
// const { authentication, authorization } = require("../helpers/auth.js");

router.post("/users/register", ControllerUser.register);
// router.post("/users/login", ControllerUser.login);
// router.post("/users/login-google", ControllerUser.googleLogin);

// router.use(authentication);
// router.get("/tasks", ControllerTask.viewTasks);
// router.post("/tasks", ControllerTask.addTask);

// router.delete("/tasks/:taskId", authorization, ControllerTask.destroy);
// router.put("/tasks/:taskId", authorization, ControllerTask.editTask);
// router.patch("/tasks/:taskId", authorization, ControllerTask.continueTask);

module.exports = router;
