var datePickerObj = [{month: "Jan", numberOfDays: 31, intValue: 0},
    {month: "Feb", numberOfDays: 28, intValue: 1},
    {month: "Mar", numberOfDays: 31, intValue: 2},
    {month: "Apr", numberOfDays: 30, intValue: 3},
    {month: "May", numberOfDays: 31, intValue: 4},
    {month: "Jun", numberOfDays: 30, intValue: 5},
    {month: "Jul", numberOfDays: 31, intValue: 6},
    {month: "Aug", numberOfDays: 31, intValue: 7},
    {month: "Sep", numberOfDays: 30, intValue: 8},
    {month: "Oct", numberOfDays: 31, intValue: 9},
    {month: "Nov", numberOfDays: 30, intValue: 10},
    {month: "Dec", numberOfDays: 31, intValue: 11}
];

var dayObj = [{day: "Sunday", intValue: 0},
    {day: "Monday", intValue: 1},
    {day: "Tuesday", intValue: 2},
    {day: "Wednesday", intValue: 3},
    {day: "Thursday", intValue: 4},
    {day: "Friday", intValue: 5},
    {day: "Saterday", intValue: 6}
];
var isDatePickerVisible = false;
var isYearPickerVisible = false;
var date = new Date();
var currentDate = date.getDate();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();

let tableYear = document.getElementById("tableYear");
let tableMonth = document.getElementById("tableMonth");

let yearTable = document.getElementById("yearTable");
let tbodyNode = document.getElementById("yearTableBody");

let dateTable = document.getElementById("dateTableBody");
let datePickerInput = document.getElementById("datePickerInput");
var minYear = 2019;
var maxYear;


tableMonth.innerHTML = getMonthInFull(currentMonth);
tableYear.innerHTML = currentYear;
hideDatePicker();

//Handles variables that need to be changed for hiding datepicker
function hideDatePicker() {
    document.getElementById('datePickerDiv').style.display = 'none';
    isDatePickerVisible = false;
}

//Handles variables that need to be changed for showing datepicker
function showDatePicker() {
    document.getElementById('datePickerDiv').style.display = 'block';
    isDatePickerVisible = true;
}

//Handles all variables that need to change when hiding datepicker
function hideYearPicker() {
    document.getElementById('yearTable').style.display = 'none';
    isYearPickerVisible = false;
}

//Handles all variables that need to change when hiding datepicker
function showYearPicker() {
    document.getElementById('yearTable').style.display = 'block';
    isYearPickerVisible = true;
}

//Manages the opening on closing of the datepicker on user click
function openDatePicker() {
    console.log("Setting the date");
    if (isDatePickerVisible == true) {
        hideDatePicker();
        hideYearPicker();
    } else {
        showDatePicker();
        hideYearPicker();
        tableYear.innerHTML = currentYear;
        tableMonth.innerHTML = getMonthInFull(currentMonth);
        populateCalender();
    }
}

//Checks if the year is a leap year and returns number of days for month of February
function isLeapYear(selectedYear) {
    var remainder = selectedYear % 4;
    if (remainder == 0) {
        return 29;
    } else {
        return 28;
    }
}

//populates the days of the month for every month
function populateCalender() {
    datePickerObj[1].numberOfDays = isLeapYear(currentYear);
    dateTable.innerHTML = "";
    var monthDays = 31;
    var previousMonthDays;
    var tempDate = new Date();
    for (var i = 0; i < datePickerObj.length; i++) {
        if (currentMonth == datePickerObj[i].intValue) {
            monthDays = datePickerObj[i].numberOfDays;
            if (i == 0) {
                previousMonthDays = datePickerObj[11].numberOfDays;
            } else {
                previousMonthDays = datePickerObj[i - 1].numberOfDays;
            }
            console.log("MONTHDAYS------" + monthDays);

        }

    }


    var lengthOfMonth = monthDays;
    var postNumberOfDays = 0;
    var prenumberOfDays = 0;
    var totalDays = 0;

    tempDate.setDate(1);
    tempDate.setFullYear(currentYear);
    tempDate.setMonth(currentMonth);
    var iteratedDate = 0;
    var tempDay = tempDate.getDay();

    console.log("TEMPDATE------" + tempDate);
    console.log("TEMPDAY------" + tempDay); // offset
    prenumberOfDays = tempDay;
    totalDays = prenumberOfDays + monthDays;

    while (totalDays > 0) {

        let trNode = document.createElement("tr");

        for (var i = 0; i < 7; i++) {
            totalDays--;


            let tdNode = document.createElement("td");
            tdNode.setAttribute("style", "text-align:center")

            let button = document.createElement("button");

            if (prenumberOfDays > 0) {

                var previousMonthDay = (previousMonthDays - tempDay) + 1;
                button.innerHTML = previousMonthDay;
                button.setAttribute("class", "greyedOut");
                button.setAttribute("onclick", "selectDate(this.innerHTML, 0)");
                tempDay--;
                prenumberOfDays--;

            } else if (monthDays > 0) {
                button.innerHTML = lengthOfMonth + 1 - monthDays;
                button.setAttribute("onclick", "selectDate(this.innerHTML, 1)");
                monthDays--;
            } else {
                postNumberOfDays++;
                button.innerHTML = postNumberOfDays;
                button.setAttribute("class", "greyedOut");
                button.setAttribute("onclick", "selectDate(this.innerHTML, 2)");
            }


            tdNode.appendChild(button);
            trNode.appendChild(tdNode);
        }
        dateTable.appendChild(trNode)

    }
}

