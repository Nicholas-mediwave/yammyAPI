const express = require("express");
const app = express();

const port = 1510;
const db = require("./yammyDB");

app.use(express.json());

// get all recipiesLists
app.get("/recipiesLists", (req, res) => {
  const recipies = db.getRecipie();
  return res.send(recipies);
});
app.get("/", (req, res) => {
  return res.send("recipies");
});

// get one movie
app.get("/recipiesLists/:id", (req, res) => {
  const recipieId = req.params.id;
  const recipie = db.getOneRecipie(recipieId);
  if (!recipie) {
    return res.status(404).send({
      message: `Recipie ${recipieId} not found in the recipie list`,
    });
  }
  return res.send(recipie);
});

// adding a movie
app.post("/recipiesLists", (req, res) => {
  const payload = req.body;
  if (
    !payload.recipieName ||
    !payload.foodType ||
    !payload.ingredients ||
    !payload.stepstoPrepare ||
    !payload.image ||
    !payload.image.url ||
    !payload.image.altInfo
  ) {
    return res.status(400).json({ message: "Bad request" });
  }
  const recipie = db.addRecipie(payload);
  return res.status(201).json(recipie);
});

// deleting a movie
app.delete("/recipiesLists/:id", (req, res) => {
  db.deleteRecipie(req.params.id);
  return res.send({
    message: "Recipie deleted",
  });
});

// updating a movie
app.put("/recipiesLists/:id", (req, res) => {
  const payload = req.body;
  if (
    !payload.recipieName ||
    !payload.foodType ||
    !payload.ingredients ||
    !payload.stepstoPrepare ||
    !payload.image ||
    !payload.image.url ||
    !payload.image.altInfo
  ) {
    return res.status(400).json({ message: "Bad request" });
  }
  const movie = db.updateRecipie(req.params.id, payload);
  return res.send(movie);
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    console.log(`Cannot running on ${port}`);
    process.exit(1);
  }
  console.log(`Server running on ${port}`);
});
