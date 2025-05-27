const express = require("express");
const cors = require("cors");
const contactRoute = require("./routes/contact");

const app = express();

// ✅ Allow only your GitHub Pages frontend to make requests
app.use(
  cors({
    origin: "https://niten-12.github.io",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", contactRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
