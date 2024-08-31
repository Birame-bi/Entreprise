$(document).ready(function () {
    function genererNumeroSuivi() {
        const date = new Date();
        const timestamp = date.getTime();
        const random = Math.floor(Math.random() * 10000);
        return timestamp.toString() + random.toString();
    }

    function genererIdentifiantClient(nom, prenom) {
        const random = Math.floor(Math.random() * 1000);
        return prenom.substring(0, 3).toUpperCase() + nom.substring(0, 3).toUpperCase() + random;
    }

    // Générer le numéro de suivi au chargement du document
    $('#num_suivi').val(genererNumeroSuivi());

    // Générer l'identifiant client basé sur le nom et le prénom
    $('#leNom, #lePrenom').on('input', function () {
        const nom = $('#leNom').val().trim();
        const prenom = $('#lePrenom').val().trim();

        if (nom && prenom) {
            const idClient = genererIdentifiantClient(nom, prenom);
            $('#idInscription').val(idClient);
        } else {
            $('#idInscription').val('');  // Réinitialiser si l'un des champs est vide
        }
    });

    // Gérer la soumission du formulaire appareil
    $('#validerAppareil').click(function (e) {
        e.preventDefault();

        const appareilForm = $('#formulaire').serializeArray();
        const formData = {};

        $.each(appareilForm, function (i, field) {
            formData[field.name] = field.value;
        });

        console.log('Envoi des données appareil:', formData);

        // Envoyer les données de l'appareil au serveur
        $.ajax({
            url: 'http://localhost:3000/nouvelAppareil',  // Adaptez l'URL en fonction de votre API
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                console.log('Appareil ajouté avec succès:', response);
                alert('Les informations de l\'appareil ont été envoyées avec succès.');
            },
            error: function (xhr, status, error) {
                console.error('Erreur lors de l\'envoi des données appareil:', error);
                alert('Une erreur est survenue lors de l\'envoi des données de l\'appareil.');
            }
        });
    });

    // Gérer la soumission du formulaire client
    $('#validerClient').click(function (e) {
        e.preventDefault();

        const clientForm = $('#clientForm').serializeArray();
        const formData = {};

        $.each(clientForm, function (i, field) {
            formData[field.name] = field.value;
        });

        // Vérification avant l'envoi
        if (!formData.leNom || !formData.lePrenom || !formData.numTel || !formData.email) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        console.log('Envoi des données client:', formData);

        // Envoyer les données du client au serveur
        $.ajax({
            url: 'http://localhost:3000/nouveauClient',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                console.log('Client ajouté avec succès:', response);
                alert('Les informations du client ont été envoyées avec succès.');
            },
            error: function (xhr, status, error) {
                console.error('Erreur lors de l\'envoi des données client:', error);
                alert('Une erreur est survenue lors de l\'envoi des données du client.');
            }
        });
    });
});

function checkCustomInput(type) {
    const selectElement = document.getElementById('le' + type);
    const customInput = document.getElementById('custom' + capitalize(type));
    
    if (selectElement.value === 'other') {
        customInput.style.display = 'block';
    } else {
        customInput.style.display = 'none';
        customInput.value = ''; // Réinitialiser la valeur si le champ est caché
    }
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}


