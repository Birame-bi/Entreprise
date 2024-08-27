
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

    $('#num_suivi').val(genererNumeroSuivi());

    $('#leNom, #lePrenom').on('input', function () {
        const nom = $('#leNom').val();
        const prenom = $('#lePrenom').val();

        if (nom && prenom) {
            $('#idInscription').val(genererIdentifiantClient(nom, prenom));
        }
    });

    $('#validerBtn').click(function (e) {
        e.preventDefault();

        const appareilForm = $('#formulaire').serializeArray();
        const clientForm = $('#clientForm').serializeArray();
        const formData = {};

        $.each(appareilForm, function (i, field) {
            formData[field.name] = field.value;
        });

        $.each(clientForm, function (i, field) {
            formData[field.name] = field.value;
        });

        console.log('Sending data:', formData);

        // Envoyer les données au serveur
        $.ajax({
            url: 'http://localhost:3000/addClient',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                console.log('Client ajouté avec l\'ID:', response.id);

                /* Stocker les données dans le localStorage
                localStorage.setItem(formData.num_suivi, JSON.stringify(formData));*/

                // Rediriger vers la page des réparations en cours
                window.location.href = 'reparationsEnCours.html?num_suivi=' + formData.num_suivi;
            },
            error: function (xhr, status, error) {
                console.error('Erreur lors de l\'envoi des données:', error);
                alert('Une erreur est survenue lors de l\'envoi des données.');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const numSuivi = urlParams.get('num_suivi');

if (numSuivi) {
const formData = JSON.parse(localStorage.getItem(numSuivi));
if (formData) {
    document.getElementById('nom-prenom').textContent = `${formData['leNom']} ${formData['lePrenom']}`;
    document.getElementById('n-tel').textContent = formData['numTel'];
    document.getElementById('num_suivi').textContent = formData['num_suivi'];
    document.getElementById('id-client').textContent = formData['idInscription'];
    document.getElementById('imei').textContent = formData['idAppareil'];
    document.getElementById('reparations').textContent = formData['Proposition'];
} else {
    alert('Aucune donnée trouvée pour ce numéro de suivi.');
    window.location.href = 'nouveauClient.html';
}
}
});

function checkCustomInput(type) {
    const selectElement = document.getElementById('le' + type);
    const customInput = document.getElementById('custom' + capitalize(type));
    
    // Si l'utilisateur sélectionne "Autre...", afficher le champ texte
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