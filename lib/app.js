$('document').ready(function () {
    const timeSlotSection = $("#time-slot-section");
    const buttonSection = $("#button-section");
    const dayOfWeek = $('#day-of-week')
    const currentDateDisplay = $("#current-date-display");
    const currentTimeDisplay = $('#current-time-display');
    const userInputStartTime = $("#user-input-start-time");
    const buttonSubmitStartTime = $("#submit-start-time");

    let dayCalendar = JSON.parse(localStorage.getItem("dayCalendar"));

    const calendarObj = {
        startTime: 0,
        save: function () {
            console.log("save was run");
            

            const savedCalendarObj = {
                startTime: calendarObj.startTime,
                textareas: {

                }
            }

            for (i = 0; i < 9; i++) {
                savedCalendarObj.textareas[i] = $(`#textarea-${i}`).val();
                console.log(`savedCalendarObj.textareas[i] = ${savedCalendarObj.textareas[i]}`);
            }



            dayCalendar.splice(0, 1, savedCalendarObj);
            localStorage.setItem("dayCalendar", JSON.stringify(dayCalendar));
        },
        load: function () {
            console.log(dayCalendar[0].startTime);
            calendarObj.startTime = parseInt(dayCalendar[0].startTime);
            displayTimeSlots();
        }
    }


    if (Array.isArray(dayCalendar)) {  // does an array already exist in local storage?
        calendarObj.load();
        console.log('else for storage');
    } else {
        dayCalendar = [];
    }

    dayOfWeek.text(moment().format('dddd'));
    currentDateDisplay.text(moment().format('MMMM Do'));
    currentTimeDisplay.text(moment().format('LT'));

    function displayTimeSlots() {
        if (!dayCalendar[0]) {
            calendarObj.startTime = parseInt(userInputStartTime.val());
        }
        
        for (let i = 0; i < 9; i++) {
            hour = calendarObj.startTime;
            hour += i;  // increment hour with i
            amPM = 'am';
            if (hour > 11) { amPM = 'pm'; }
            if (hour > 12) { hour -= 12; }
            // CREATE HTML ELEMENTS that make up the time blocks
            const timeDiv = $("<div>").addClass(`col-3 hour`).attr("id", `time-display-${i}`).text(`${hour + amPM}`);  // this is where the time displays
            const textArea = $("<textarea>").addClass(`col-9`).attr("id", `textarea-${i}`).attr('row', '20');  // the textarea for the things to do during time block
            if (dayCalendar[0]) {
                    textArea.val(dayCalendar[0].textareas[i]);
            }

            timeSlotSection.append(timeDiv);  // add time display to time block section
            timeSlotSection.append(textArea);  // add textarea to time block section
        }

        const saveButton = $("<button>").addClass('saveBtn').attr('id', 'save-button').text('Save');
        buttonSection.append(saveButton);
    }

    // 
    // ON CLICK LISTENERS
    // 
    buttonSubmitStartTime.on('click', function () {
        console.log(`button clicked`);
        displayTimeSlots();
    });

    $(document).on("click", "#save-button", function () {
        console.log("save was pressed");
        calendarObj.save();
    });

});
