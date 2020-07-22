$('document').ready(function () {
    const timeSlotSection = $("#time-slot-section");
    
    const userInputStartTime = $("#user-input-start-time");
    const buttonSubmitStartTime = $("#submit-start-time");
    
    function displayTimeSlots() {
        console.log(`function run`);
        for (let i = 0; i < 9; i++) {
            console.log(`for loop accessed`);
            let hour = parseInt(userInputStartTime.val()) + i;
            if (hour > 12) {
                hour -= 12;
            }
            timeSignature = `${hour}:00`;
            console.log(hour);
            console.log(timeSignature);
            const timeDiv = $("<div>").addClass(`col-4`).attr("id", `time-display-${i}`).text(`${hour}:00`);
            const textArea = $("<textarea>").addClass(`col-8`).attr("id", `textarea-${i}`);
            timeSlotSection.append(timeDiv);
            timeSlotSection.append(textArea);
        }
    }

    function saveToLocal(layout_or_textareaData) {
        if (this === 'layout') {
            JSON.parse(localStorage.getItem("userScores"));
            localStorage.setItem("userScores", JSON.stringify(savedScheduleLayout));
        }
        const setLocalLayout = localStorage.setItem("userScores", JSON.stringify(savedScheduleLayout));
        const setLocalTextData = localStorage.setItem("userScores", JSON.stringify(savedTextareaData));
    }

    buttonSubmitStartTime.on('click', function () {
        console.log(`button clicked`);
        displayTimeSlots();
    });
});
