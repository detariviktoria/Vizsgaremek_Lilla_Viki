const FelhasznaloModel = require("./Felhasznalo");
const StilusokModel = require("./Stilusok");
const AlkalomModel = require("./Alkalom");
const CelcsoportModel = require("./Celcsoport");
const AjandekModel = require("./Ajandek");
const KuponokModel = require("./Kuponok");
const Felhasznalo_AjandekElozmenyModel = require("./Elozmeny");
const Felhasznalo_KedvencAjandekModel = require("./Kedvenc");

module.exports = (sequelize) => {

    // MODELS
    const Felhasznalo = FelhasznaloModel(sequelize);
    const Stilusok = StilusokModel(sequelize);
    const Alkalom = AlkalomModel(sequelize);
    const Celcsoport = CelcsoportModel(sequelize);
    const Ajandek = AjandekModel(sequelize);
    const Kuponok = KuponokModel(sequelize);
    const Felhasznalo_AjandekElozmeny = Felhasznalo_AjandekElozmenyModel(sequelize);
    const Felhasznalo_KedvencAjandek = Felhasznalo_KedvencAjandekModel(sequelize);

    // -----------------------
    // AJÁNDÉK -> STÍLUS (1:N)
    // -----------------------
    Stilusok.hasMany(Ajandek, {
        foreignKey: "stilus_id"
    });

    Ajandek.belongsTo(Stilusok, {
        foreignKey: "stilus_id"
    });

    // -----------------------
    // AJÁNDÉK <-> ALKALOM (N:N)
    // -----------------------
    Ajandek.belongsToMany(Alkalom, {
        through: "Ajandek_Alkalom",
        foreignKey: "ajandek_id",
        otherKey: "alkalom_id"
    });

    Alkalom.belongsToMany(Ajandek, {
        through: "Ajandek_Alkalom",
        foreignKey: "alkalom_id",
        otherKey: "ajandek_id"
    });

    // -----------------------
    // AJÁNDÉK <-> CÉLCSOPORT (N:N)
    // -----------------------
    Ajandek.belongsToMany(Celcsoport, {
        through: "Ajandek_Celcsoport",
        foreignKey: "ajandek_id",
        otherKey: "celcsoport_id"
    });

    Celcsoport.belongsToMany(Ajandek, {
        through: "Ajandek_Celcsoport",
        foreignKey: "celcsoport_id",
        otherKey: "ajandek_id"
    });

    // -----------------------
    // FELHASZNÁLÓ → KUPONOK (1:N)
    // -----------------------
    Felhasznalo.hasMany(Kuponok, {
        foreignKey: "felhaszanlo_id"
    });

    Kuponok.belongsTo(Felhasznalo, {
        foreignKey: "felhaszanlo_id"
    });

    // -------------------------------------------------
    // FELHASZNÁLÓ <-> AJÁNDÉK ELŐZMÉNY (N:N + extra mező)
    // -------------------------------------------------
    Felhasznalo.belongsToMany(Ajandek, {
        through: Felhasznalo_AjandekElozmeny,
        foreignKey: "felhaszanlo_id",
        otherKey: "ajandek_id"
    });

    Ajandek.belongsToMany(Felhasznalo, {
        through: Felhasznalo_AjandekElozmeny,
        foreignKey: "ajandek_id",
        otherKey: "felhaszanlo_id"
    });

    // -----------------------------------------------
    // FELHASZNÁLÓ <-> KEDVENC AJÁNDÉK (N:N + extra)
    // -----------------------------------------------
    Felhasznalo.belongsToMany(Ajandek, {
        through: Felhasznalo_KedvencAjandek,
        foreignKey: "felhaszanlo_id",
        otherKey: "ajandek_id"
    });

    Ajandek.belongsToMany(Felhasznalo, {
        through: Felhasznalo_KedvencAjandek,
        foreignKey: "ajandek_id",
        otherKey: "felhaszanlo_id"
    });

    return {
        Felhasznalo,
        Stilusok,
        Alkalom,
        Celcsoport,
        Ajandek,
        Kuponok,
        Felhasznalo_AjandekElozmeny,
        Felhasznalo_KedvencAjandek
    };
};
