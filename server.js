const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;

const app = express();

const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/client/public")));
app.set("views", path.join(__dirname, "/client/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const { red, green, blue } = req.body;
  console.log(req.body);
  function safeParseInt(value, defaultValue = 255) {
    const parsed = parseInt(value, 10);

    // Handle NaN
    if (isNaN(parsed)) {
      return Math.max(0, Math.min(defaultValue, 255)); // Clamp defaultValue within 0 and 255
    }

    // Clamp parsed value between 0 and 255
    return Math.max(0, Math.min(parsed, 255));
  }

  const redValue = safeParseInt(red);
  const greenValue = safeParseInt(green);
  const blueValue = safeParseInt(blue);
  // Log or process the RGB values
  console.log(`Red: ${redValue}, Green: ${greenValue}, Blue: ${blueValue}`);

  res.json({
    red: redValue,
    green: greenValue,
    blue: blueValue
  });
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
