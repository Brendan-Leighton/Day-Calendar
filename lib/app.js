$('document').ready(function () {
    // HTML ELEMENTS
    const saveBtnDiv = $("#save-button-div");  // DIV that holds the 'save' button
    const dayOfWeek = $('#day-of-week')  // Displayed in the header
    const currentDateDisplay = $("#current-date-display");  // Displayed in the header
    const currentTimeDisplay = $('#current-time-display');  // Displayed in the header
    const userInputStartTime = $("#user-input-start-time");  // INPUT field user inputs start time
    const buttonSubmitStartTime = $("#submit-start-time");  // BUTTON to submit above start time
    const initialTimeSelectSection = $('#initial-time-selection');  // SECTION holding the above INPUT & BUTTON
    const userInputChangeTime = $('#user-input-change-time');  // INPUT field user inputs different start time
    const changeTimeBtn = $('#submit-change-time');  // BUTTON to submit above start time
    const timeBlocks = $('#time-blocks');  // DIV where the time blocks/slots will be added
    const editCalendarOptions = $('#edit-calendar-options');  // SECTION holding the options for changing calendar
    // LOCAL STORAGE
    let dayCalendar = JSON.parse(localStorage.getItem("dayCalendar"));
    // TIME VAR's
    const currentHour = moment().startOf('hour').format('H');  // current hour, base-24, for comparing this time and time on time-slots, for BG-color changing purposes

    const calendarObj = {
        startTime: 0,
        save: function () {
            const savedCalendarObj = {
                startTime: calendarObj.startTime,
                textareas: {  //  these are generated in the following for-loop
                }
            }
            for (i = 0; i < 9; i++) {
                savedCalendarObj.textareas[i] = $(`#textarea-${i}`).val();
            }
            dayCalendar.splice(0, 1, savedCalendarObj);  // overwrite currently saved calendar with new
            localStorage.setItem("dayCalendar", JSON.stringify(dayCalendar));
        },
        load: function () {
            calendarObj.startTime = parseInt(dayCalendar[0].startTime);
            displayTimeSlots();
        },
        clearCalendar: function () {
            $('#time-slot-section').remove();
            $('#save-button').remove();
        },
        updateTime: function () {
            calendarObj.save();
            calendarObj.clearCalendar();
            calendarObj.load();
        }
    }

    if (Array.isArray(dayCalendar)) {  // does an array already exist in local storage?
        calendarObj.load();
        initialTimeSelectSection.addClass('hide');
    } else {
        dayCalendar = [];
        editCalendarOptions.addClass('hide');
    }

    dayOfWeek.text(moment().format('dddd'));
    currentDateDisplay.text(moment().format('MMMM Do'));
    currentTimeDisplay.text(moment().format('LT'));

    function displayTimeSlots() {
        // CREATE HTML ELEMENT to hold time blocks 
        const newTimeSlotSection = $("<div>").addClass(`row`).attr("id", `time-slot-section`);
        timeBlocks.append(newTimeSlotSection);
        // CREATE and COLOR time blocks
        for (let i = 0; i < 9; i++) {
            let hour = 0;
            hour = calendarObj.startTime;
            hourMilitary = calendarObj.startTime;
            let amPM = 'am';
            hour += i;  // increment hour with i
            hourMilitary += i;
            if (hourMilitary > 11) { amPM = 'pm'; }
            if (hour > 12) { hour -= 12; }
            // CREATE HTML ELEMENTS that make up the time blocks
            const timeDiv = $("<div>").addClass(`col-3 hour`).attr("id", `time-display-${i}`).text(`${hour + amPM}`).attr('value', hourMilitary);  // this is where the time displays
            const textArea = $("<textarea>").addClass(`col-9`).attr("id", `textarea-${i}`);  // the textarea for the things to do during time block
            if (dayCalendar[0]) {  // IF a saved calendar exists,
                textArea.text(dayCalendar[0].textareas[i]);  // we populate the textareas with that saved text
            }

            newTimeSlotSection.append(timeDiv);  // add time display to time block section
            newTimeSlotSection.append(textArea);  // add textarea to time block section

            const thisTimeSlot = $(`#time-display-${i}`);
            const thisTextArea = $(`#textarea-${i}`);
            if (parseInt(thisTimeSlot.attr('value')) == currentHour) {
                thisTextArea.addClass('present');
            } else if (parseInt(thisTimeSlot.attr('value')) < currentHour) {
                thisTextArea.addClass('past');
            } else if (parseInt(thisTimeSlot.attr('value')) > currentHour) {
                thisTextArea.addClass('future');
            }
        }
        const saveButton = $("<button>").addClass('saveBtn btn').attr('id', 'save-button').text('Save');
        saveBtnDiv.append(saveButton);
    }



    // 
    // ON CLICK LISTENERS
    // 
    buttonSubmitStartTime.on('click', function () {
        calendarObj.startTime = parseInt(userInputStartTime.val());
        if (isNaN(calendarObj.startTime)) {
            alert(`You didn't enter a number. Please try again, I believe in you!`);
        } else {
            displayTimeSlots();
            initialTimeSelectSection.addClass('hide');
            editCalendarOptions.removeClass('hide');
        }
        
    });

    changeTimeBtn.on('click', function () {
        calendarObj.startTime = parseInt(userInputChangeTime.val());
        if (isNaN(calendarObj.startTime)) {
            alert(`You didn't enter a number. Please try again, I believe in you!`);
        } else {
            calendarObj.updateTime();
        }
    });

    $(document).on("click", "#save-button", function () {
        calendarObj.save();
    });

});
