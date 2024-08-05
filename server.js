const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'rekonekt',
    password: 'Bibish099',
    database: 'clientdb'
});

// Connexion à la base de données
db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
        throw err;
    }
    console.log('MySQL Connected...');
});

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pour ajouter un client
app.post('/addClient', (req, res) => {
    console.log('Requête reçue:', req.body); // Log pour vérifier les données de la requête
    let client = req.body;
    let sql = 'INSERT INTO clients SET ?';
    let query = db.query(sql, client, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion dans la base de données:', err);
            res.status(500).send(err);
            return;
        }
        res.send({ id: result.insertId });
    });
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
