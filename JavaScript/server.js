const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Configurer l'application pour utiliser body-parser pour les requêtes JSON
app.use(bodyParser.json());

// Configurer la connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Remplacez par votre utilisateur MySQL
  password: '',           // Remplacez par votre mot de passe MySQL
  database: 'bddrekonekt',  // Nom de la base de données créée
});

// Connexion à MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connecté à MySQL');
});

// Route pour gérer l'ajout de clients
app.post('/nouveauClient', (req, res) => {
  const {
    civilite, leNom, lePrenom, idInscription, numTel, email, noteClient, noteInterne,
    num_suivi, letype, lamarque, lemodele, letat, idAppareil, nomUt, mtp, consta, Proposition, prix, acompte, accord
  } = req.body;

  const insertClientQuery = `
    INSERT INTO clients (civilite, leNom, lePrenom, idInscription, numTel, email, noteClient, noteInterne) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const clientValues = [civilite, leNom, lePrenom, idInscription, numTel, email, noteClient, noteInterne];

  db.query(insertClientQuery, clientValues, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données client :', err);
      return res.status(500).json({ error: 'Erreur lors de l\'insertion des données client' });
    }

    // Insérer les données de l'appareil
    const insertDeviceQuery = `
      INSERT INTO appareil (num_suivi, letype, lamarque, lemodele, letat, idAppareil, nomUt, mtp, consta, Proposition, prix, acompte, accord) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const deviceValues = [num_suivi, letype, lamarque, lemodele, letat, idAppareil, nomUt, mtp, consta, Proposition, prix, acompte, accord, result.insertId];

    db.query(insertDeviceQuery, deviceValues, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion des données appareil :', err);
        return res.status(500).json({ error: 'Erreur lors de l\'insertion des données appareil' });
      }

      res.json({ message: 'Client et appareil ajoutés avec succès', id: result.insertId });
    });
  });
});

// Démarrer le serveur Express
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});

