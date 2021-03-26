"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("barang", [
      {
        nama: "Pepsodent",
        harga: 14500,
        id_pemasok: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Lifeboy",
        harga: 24600,
        id_pemasok: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Clear",
        harga: 44500,
        id_pemasok: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    //make nama unique
    queryInterface.addConstraint('barang', {
      fields: ['nama'],
      type: 'unique',
      name: 'custom_unique_constraint_name'
    });

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("barang", null, {});
  },
};
