import connectDB from "./config/db.js";
import app from "./server.js";
const port = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1); // Exit the process with failure
  });
