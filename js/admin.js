window.onload = function() {
    loadSignupDetails();
    loadLoginDetails();
}

function loadSignupDetails() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const signupDetails = document.getElementById('signupDetails');
    signupDetails.innerHTML = '';

    users.forEach(user => {
        const row = `<tr><td>${user.name}</td><td>${user.email}</td></tr>`;
        signupDetails.innerHTML += row;
    });
}

function loadLoginDetails() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('loginDetails').textContent = `Currently logged in user: ${loggedInUser}`;
    }
}

// Sidebar navigation
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});
window.onload = function() {
    const eventDetails = JSON.parse(localStorage.getItem('eventDetails'));

    if (eventDetails) {
        document.getElementById('day1_title').value = eventDetails.day1.title || "Pop Night";
        document.getElementById('day1_description').value = eventDetails.day1.description || "By Adele";
        document.getElementById('day2_title').value = eventDetails.day2.title || "DJ Night";
        document.getElementById('day2_description').value = eventDetails.day2.description || "By Rihana";
        document.getElementById('day3_title').value = eventDetails.day3.title || "Country Music";
        document.getElementById('day3_description').value = eventDetails.day3.description || "By Rihana";
    } else {
        // If no values are stored, show default values
        document.getElementById('day1_title').value = "Pop Night";
        document.getElementById('day1_description').value = "By Adele";
        document.getElementById('day2_title').value = "DJ Night";
        document.getElementById('day2_description').value = "By Rihana";
        document.getElementById('day3_title').value = "Country Music";
        document.getElementById('day3_description').value = "By Rihana";
    }

    loadSubmissions(); // Load submissions data
}

function updateEventDetails() {
    // Get values from the form
    const day1Title = document.getElementById('day1_title').value;
    const day1Description = document.getElementById('day1_description').value;

    const day2Title = document.getElementById('day2_title').value;
    const day2Description = document.getElementById('day2_description').value;

    const day3Title = document.getElementById('day3_title').value;
    const day3Description = document.getElementById('day3_description').value;

    // Save data in LocalStorage
    const eventDetails = {
        day1: { title: day1Title, description: day1Description },
        day2: { title: day2Title, description: day2Description },
        day3: { title: day3Title, description: day3Description }
    };

    localStorage.setItem('eventDetails', JSON.stringify(eventDetails));
    alert('Event details updated successfully!');
}




// Sidebar navigation logic
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show the target section
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

 // Function to display welcome message
 function displayWelcomeMessage() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('welcomeMessage').innerText = `Logged in as: ${loggedInUser}`;
    } else {
        window.location.href = 'index.html'; // Redirect to login page if not logged in
    }
}

// Function to handle logout
function logout() {
    localStorage.removeItem('loggedInUser'); // Clear the logged-in user
    alert('You have been logged out. Redirecting to login page...');
    window.location.href = 'index.html'; // Redirect to the login page
}

// Call function to display welcome message
displayWelcomeMessage();




function loadSignupDetails() {
const users = JSON.parse(localStorage.getItem('users')) || [];
const signupDetails = document.getElementById('signupDetails');
signupDetails.innerHTML = ''; // Clear existing data

users.forEach(user => {
    const row = `<tr><td>${user.name}</td><td>${user.email}</td></tr>`;
    signupDetails.innerHTML += row;
});
}

// Call this function when the admin dashboard loads
window.onload = function() {
loadSignupDetails();
};


 // Function to load contacts from localStorage and display them
 function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactsDetails = document.getElementById('contacts-details');
    contactsDetails.innerHTML = '';

    if (contacts.length > 0) {
        contacts.forEach(contact => {
            const row = `
                <tr>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.message}</td>
                    <td>${contact.date}</td>
                </tr>
            `;
            contactsDetails.innerHTML += row;
        });
    } else {
        contactsDetails.innerHTML = '<tr><td colspan="4">No contact submissions yet</td></tr>';
    }
}

// Load contacts when the page loads
window.onload = loadContacts;



// Function to load and display bookings in the table
function loadBookings() {
    // Retrieve the bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Reference to the table body
    const bookingDetails = document.getElementById('booking-details');
    bookingDetails.innerHTML = ''; // Clear existing rows

    // Check if there are any bookings
    if (bookings.length > 0) {
        // Iterate over the bookings array
        bookings.forEach(booking => {
            // Create a new table row for each booking
            const row = `
                <tr>
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.seats}</td>
                    <td>Rs${booking.amount.toFixed(2)}</td>
                    <td>${booking.date}</td>
                </tr>
            `;
            // Append the row to the table body
            bookingDetails.innerHTML += row;
        });
    } else {
        // If no bookings, show a message
        bookingDetails.innerHTML = '<tr><td colspan="5">No bookings available</td></tr>';
    }
}

// Load bookings when the page is loaded
window.onload = loadBookings;
