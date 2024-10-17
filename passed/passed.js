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

        // Filter data based on query parameters
        const filteredData = studentData.filter(student => {
            return (queryParams.class === "All" || student.class === queryParams.class) &&
                   (queryParams.group === "All" || student.group === queryParams.group) &&
                   (queryParams.section === "All" || student.section === queryParams.section) &&
                   (queryParams.exam === "All" || student.exam === queryParams.exam) &&
                   (queryParams.reportType === "All" || (queryParams.reportType === "Passed" && parseFloat(student.gpa) >= 1.0));
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


    //Hide/show the mobile and section headers based on checkbox values
    const mobileHeader = document.getElementById('mobile-header');
    const sectionHeader = document.getElementById('section-header');

    // Show/Hide Mobile Header
    if (queryParams.showMobile === "true") {
        mobileHeader.style.display = '';  // Show the header if the checkbox is checked
    } else {
        mobileHeader.style.display = 'none';  // Hide the header if the checkbox is unchecked
    }

    // Show/Hide Section Header
    if (queryParams.showSection === "true") {
        sectionHeader.style.display = '';  // Show the header if the checkbox is checked
    } else {
        sectionHeader.style.display = 'none';  // Hide the header if the checkbox is unchecked
    }

       // Sort students by Total Marks (descending) and then by GPA (descending)
       data.sort((a, b) => {
        if (b.totalMarks == a.totalMarks) {
            return b.gpa - a.gpa;  // If total marks are equal, sort by GPA
        } else {
            return b.totalMarks - a.totalMarks;  // Sort by total marks
        }
    });

    // Populate the table
    data.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
             ${queryParams.showSection === "true" ? `<td>${student.section}</td>` : ''}
            <td>${student.studentID}</td>
            <td>${student.classRoll}</td>
            <td>${student.studentName}</td>
            ${queryParams.showMobile === "true" ? `<td>${student.mobile}</td>` : ''}
            <td>${student.totalMarks}</td>
            <td>${student.gpa}</td>
            <td>${index + 1}</td> <!-- Section position based on rank -->
        `;
        tableBody.appendChild(row);
    });
}
