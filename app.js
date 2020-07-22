$('document').ready(function () {
    const timeSlotSection = $("#time-slot-section");
    const buttonSection = $("#button-section");

    const userInputStartTime = $("#user-input-start-time");
    const buttonSubmitStartTime = $("#submit-start-time");
    
    function displayTimeSlots() {
        console.log(`function run`);
        for (let i = 0; i < 9; i++) {
            let hour = parseInt(userInputStartTime.val()) + i;  // grab users input and convert to number
            if (hour > 12) {  // if the number is > 12 we -12 to start back at 1
                hour -= 12;
            }
            // CREATE HTML ELEMENTS that make up the time blocks
            const timeDiv = $("<div>").addClass(`col-2 hour`).attr("id", `time-display-${i}`).text(`${hour}:00`);  // this is where the time displays
            const textArea = $("<textarea>").addClass(`col-10`).attr("id", `textarea-${i}`);  // the textarea for the things to do during time block
            timeSlotSection.append(timeDiv);  // add time display to time block section
            timeSlotSection.append(textArea);  // add textarea to time block section
        }

        const saveButton = $("<button>").addClass('saveBtn').attr('id', 'save-button').text('Save');
        buttonSection.append(saveButton);
    }

    // !!! function for easy save !!!
    function saveToLocal(layout_or_textareaData) {
        if (this === 'layout') {  // create global var to hold 'layout'
            JSON.parse(localStorage.getItem("userScores"));
            localStorage.setItem("userScores", JSON.stringify(savedScheduleLayout));
        }
        const setLocalLayout = localStorage.setItem("userScores", JSON.stringify(savedScheduleLayout));
        const setLocalTextData = localStorage.setItem("userScores", JSON.stringify(savedTextareaData));
    }

    // 
    // ON CLICK LISTENERS
    // 
    buttonSubmitStartTime.on('click', function () {
        console.log(`button clicked`);
        displayTimeSlots();
    });
});
