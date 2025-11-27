// Carregar agendamentos do localStorage
function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    return appointments.sort((a, b) =>
        new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
    );
}

// Salvar
function saveAppointments(appointments) {
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Exibir na tela
function displayAppointments() {
    console.log('Chamando displayAppointments'); 
    const list = document.getElementById('appointments-list');
    if (!list) {
        console.error('Elemento appointments-list não encontrado!'); 
        return;
    }
    list.innerHTML = ''; // Limpa a lista
    const appointments = loadAppointments();
    console.log('Exibindo', appointments.length, 'agendamentos'); 
    if (appointments.length === 0) {
        const noApptLi = document.createElement('li');
        noApptLi.className = 'no-appointments';
        noApptLi.textContent = 'Nenhum agendamento ainda.';
        list.appendChild(noApptLi);
        console.log('Adicionado li de "nenhum agendamento"'); 
    } else {
        appointments.forEach((appt, index) => {
            try {
                const li = document.createElement('li');
                if (appt.backgroundImage) {
                    li.style.backgroundImage = `url(${appt.backgroundImage})`;
                }
                const div = document.createElement('div');

                // Formatação da data: dia/mês/ano às xx:xx horas
                const dateObj = new Date(`${appt.date}T${appt.time}`);
                let formattedDate = 'Data inválida';
                if (!isNaN(dateObj)) {
                    formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()} às ${appt.time}`;
                }
                div.innerHTML = `<strong>${formattedDate}</strong><br>Categoria: ${appt.category}`;
                const btn = document.createElement('button');
                btn.className = 'delete-btn';
                btn.textContent = 'Remover';
                btn.onclick = () => deleteAppointment(index);
                li.appendChild(div);
                li.appendChild(btn);
                list.appendChild(li);
                console.log('Adicionado li para agendamento:', appt); 
            } catch (e) {
                console.error('Erro ao criar li para agendamento:', appt, e); 
            }
        });
    }
}

// Adicionar agendamento
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('appointment-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const category = document.getElementById('category').value;
        if (!category) {
            alert("Escolha um serviço válido!");
            return;
        }
        const appointments = loadAppointments();
        appointments.push({ date, time, category });
        saveAppointments(appointments);
        form.reset();
        displayAppointments();
    });
    displayAppointments();
});

// Remover
function deleteAppointment(index) {
    const appointments = loadAppointments();
    appointments.splice(index, 1);
    saveAppointments(appointments);
    displayAppointments();
}

// Rolar suavemente dentro do contêiner rolável (para o final da lista)
setTimeout(() => {
    const container = document.querySelector('.conteiner-rolavel'); // Corrigido para corresponder ao CSS
    if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
}, 100);


