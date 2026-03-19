module.exports = (sequelize) => {
  const Felhasznalo = require("./Felhasznalo")(sequelize);
  const Alkalom = require("./Alkalom")(sequelize);
  const Stilus = require("./Stilus")(sequelize);
  const Celcsoport = require("./Celcsoport")(sequelize);
  const Ajandek = require("./Ajandek")(sequelize);
  const Felhasznalo_AjandekElozmeny = require("./Elozmeny")(sequelize);
  const Felhasznalo_KedvencAjandek = require("./Kedvenc")(sequelize);
  const Meghivo = require("./Meghivo")(sequelize);
  const ChatMessage = require("./ChatMessage")(sequelize);
  const Notification = require("./Notification")(sequelize);
  const Kupon = require("./Kupon")(sequelize);
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

  // Meghivo -> Felhasznalo (belongs to - küldő)
  Meghivo.belongsTo(Felhasznalo, {
    foreignKey: "kuldo_id",
    as: "kuldo",
  });
    Felhasznalo.hasMany(Meghivo, {
      foreignKey: "kuldo_id",
      as: "kuldottMeghivok",
    });
    Meghivo.belongsTo(Felhasznalo, {
      foreignKey: "meghivott_id",
      as: "meghivott",
    });
    Felhasznalo.hasOne(Meghivo, {
      foreignKey: "meghivott_id",
      as: "beerkazoMeghivo",
    });

    // ChatMessage asszociációk
  ChatMessage.belongsTo(Felhasznalo, { foreignKey: 'from_user_id', as: 'sender' });
    ChatMessage.belongsTo(Felhasznalo, { foreignKey: 'to_user_id', as: 'receiver' });
    Felhasznalo.hasMany(ChatMessage, { foreignKey: 'from_user_id', as: 'sentMessages' });
    Felhasznalo.hasMany(ChatMessage, { foreignKey: 'to_user_id', as: 'receivedMessages' });

    // Értesítés asszociációk
    Felhasznalo.hasMany(Notification, { foreignKey: 'user_id', as: 'ertesitesek' });
    Notification.belongsTo(Felhasznalo, { foreignKey: 'user_id', as: 'felhasznalo' });

 // -------------------------------------------------
    // FELHASZNÁLÓ <-> AJÁNDÉK ELŐZMÉNY (N:N + extra mező)
    // -------------------------------------------------
   // Felhasznalo <-> Ajandek előzmények (N:N + extra mező)

    Felhasznalo.belongsToMany(Ajandek, {

        through: Felhasznalo_AjandekElozmeny,

        foreignKey: "user_id",

        otherKey: "ajandek_id",

        as: "elozmenyek"  // nagyon fontos az alias

    });



    Ajandek.belongsToMany(Felhasznalo, {

        through: Felhasznalo_AjandekElozmeny,

        foreignKey: "ajandek_id",

        otherKey: "user_id",

        as: "felhasznalokElozmenyek"

    });



    // -----------------------------------------------

    // FELHASZNÁLÓ <-> KEDVENC AJÁNDÉK (N:N + extra)

    // -----------------------------------------------

    Felhasznalo.belongsToMany(Ajandek, {



        through: Felhasznalo_KedvencAjandek,



        foreignKey: "user_id",



        otherKey: "ajandek_id",



        as: "kedvencAjandekok"



    });







    Ajandek.belongsToMany(Felhasznalo, {



        through: Felhasznalo_KedvencAjandek,



        foreignKey: "ajandek_id",



        otherKey: "user_id",



        as: "felhasznalokKedvencek"



    });


  return {
    Felhasznalo,
    Alkalom,
    Stilus,
    Celcsoport,
    Ajandek,
    Felhasznalo_AjandekElozmeny,
    Felhasznalo_KedvencAjandek,
    Meghivo,
    ChatMessage,
    Notification,
    Kupon
  };
};