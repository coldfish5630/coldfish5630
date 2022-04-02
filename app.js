const express = require("express");
const app = express();

const port = 3000;

const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurantList.results });
});

app.get("/restaurants/:id", (req, res) => {
  const indexRestaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.id
  );
  res.render("show", { restaurant: indexRestaurant });
});

app.get("/search", (req, res) => {
  const filterRestaurant = restaurantList.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
      restaurant.name_en
        .toLowerCase()
        .includes(req.query.keyword.toLowerCase()) ||
      restaurant.category.includes(req.query.keyword)
  );
  res.render("index", {
    restaurant: filterRestaurant,
    keyword: req.query.keyword,
  });
});

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`);
});
