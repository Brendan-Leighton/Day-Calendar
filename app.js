$('document').ready(function () {
    const timeSlotSection = $("#time-slot-section");
    
    const userInputStartTime = $("#user-input-start-time");
    const buttonSubmitStartTime = $("#submit-start-time");
    const setLocalLayout = localStorage.setItem("userScores", JSON.stringify(savedScheduleLayout));
    const setLocalTextData = localStorage.setItem("userScores", JSON.stringify(savedTextareaData));
    function displayTimeSlots() {
        console.log(`function run`);
        for (i = 0; i < 9; i++) {
            console.log(`for loop accessed`);
            const timeDiv = $("<div>").addClass(`col-4`).attr("id", `time-display-${i}`);
            const textArea = $("<textarea>").addClass(`col-8`).attr("id", `textarea-${i}`);
            timeSlotSection.append(timeDiv);
            timeSlotSection.append(textArea);
        }
    }

    buttonSubmitStartTime.on('click', function () {
        console.log(`button clicked`);
        displayTimeSlots();
    });
});
