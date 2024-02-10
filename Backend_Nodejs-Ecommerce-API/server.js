import app from "./app/app.js";

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is Running on PORT 5000");
});
