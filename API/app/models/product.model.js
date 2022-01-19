"use strict";

module.exports = function (sequelize, DataTypes) {
    let Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        description: DataTypes.TEXT,
        deposit: {
            type: DataTypes.DECIMAL(3,2),
            allowNull: false
        },
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'product',
    });

    Product.associate = (models) => {

        Product.hasMany(models.product_client_link, {
            foreignKey: 'product_id',
            as: 'product_client_link'
        });

    };

    return Product;
};
