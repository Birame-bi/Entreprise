document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupérer les valeurs saisies
    const inputSuivi = document.getElementById('numeroSuivi').value;
    const inputNom = document.getElementById('nomIdentifiant').value;
    const inputEmail = document.getElementById('email').value;

    // Récupérer les valeurs stockées dans localStorage
    const storedSuivi = localStorage.getItem('numSuivi');
    const storedNom = localStorage.getItem('nom');
    const storedEmail = localStorage.getItem('email');

    // Vérifier les informations
    if ((inputSuivi === storedSuivi || inputNom === storedNom) && inputEmail === storedEmail) {
        alert('Connexion réussie. Vous pouvez maintenant suivre votre réparation.');
        // Rediriger vers la page de suivi des réparations ou afficher les détails
    } else {
        alert('Informations incorrectes. Veuillez réessayer.');
    }
});
