const recipiesLists = [
  {
    id: "1642067929941",
    recipieName: "Biriyani",
    foodType: "nv",
    ingredients: "hi",
    stepstoPrepare: "hello",
    image: {
      url: "/images/1.jpeg",
      altInfo: "Biriani Images",
    },
  },
  {
    id: "1642070244749",
    recipieName: "Mutton Biriyani",
    foodType: "nv",
    ingredients: "hi",
    stepstoPrepare: "hello",
    image: {
      url: "/images/1.jpeg",
      altInfo: "Biriani Images",
    },
  },
];

const addRecipie = (payload) => {
  const recipie = {
    id: new Date().getTime(),
    ...payload,
  };
  recipiesLists.push(recipie);
  return recipie;
};

const getRecipie = () => recipiesLists;

const getOneRecipie = (recipieId) => {
  const recipie = recipiesLists.find((r) => r.id == recipieId);
  return recipie;
};

const deleteRecipie = (recipieId) => {
  const index = recipiesLists.findIndex((r) => r.id == recipieId);
  if (index != -1) {
    recipiesLists.splice(index, 1);
  }
  return;
};

const updateRecipie = (recipieId, payload) => {
  const index = recipiesLists.findIndex((r) => r.id == recipieId);
  if (index == -1) {
    return res.status(404).json({ message: "Movie not found" });
  }
  recipiesLists[index]["recipieName"] = payload.recipieName;
  recipiesLists[index]["foodType"] = payload.foodType;
  recipiesLists[index]["ingredients"] = payload.ingredients;
  recipiesLists[index]["stepstoPrepare"] = payload.stepstoPrepare;
  recipiesLists[index]["image"] = payload.image;
  return recipiesLists[index];
};

module.exports = {
  recipiesLists,
  addRecipie,
  getRecipie,
  getOneRecipie,
  deleteRecipie,
  updateRecipie,
};
