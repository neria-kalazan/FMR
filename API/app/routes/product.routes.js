module.exports = app => {
    const product = require("../controllers/product.controller");
    const router = require("express").Router();

    router.post("/", product.create);
    router.get("/", product.findAll);
    router.post("/link", product.createLink);

    app.use('/api/product', router);
};
