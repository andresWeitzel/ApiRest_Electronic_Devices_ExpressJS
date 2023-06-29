const { appMiddleware } = require("./config/middleware/index");

const run = async() => {
    
  const app = await appMiddleware();

  app.get("/", (req, res) => {
    res.json({ mesagge: "Hello" });
  });

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

run();