const db = require('../../config/db');

exports.getKuponok = (req,res)=>{ db.query('SELECT * FROM Kupon',(err,results)=>{ if(err) return res.status(500).json({ error: err }); res.json(results); }); };
exports.getKuponById = (req,res)=>{ const {id}=req.params; db.query('SELECT * FROM Kupon WHERE id=?',[id],(err,results)=>{ if(err) return res.status(500).json({ error: err }); if(results.length===0) return res.status(404).json({ message:"Kupon nem található" }); res.json(results[0]); }); };
exports.createKupon = (req,res)=>{ const { kod, ertek } = req.body; db.query('INSERT INTO Kupon (kod, ertek) VALUES (?,?)',[kod, ertek],(err,results)=>{ if(err) return res.status(500).json({ error: err }); res.status(201).json({ message:"Kupon létrehozva", id:results.insertId }); }); };
exports.updateKupon = (req,res)=>{ const {id}=req.params; const { kod, ertek }=req.body; db.query('UPDATE Kupon SET kod=?, ertek=? WHERE id=?',[kod, ertek, id],(err)=>{ if(err) return res.status(500).json({ error: err }); res.json({ message:"Kupon frissítve" }); }); };
exports.deleteKupon = (req,res)=>{ const {id}=req.params; db.query('DELETE FROM Kupon WHERE id=?',[id],(err)=>{ if(err) return res.status(500).json({ error: err }); res.json({ message:"Kupon törölve" }); }); };
