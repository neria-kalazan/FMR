const db = require("../models");
const Models = db.models;
const Op = db.Sequelize.Op;

function bulkPhone(phoneList, clientId) {
    const phoneIds = [];
    phoneList.map(p => {
        p.customer_id = clientId;
        if (p.id) phoneIds.push(p.id);
    });

    Models.phone.destroy({
        where: {
            customer_id: clientId,
            id: { [Op.notIn]: phoneIds }
        }
    }).then(() => {
        Models.phone.bulkCreate(phoneList, {
            updateOnDuplicate: ["id", "type", "phone_number"]
        });
    });
}
function bulkAddress(addressList, clientId) {

    const addressIds = [];
    addressList.map(a => {
        a.customer_id = clientId;
        if (a.id) addressIds.push(a.id);
    });

    Models.address.destroy({
        where: {
            customer_id: clientId,
            id: { [Op.notIn]: addressIds }
        }
    }).then(() => {
        Models.address.bulkCreate(addressList, {
            updateOnDuplicate: ["id", "type", "city", "street", "house_number", "pob", "zip_number"]
        });
    });
}

exports.create = (req, res) => {
    if (!req.body.name || !req.body.id_number) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const client = {
        name: req.body.name,
        id_number: req.body.id_number,
    };

    Models.client.create(client)
        .then(data => {
            bulkPhone(req.body.phone, data.id);
            bulkAddress(req.body.address, data.id);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });
};

exports.findAll = (req, res) => {
    const { limit, page, keyword = '' } = req.query;
    let $where = {};
    if (keyword) {
        $where[Op.or] = [
            { name: { [Op.like]: '%' + keyword + '%' } },
            { id_number: { [Op.like]: '%' + keyword + '%' } }
        ];
    }

    Models.client.findAndCountAll({
        where: $where,
        offset: ((+page - 1) * +limit),
        limit: +limit,
        distinct: true,
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clients."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Models.client.findByPk(id,
        {include: [
            {
                model: Models.phone,
                foreignKey: 'customer_id',
                as: 'phone'
            },
            {
                model: Models.address,
                foreignKey: 'customer_id',
                as: 'address'
            },
            {
                model: Models.product_client_link,
                foreignKey: 'customer_id',
                as: 'product_client',
                include: {
                    model: Models.product,
                    foreignKey: 'product_id',
                    as: 'product'
                }
            }
        ]})
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Client with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const client = {
        name: req.body.name,
        id_number: req.body.id_number,
    };

    Models.client.update(client, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                bulkPhone(req.body.phone, id);
                bulkAddress(req.body.address, id);
                res.send({
                    message: "Client was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error update Client with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Models.client.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Client was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot deleted Client with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleted Client with id=" + id
            });
        });
};
