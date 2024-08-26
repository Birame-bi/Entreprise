        document.addEventListener('DOMContentLoaded', (event) => {
            const formData = JSON.parse(localStorage.getItem('formData'));
            if (formData) {
                document.getElementById('nom-prenom').textContent = `${formData['leNom']} ${formData['lePrenom']}`;
                document.getElementById('n-tel').textContent = formData['numTel'];
                document.getElementById('numero-commande').textContent = formData['num_suivi'];
                document.getElementById('id-client').textContent = formData['idInscription'];
                document.getElementById('date-depot').value = new Date().toISOString().split('T')[0];
                document.getElementById('imei').textContent = formData['idAppareil'];
                document.getElementById('reparations').textContent = formData['Proposition'];
            }
        });

        function showMessage(message) {
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
            if (event.target.classList.contains('bulleterm')) {
                const messageBox = document.getElementById('messageBox');
                messageBox.style.display = 'none';
            }
        });

        function addTicket(columnId, ticketData) {
            const ticketContainer = document.getElementById(columnId);
            const ticket = document.createElement('div');
            ticket.classList.add('ticket');
            ticket.innerHTML = `
                <span>${ticketData.nomPrenom}</span>
                <span>${ticketData.appareil}</span>
                <span><a href="ticketClient.html">${ticketData.numeroCommande}</a></span>
                <span>${ticketData.reparations}</span>
            `;
            ticketContainer.appendChild(ticket);
        }

        // Exemple d'ajout de tickets
        addTicket('diagnosticTickets', {
            nomPrenom: 'Jean Dupont',
            appareil: 'iPhone X',
            numeroCommande: '1246358123',
            reparations: 'Remplacement écran'
        });

        addTicket('enAttenteTickets', {
            nomPrenom: 'Marie Curie',
            appareil: 'Samsung S10',
            numeroCommande: '9876543210',
            reparations: 'Changement batterie'
        });

        addTicket('propositionTickets', {
            nomPrenom: 'Albert Einstein',
            appareil: 'Google Pixel 4',
            numeroCommande: '1122334455',
            reparations: 'Réparation caméra'
        });