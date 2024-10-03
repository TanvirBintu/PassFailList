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

// Form submission event handler
document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const filterData = {
        class: document.getElementById('class').value,
        year: document.getElementById('year').value,
        group: document.getElementById('group').value,
        section: document.getElementById('section').value,  // New section filter
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

    console.log('Filtered Data:', filterData);
    
    // You can now use this filterData to make an API call or manipulate the data on the page.
});
