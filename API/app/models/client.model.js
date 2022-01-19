"use strict";

module.exports = function (sequelize, DataTypes) {
    let Client = sequelize.define('Client', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_number: {
            type: DataTypes.STRING(11),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'client',
    });

    Client.associate = (models) => {

        Client.hasMany(models.phone, {
            foreignKey: 'customer_id',
            as: 'phone'
        });

        Client.hasMany(models.address, {
            foreignKey: 'customer_id',
            as: 'address'
        });

        Client.hasMany(models.product_client_link, {
            foreignKey: 'customer_id',
            as: 'product_client_link'
        });

    };

    return Client;
};
