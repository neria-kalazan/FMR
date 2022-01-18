"use strict";

module.exports = function (sequelize, DataTypes) {
    let ProductClientLink = sequelize.define('ProductClientLink', {
        deposit: {
            type: DataTypes.DECIMAL(3,2),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        street: DataTypes.STRING(64),
        house_number: DataTypes.INTEGER,
        pob: DataTypes.STRING(11),
        zip_number: DataTypes.STRING(11),
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'product_client__link',
    });

    ProductClientLink.associate = (models) => {

        ProductClientLink.belongsTo(models.client, {
            foreignKey: 'customer_id',
            as: 'client'
        });

        ProductClientLink.belongsTo(models.product, {
            foreignKey: 'product_id',
            as: 'product'
        });

    };

    return ProductClientLink;
};
