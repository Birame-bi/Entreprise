// App.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint pour ajouter un client
app.post('/addClient', (req, res) => {
    const formData = req.body; // Les données du formulaire

    // Traitement des données et stockage dans la base de données

    // Vous pouvez renvoyer une réponse avec l'ID du client ajouté
    res.json({ id: 'ID_DU_CLIENT' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
