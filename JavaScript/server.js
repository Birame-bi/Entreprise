const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importez cors

const app = express();

// Configurer CORS
app.use(cors());

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

// Route pour gérer l'ajout d'un appareil
app.post('/nouvelAppareil', (req, res) => {
  const {
    num_suivi, letype, lamarque, lemodele, letat, idAppareil, nomUt, mtp, consta, Proposition, prix, acompte, accord, clientID
  } = req.body;

  const insertDeviceQuery = `
    INSERT INTO appareils (num_suivi, letype, lamarque, lemodele, letat, idAppareil, nomUt, mtp, consta, Proposition, prix, acompte, accord, client_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const deviceValues = [num_suivi, letype, lamarque, lemodele, letat, idAppareil, nomUt, mtp, consta, Proposition, prix, acompte, accord, clientID];

  db.query(insertDeviceQuery, deviceValues, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données appareil :', err);
      return res.status(500).json({ error: 'Erreur lors de l\'insertion des données appareil' });
    }

    res.json({ message: 'Appareil ajouté avec succès', id: result.insertId });
  });
});

// Route pour gérer l'ajout d'un nouveau client
app.post('/nouveauClient', (req, res) => {
  const {
    civilite, leNom, lePrenom, idInscription, numTel, email, noteClient, noteInterne
  } = req.body;

  // Correction de la requête SQL
  const insertClientQuery = `
    INSERT INTO client (civilite, nom, prenom, identifiant, telephone, email, note_client, note_interne) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const clientValues = [civilite, leNom, lePrenom, idInscription, numTel, email, noteClient, noteInterne];

  db.query(insertClientQuery, clientValues, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données client :', err);
      return res.status(500).json({ error: 'Erreur lors de l\'insertion des données client' });
    }

    res.json({ message: 'Client ajouté avec succès', id: result.insertId });
  });
});



// Démarrer le serveur Express
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
