const db = require("../models");
const Models = db.models;

exports.create = (req, res) => {
    if (!req.body.name || !req.body.deposit) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const product = {
        name: req.body.name,
        description: req.body.description,
        deposit: req.body.deposit,
    };

    Models.product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

exports.findAll = (req, res) => {
    Models.product.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};

exports.createLink = (req, res) => {
    if (!req.body.customer_id || !req.body.product_id || !req.body.deposit) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const productClient = {
        customer_id: req.body.customer_id,
        product_id: req.body.product_id,
        deposit: req.body.deposit,
    };

    Models.product_client_link.create(productClient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Models.product.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find product with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving product with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Models.product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update product with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error update product with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Models.product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot deleted product with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleted product with id=" + id
            });
        });
};
