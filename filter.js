fetch('data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Debugging: Check the fetched data
        populateSelectOptions(data.student);  // Adjust based on actual structure
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Function to populate the select options dynamically
function populateSelectOptions(data) {
    // Extract unique values for each filter from the JSON data
    const uniqueClasses = [...new Set(data.map(item => item.class))];
    const uniqueYears = [...new Set(data.map(item => item.year))];
    const uniqueGroups = [...new Set(data.map(item => item.group))];
    const uniqueSections = [...new Set(data.map(item => item.section))];
    const uniqueVersions = [...new Set(data.map(item => item.version))];
    const uniqueExams = [...new Set(data.map(item => item.exam))];
    const uniqueReportTypes = [...new Set(data.map(item => item.reportType))];
    const uniquePassDates = [...new Set(data.map(item => item.passDate))];

    // Populate the select elements with the unique values
    populateSelect('class', uniqueClasses);
    populateSelect('year', uniqueYears);
    populateSelect('group', uniqueGroups);
    populateSelect('section', uniqueSections);
    populateSelect('version', uniqueVersions);
    populateSelect('exam', uniqueExams);
    populateSelect('reportType', uniqueReportTypes);
    populateSelect('passDate', uniquePassDates);

    // Auto-fill Passed Date based on selected exam
    document.getElementById('exam').addEventListener('change', function() {
        const passedDateDropdown = document.getElementById('passDate');
        console.log('Exam selected:', this.value);  // Debugging: Check if the exam is being selected

        // Clear previous options
        passedDateDropdown.innerHTML = '<option selected>Select Passed Date</option>';

        const selectedExam = this.value;

        // Define exam-to-passed-date mapping
        const examDateMapping = {
            'Mid-Term 2024': 'January 2024',
            'Year Final 2024': 'June 2024'
        };

        // Debugging: Check if the selected exam matches any in the mapping
        console.log('Selected Exam:', selectedExam);

        // Check if the selected exam has a corresponding date
        if (examDateMapping[selectedExam]) {
            console.log('Exam matched, updating Passed Date');  // Debugging: Check if it enters this condition
            const option = document.createElement('option');
            option.value = examDateMapping[selectedExam];
            option.text = examDateMapping[selectedExam];
            passedDateDropdown.appendChild(option);
        } else {
            console.log('No matching exam found');  // Debugging: To see if no match is found
        }
    });

    document.getElementById('filterForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const filterData = {
            class: document.getElementById('class').value,
            year: document.getElementById('year').value,
            group: document.getElementById('group').value,
            section: document.getElementById('section').value,
            version: document.getElementById('version').value,
            exam: document.getElementById('exam').value,
            reportType: document.getElementById('reportType').value,
            subjectCount: document.getElementById('subjectCount').value,
            passDate: document.getElementById('passDate').value,
            showMobile: document.getElementById('showMobile').checked,
            showSection: document.getElementById('showSection').checked,
            withoutOptional: document.getElementById('withoutOptional').checked,
            totalRow: document.getElementById('totalRow').value
        };
    
        // Build the query string
        const queryString = new URLSearchParams(filterData).toString();
    
        // Redirect based on reportType
    if (filterData.reportType === "Failed") {
        window.location.href = `failed/failed.html?${queryString}`;  // Redirect to the Failed report page
    } else {
        window.location.href = `passed/passed.html?${queryString}`;  // Redirect to Passed report page
    }
    });
    
}

// Helper function to populate a select element
function populateSelect(selectId, options) {
    const selectElement = document.getElementById(selectId);
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}
