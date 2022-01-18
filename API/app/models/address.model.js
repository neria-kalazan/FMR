"use strict";

module.exports = function (sequelize, DataTypes) {
    let Address = sequelize.define('Address', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM('home', 'work', 'parents'),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(64),
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
        tableName: 'address',
    });

    Address.associate = (models) => {
        Address.belongsTo(models.client, {
            foreignKey: 'customer_id',
            as: 'client'
        });
    };

    return Address;
};
