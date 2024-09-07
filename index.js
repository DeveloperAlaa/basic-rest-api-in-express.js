const express = require("express");
const app = express();
const port = 6060;
const morgan = require("morgan");

const usersRoute = require("./routes/users.route");

// a middleware that serves static files from inside a root directory
app.use(express.static("public"));

// a middleware that parses incoming requests with json payloads
app.use(express.json());
// a middleware that parses incoming requests with urlencoded payloads (from the browser)
app.use(express.urlencoded());
// for logging
app.use(morgan("combined"));

app.use("/users", usersRoute);

app.use((err, req, res, next) => {
  console.log("Error ocurred:- ", err)
  const statusCode = err.statusCode || 500
  res.status(statusCode)
  res.send("Something went wrong!!!")

})

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
