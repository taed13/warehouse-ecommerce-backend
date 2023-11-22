// routes.js
const todoRoutes = require("./todo.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");

function setupRoutes(app) {
  // app.use("/api/todos", todoRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/admin", adminRoutes);

  app.get("/api", (req, res) => {
    res.json({
      message: "HOME API ROUTER",
    });
  });
}

module.exports = setupRoutes;
