const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });



const app = require("./app");



const PORT = 3000;



console.log('--- SZERVER INDÍTÁSA ---');

console.log('Környezeti változók betöltése innen:', path.join(__dirname, '.env'));

console.log('Email User:', process.env.EMAIL_USER ? 'BEÁLLÍTVA' : 'HIÁNYZIK');

console.log('Email Pass:', process.env.EMAIL_PASS ? 'BEÁLLÍTVA' : 'HIÁNYZIK');

console.log('------------------------');



app.listen(PORT, () => {

  console.log(`Server is running on http://localhost:${PORT}`);

});