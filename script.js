// Logout function to redirect to Page 1 (index.html)
function logout() {
    window.location.href = "index.html";
}

// Validate login form and redirect to next page if email is valid
function validateLogin(event) {
    event.preventDefault();

    const email = document.getElementById('uname').value;
    const password = document.getElementById('pass').value;
    
    // Check if email is valid
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Proceed to the next page if valid email
    window.location.href = 'main.html';
}

// Function to get child vaccination and medicine recommendations
function getRecommendation() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const city = document.getElementById('city').value;

    if (name === '' || age === '' || city === '') {
        alert('Please fill all fields!');
        return;
    } 

    let recommendation = '';
    let medicines = '';

    // Generate recommendation based on the child's age
    if (age < 1) {
        recommendation = 'Vaccines: Hepatitis B, Rotavirus, DTaP, Hib, PCV13, IPV';
        medicines = 'Medicines: Vitamin D supplements, Iron supplements';
    } else if (age >= 1 && age <= 4) {
        recommendation = 'Vaccines: MMR, Varicella, Hepatitis A, Influenza, DTaP';
        medicines = 'Medicines: Children\'s multivitamin, Fever reducers';
    } else if (age >= 5 && age <= 12) {
        recommendation = 'Vaccines: MMR, Varicella, DTaP, Influenza, HPV (for older children)';
        medicines = 'Medicines: Fever reducers, Allergy medication';
    } else {
        recommendation = 'Vaccines: Tdap, Influenza, HPV';
        medicines = 'Medicines: General OTC medicines for fever, cold, etc.';
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h3>Recommendation for ${name}</h3><p>${recommendation}</p><p>${medicines}</p>`;

    saveToLocalStorage(name, age, city, recommendation, medicines);
}

// Save recommendation to local storage
function saveToLocalStorage(name, age, city, recommendation, medicines) {
    let history = localStorage.getItem('vaccinationHistory');
    history = history ? JSON.parse(history) : [];

    const newEntry = { name, age, city, recommendation, medicines };
    history.push(newEntry);

    localStorage.setItem('vaccinationHistory', JSON.stringify(history));
}

// Show vaccination history from local storage
function showHistory() {
    let history = localStorage.getItem('vaccinationHistory');
    history = history ? JSON.parse(history) : [];

    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '<h3>Vaccination & Medicine History</h3>';

    if (history.length === 0) {
        historyDiv.innerHTML += '<p>No history found.</p>';
    } else {
        history.forEach((entry, index) => {
            historyDiv.innerHTML += `<p>${index + 1}. Name: ${entry.name}, Age: ${entry.age}, City: ${entry.city}, Recommendation: ${entry.recommendation}, Medicines: ${entry.medicines}</p>`;
        });
    }
}
