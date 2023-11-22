// routes.js
const todoRoutes = require("./todo.routes");
const authRoutes = require("./auth.routes");

function setupRoutes(app) {
  // app.use("/api/todos", todoRoutes);
  app.use("/api/auth", authRoutes);

  app.get("/api", (req, res) => {
    res.json({
      message: "HOME API ROUTER",
    });
  });
}

module.exports = setupRoutes;
