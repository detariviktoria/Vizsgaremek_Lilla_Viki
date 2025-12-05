const db = require('../../config/db');

exports.getKategoriak = (req, res) => { db.query('SELECT * FROM Kategoria', (err, results) => { if(err) return res.status(500).json({ error: err }); res.json(results); }); };
exports.getKategoriaById = (req, res) => { const {id} = req.params; db.query('SELECT * FROM Kategoria WHERE id=?', [id], (err, results)=>{ if(err) return res.status(500).json({ error: err }); if(results.length===0) return res.status(404).json({ message: "Kategória nem található" }); res.json(results[0]); }); };
exports.createKategoria = (req, res) => { const { nev } = req.body; db.query('INSERT INTO Kategoria (nev) VALUES (?)', [nev], (err, results)=>{ if(err) return res.status(500).json({ error: err }); res.status(201).json({ message:"Kategória létrehozva", id: results.insertId }); }); };
exports.updateKategoria = (req,res)=>{ const {id} = req.params; const { nev } = req.body; db.query('UPDATE Kategoria SET nev=? WHERE id=?', [nev,id], (err)=>{ if(err) return res.status(500).json({ error: err }); res.json({ message:"Kategória frissítve" }); }); };
exports.deleteKategoria = (req,res)=>{ const {id}=req.params; db.query('DELETE FROM Kategoria WHERE id=?',[id],(err)=>{ if(err) return res.status(500).json({ error: err }); res.json({ message:"Kategória törölve" }); }); };