//When user selects date, manages the logic for post and previous month selections and appends the input field
function selectDate(date, month) {
    currentDate = date;
    if (month == 0) {
        currentMonth -= 1;
    } else if (month == 2) {
        currentMonth += 1
    }
    if (currentMonth == -1) {
        currentYear = parseInt(currentYear, 10) - 1;
        currentMonth = 11;
    } else if (currentMonth == 12) {
        currentYear = parseInt(currentYear, 10) + 1;
        currentMonth = 0;
    }
    var dateString = currentDate + "-" + getMonthInFull(currentMonth) + "-" + currentYear;
    datePickerInput.value = dateString;
    hideDatePicker();
    console.log("DATE--------------------" + dateString);
}

//Returns the full month from its numeric value
function getMonthInFull(month) {
    for (var i = 0; i < datePickerObj.length; i++) {
        if (datePickerObj[i].intValue == month) {
            return datePickerObj[i].month;
            break;
        }
    }
}

//Increments the month on calender and repopulates days
function incrementMonth() {
    if (currentMonth != 11) {
        currentMonth += 1;
        tableMonth.innerHTML = getMonthInFull(currentMonth);
        populateCalender();
        console.log("DATEPICKER- date incremented");
    }
}

//Decrements the month on calender and repopulates days
function decrementMonth() {
    if (currentMonth != 0) {
        currentMonth -= 1;
        tableMonth.innerHTML = getMonthInFull(currentMonth);
        populateCalender();
        console.log("DATEPICKER- date decremented");
    }
}



//Populate the table that allows for selection of different year
function populateYearTable() {
    if (isYearPickerVisible == false) {
        hideDatePicker();
        showYearPicker();
        minYear=currentYear;
        tbodyNode.innerHTML = "";
        for (var i = 0; i < 5; i++) {
            let trNode = document.createElement("tr");
            for (var a = 0; a < 5; a++) {
                if(i==0 && a ==0){
                    maxYear=minYear;
                }
                minYear--;
                let tdNode = document.createElement("td");
                let buttonNode = document.createElement("button");
                buttonNode.setAttribute("onclick", "selectYear(this.innerHTML)")
                buttonNode.innerHTML = minYear + "";
                tdNode.appendChild(buttonNode);
                trNode.appendChild(tdNode)

            }
            tbodyNode.appendChild(trNode);
        }

        yearTable.appendChild(tbodyNode);
    } else {

        hideYearPicker();
        showDatePicker();
        populateCalender();
    }

}

//On selection of year, populate correct variables and go back to date picker
function selectYear(selectedYear) {
    hideYearPicker();
    showDatePicker();
    setYear(selectedYear);
    populateCalender();


}

//Manages all variables that need to change when we need to change the year
function setYear(year) {
    currentYear = year;
    tableYear.innerHTML = currentYear;
}

//Increment the total number of years in the year table
function incrementYear() {
    tbodyNode.innerHTML = "";
    minYear = parseInt(maxYear, 10) + 25;
    for (var i = 0; i < 5; i++) {
        let trNode = document.createElement("tr");
        for (var a = 0; a < 5; a++) {
            if(i==0 && a ==0){
                maxYear=minYear;
            }
            minYear--;
            let tdNode = document.createElement("td");
            let buttonNode = document.createElement("button");
            buttonNode.setAttribute("onclick", "selectYear(this.innerHTML)")
            buttonNode.innerHTML = minYear + "";
            tdNode.appendChild(buttonNode);
            trNode.appendChild(tdNode)

        }
        tbodyNode.appendChild(trNode);
    }

    yearTable.appendChild(tbodyNode);
}

//Decrement the total number of years in the year table
function decrementYear() {
    tbodyNode.innerHTML = "";
    for (var i = 0; i < 5; i++) {
        let trNode = document.createElement("tr");
        for (var a = 0; a < 5; a++) {
            if(i==0 && a ==0){
                maxYear=minYear;
            }
            minYear--;
            let tdNode = document.createElement("td");
            let buttonNode = document.createElement("button");
            buttonNode.setAttribute("onclick", "selectYear(this.innerHTML)")
            buttonNode.innerHTML = minYear + "";
            tdNode.appendChild(buttonNode);
            trNode.appendChild(tdNode)

        }
        tbodyNode.appendChild(trNode);
    }

    yearTable.appendChild(tbodyNode);
}

//Allow user to return to datepicker from year table without selecting a year
function back() {
    showDatePicker();
    hideYearPicker();
}





