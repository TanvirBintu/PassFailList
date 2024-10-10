// Function to get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

// Update the report headings dynamically based on the filters
document.addEventListener('DOMContentLoaded', function() {
    const queryParams = getQueryParams();

    // Update Class, Group, Section in h2 spans
    const classSpan = document.querySelector('h2 .highlight:nth-child(1)');
    const groupSpan = document.querySelector('h2 .highlight:nth-child(2)');
    const sectionSpan = document.querySelector('h2 .highlight:nth-child(3)');
    
    classSpan.textContent = queryParams.class || 'All';
    groupSpan.textContent = queryParams.group || 'All';
    sectionSpan.textContent = queryParams.section || 'All';

    // Update the examination name and date in <p> tag
    const examNameSpan = document.querySelector('p .highlight');
    const dateSpan = document.querySelector('span.date .highlight');

    examNameSpan.textContent = queryParams.exam || 'N/A';
    dateSpan.textContent = queryParams.passDate || 'N/A';
});

// Fetch the JSON data and filter it based on the URL parameters
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Access the student array from the JSON object
        const studentData = data.student;

        console.log('Fetched student data:', studentData);  // Log for debugging

        // Ensure the data is an array
        if (!Array.isArray(studentData)) {
            console.error('Error: Fetched data is not an array');
            return;
        }

        const queryParams = getQueryParams();

        // Filter data based on reportType 'Absent' and other query parameters
        const filteredData = studentData.filter(student => {
            return student.reportType === "Absent" &&
                   (queryParams.class === "All" || student.class === queryParams.class) &&
                   (queryParams.group === "All" || student.group === queryParams.group) &&
                   (queryParams.section === "All" || student.section === queryParams.section) &&
                   (queryParams.exam === "All" || student.exam === queryParams.exam);
        });

        // Check if any data was returned by the filter
        if (filteredData.length === 0) {
            console.warn('No matching data found for the given filters.');
        }

        populateTable(filteredData, queryParams);
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Function to populate the table with filtered data
function populateTable(data, queryParams) {
    const tableBody = document.getElementById('student-data');
    tableBody.innerHTML = ''; // Clear any existing rows

    // Populate the table with absent students' data
    data.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.section}</td>
            <td>${student.studentID}</td>
            <td>${student.classRoll}</td>
            <td>${student.studentName}</td>
            <td>${queryParams.showMobile === "true" ? student.mobile : 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
}
