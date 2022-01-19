const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
// db.product.bulkCreate([
//     { id: 1, name: 'provident fund', description: '', deposit: 1 },
//     { id: 2, name: 'education fund', description: '', deposit: 2 },
//     { id: 3, name: 'pension', description: '', deposit: 3 },
// ]);

require("./app/routes/client.routes")(app);
require("./app/routes/product.routes")(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
