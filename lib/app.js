$('document').ready(function () {
    // HTML ELEMENTS
    const saveBtnSection = $("#save-button-section");
    const dayOfWeek = $('#day-of-week')
    const currentDateDisplay = $("#current-date-display");
    const currentTimeDisplay = $('#current-time-display');
    const userInputStartTime = $("#user-input-start-time");
    const buttonSubmitStartTime = $("#submit-start-time");
    const initialTimeSelectSection = $('#initial-time-selection');
    const userInputChangeTime = $('#user-input-change-time');
    const changeTimeBtn = $('#submit-change-time');
    const timeBlocks = $('#time-blocks');
    // LOCAL STORAGE
    let dayCalendar = JSON.parse(localStorage.getItem("dayCalendar"));
    // TIME VAR's
    const currentHour = moment().startOf('hour').format('H');

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
                console.log(`savedCalendarObj.textareas[i] = ${savedCalendarObj.textareas[i]}`);
            }
            dayCalendar.splice(0, 1, savedCalendarObj);
            localStorage.setItem("dayCalendar", JSON.stringify(dayCalendar));
        },
        load: function () {
            console.log(dayCalendar[0].startTime);
            calendarObj.startTime = parseInt(dayCalendar[0].startTime);
            displayTimeSlots();
        },
        clearCalendar: function () {
            $('#time-slot-section').remove();
            $('#save-button').remove();
        },
        updateTime: function () {
            localStorage.clear();
            calendarObj.clearCalendar();
            console.log(this.startTime);
            displayTimeSlots();
        }
    }


    if (Array.isArray(dayCalendar)) {  // does an array already exist in local storage?
        calendarObj.load();
        initialTimeSelectSection.addClass('hide');
    } else {
        dayCalendar = [];
    }

    dayOfWeek.text(moment().format('dddd'));
    currentDateDisplay.text(moment().format('MMMM Do'));
    currentTimeDisplay.text(moment().format('LT'));
    console.log(`current hour => ${currentHour}`);

    function displayTimeSlots() {
        // CREATE HTML ELEMENT to hold time blocks 
        const newTimeSlotSection = $("<div>").addClass(`row`).attr("id", `time-slot-section`);
        timeBlocks.append(newTimeSlotSection);
        // CREATE and COLOR time blocks
        console.log(calendarObj.startTime);
        for (let i = 0; i < 9; i++) {
            // console.log(`for loop creating elements has run`);
            let hour = 0;
            hour = calendarObj.startTime;
            console.log(`hour equals ${typeof (hour)}`);
            // console.log(`hour = startTime => ${typeof (hour)}`);
            hourMilitary = calendarObj.startTime;
            let amPM = 'am';
            hour += i;  // increment hour with i
            // console.log(`hour += i => ${typeof (hour)}`);
            hourMilitary += i;
            if (hour > 11) { amPM = 'pm'; }
            if (hour > 12) { hour -= 12; }

            
            // CREATE HTML ELEMENTS that make up the time blocks
            const timeDiv = $("<div>").addClass(`col-3 hour`).attr("id", `time-display-${i}`).text(`${hour}`).attr('value', hourMilitary);  // this is where the time displays
            const textArea = $("<textarea>").addClass(`col-9`).attr("id", `textarea-${i}`);  // the textarea for the things to do during time block
            if (dayCalendar[0]) {
                textArea.text(dayCalendar[0].textareas[i]);
            }
            newTimeSlotSection.append(timeDiv);  // add time display to time block section
            newTimeSlotSection.append(textArea);  // add textarea to time block section
        }

        for (i = 0; i < 9; i++) {
            const thisTimeSlot = $(`#time-display-${i}`);
            const thisTextArea = $(`#textarea-${i}`);
            if (parseInt(thisTimeSlot.attr('value')) == currentHour) {
                thisTextArea.addClass('present');
            } else if (parseInt(thisTimeSlot.attr('value')) < currentHour) {
                thisTextArea.addClass('past');
            } else if (parseInt(thisTimeSlot.attr('value')) > currentHour) {
                thisTextArea.addClass('future');
            }
            // console.log(`thisTimeSlot.val(${i}) => ${parseInt(thisTimeSlot.attr('value'))}`);
        }

        const saveButton = $("<button>").addClass('saveBtn').attr('id', 'save-button').text('Save');
        saveBtnSection.append(saveButton);

        initialTimeSelectSection.addClass('hide');
    }



    // 
    // ON CLICK LISTENERS
    // 
    buttonSubmitStartTime.on('click', function () {
        console.log(`button clicked`);
        calendarObj.startTime = parseInt(userInputStartTime.val());
        displayTimeSlots();

    });

    changeTimeBtn.on('click', function () {
        calendarObj.startTime = parseInt(userInputChangeTime.val());
        calendarObj.updateTime;
    });

    $(document).on("click", "#save-button", function () {
        console.log("save was pressed");
        calendarObj.save();
    });

});
