document.addEventListener('DOMContentLoaded', (event) => {
    // Supposons que vous passiez le numéro de suivi comme paramètre dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const numSuivi = urlParams.get('num_suivi');  // Récupère le numéro de suivi depuis l'URL

    if (numSuivi) {
        const formData = JSON.parse(localStorage.getItem(numSuivi));
        if (formData) {
            document.getElementById('nom-prenom').textContent = `${formData['leNom']} ${formData['lePrenom']}`;
            document.getElementById('n-tel').textContent = formData['numTel'];
            document.getElementById('num_suivi').textContent = formData['num_suivi'];
            document.getElementById('id-client').textContent = formData['idInscription'];
            document.getElementById('date-depot').value = new Date().toISOString().split('T')[0];
            document.getElementById('imei').textContent = formData['idAppareil'];
            document.getElementById('reparations').textContent = formData['Proposition'];
        }
    }
});


function showMessage(event) {
    const message = event.target.getAttribute('data-message');
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    messageBox.style.top = `${event.clientY + 10}px`;
    messageBox.style.left = `${event.clientX + 10}px`;
}

document.body.addEventListener('mousemove', (event) => {
    const messageBox = document.getElementById('messageBox');
    if (messageBox.style.display === 'block') {
        messageBox.style.top = `${event.clientY + 10}px`;
        messageBox.style.left = `${event.clientX + 10}px`;
    }
});

document.body.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('bulle')) {
        const messageBox = document.getElementById('messageBox');
        messageBox.style.display = 'none';
    }
});