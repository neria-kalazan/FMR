"use strict";

module.exports = function (sequelize, DataTypes) {
    let Phone = sequelize.define('Phone', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM('home', 'mobile', 'number'),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(11),
            allowNull: false
        },
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'phone',
    });

    Phone.associate = (models) => {

        Phone.belongsTo(models.client, {
            foreignKey: 'customer_id',
            as: 'client'
        });

    };

    return Phone;
};
