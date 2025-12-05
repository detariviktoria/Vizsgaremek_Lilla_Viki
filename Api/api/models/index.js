module.exports = (sequelize) => {
  const Felhasznalo = require("./Felhasznalo")(sequelize);
  const Alkalom = require("./Alkalom")(sequelize);
  const Stilus = require("./Stilus")(sequelize);
  const Celcsoport = require("./Celcsoport")(sequelize);
  const Ajandek = require("./Ajandek")(sequelize);
  const Kupon = require("./Kupon")(sequelize);
  const Gyujtemeny = require("./Gyujtemeny")(sequelize);

  // Asszociációk

  // Ajandek <-> Stilus (many to many)

  Ajandek.belongsToMany(Stilus, {

    through: "Ajandek_Stilus",

    foreignKey: "ajandek_id",

    otherKey: "stilus_id",

    as: "stilusok",

  });

  Stilus.belongsToMany(Ajandek, {

    through: "Ajandek_Stilus",

    foreignKey: "stilus_id",

    otherKey: "ajandek_id",

    as: "ajandekok",

  });

  // Ajandek <-> Alkalom (many to many)
  Ajandek.belongsToMany(Alkalom, {
    through: "Ajandek_Alkalom",
    foreignKey: "ajandek_id",
    otherKey: "alkalom_id",
    as: "alkalmak",
  });
  Alkalom.belongsToMany(Ajandek, {
    through: "Ajandek_Alkalom",
    foreignKey: "alkalom_id",
    otherKey: "ajandek_id",
    as: "ajandekok",
  });

  // Ajandek <-> Celcsoport (many to many)
  Ajandek.belongsToMany(Celcsoport, {
    through: "Ajandek_Celcsoport",
    foreignKey: "ajandek_id",
    otherKey: "celcsoport_id",
    as: "celcsoportok",
  });
  Celcsoport.belongsToMany(Ajandek, {
    through: "Ajandek_Celcsoport",
    foreignKey: "celcsoport_id",
    otherKey: "ajandek_id",
    as: "ajandekok",
  });

  // Kupon -> Felhasznalo (belongs to)
  Kupon.belongsTo(Felhasznalo, {
    foreignKey: "user_id",
    as: "felhasznalo",
  });
  Felhasznalo.hasMany(Kupon, {
    foreignKey: "user_id",
    as: "kuponok",
  });

  // Gyujtemeny -> Felhasznalo (belongs to)
  Gyujtemeny.belongsTo(Felhasznalo, {
    foreignKey: "felhasznalo_id",
    as: "felhasznalo",
  });
  Felhasznalo.hasMany(Gyujtemeny, {
    foreignKey: "felhasznalo_id",
    as: "gyujtemenyek",
  });

  return {
    Felhasznalo,
    Alkalom,
    Stilus,
    Celcsoport,
    Ajandek,
    Kupon,
    Gyujtemeny,
  };
};