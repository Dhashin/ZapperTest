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
var showDatePicker = false;
var showYearPicker = false;
var date = new Date();
var currentDate = date.getDate();
var currentDay = date.getDay();
var currentMonth = date.getMonth();
var currentYear = date.getFullYear();
let body = document.getElementById("theBody");
let tableHead = document.getElementById("thead");
let tableBody = document.getElementById("datePickerTableBody");
let tableYear = document.getElementById("tableYear");
let tableMonth = document.getElementById("tableMonth");

let yearTable = document.getElementById("yearTable");
let tbodyNode = document.getElementById("yearTableBody");

let dateTable = document.getElementById("dateTableBody");
var minYear =2019;
var maxYear =2019;

tableMonth.innerHTML = getMonthInFull(currentMonth);
tableYear.innerHTML = currentYear;
document.getElementById('datePickerTable').style.visibility = 'hidden';


function openDatePicker() {
    console.log("Setting the date");
    if (showDatePicker == true) {
        showDatePicker = false;
        document.getElementById('datePickerTable').style.visibility = 'hidden';
    } else {
        showDatePicker = true;
        document.getElementById('datePickerTable').style.visibility = 'visible';
    }
    document.getElementById("datePickerInput").innerHTML = date;
    populateCalender();
}

function isLeapYear(selectedYear) {
    var remainder = selectedYear % 4;
    if (remainder == 0) {
        return 29;
    } else {
        return 28;
    }
}

function populateCalender() {
    var tempDate = new Date();
    tempDate.setDate(1);
    tempDate.setFullYear(currentYear);
    tempDate.setMonth(currentMonth);
    var iteratedDate = 0;
    var tempDay = tempDate.getDay();
    for(var a=0;a<5;a++){
        let trNode = document.createElement("tr");
        for(var i =0;i<7;i++){
            let tdNode = document.createElement("td");
            tdNode.setAttribute("style", "text-align:center")

            let button = document.createElement("button");
            button.innerHTML = iteratedDate;
            tdNode.appendChild(button);
            trNode.appendChild(tdNode);
        }
        dateTable.appendChild(trNode)
    }



}

function getModularValue(selectedYear) {
    var answer = selectedYear % 4;
    console.log("displayModularValueCalled");
    console.log("displayModularValueCalled answer :  " + answer);

    return answer;
}

function calculate() {

    var inputYear = document.getElementById("inputBox").value;
    document.getElementById("answer").innerHTML = getModularValue(inputYear);
}

function displayIndex() {

    document.getElementById("answer").innerHTML = datePickerObj[0].month;
}




function getMonthInFull(month) {
    for (var i = 0; i < datePickerObj.length; i++) {
        if (datePickerObj[i].intValue == month) {
            return datePickerObj[i].month;
            break;
        }
    }
}

function incrementMonth() {
    if (currentMonth != 11) {
        currentMonth += 1;
        tableMonth.innerHTML = getMonthInFull(currentMonth);
        console.log("DATEPICKER- date incremented");
    }
}

function decrementMonth() {
    if (currentMonth != 0) {
        currentMonth -= 1;
        tableMonth.innerHTML = getMonthInFull(currentMonth);
        console.log("DATEPICKER- date decremented");
    }
}

function populateYearTable() {
    if(showYearPicker==false) {
        document.getElementById('datePickerTable').style.visibility = 'hidden';
        showDatePicker = false;
        document.getElementById('yearTable').style.visibility = 'visible';
        showYearPicker = true;
        //let tbodyNode = document.createElement("tbody");
        tbodyNode.innerHTML="";
        for (var i = 0; i < 5; i++) {
            let trNode = document.createElement("tr");
            for (var a = 0; a < 5; a++) {
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
    }else {
        document.getElementById('datePickerTable').style.visibility = 'visible';
        showDatePicker = true;
        document.getElementById('yearTable').style.visibility = 'hidden';
        showYearPicker = false;
    }

}

function selectYear(selectedYear) {
    document.getElementById('datePickerTable').style.visibility = 'visible';
    showDatePicker=false;
    document.getElementById('yearTable').style.visibility = 'hidden';
    showYearPicker=false;
    setYear(selectedYear);


}

function setYear(year) {
    currentYear=year;
    tableYear.innerHTML = currentYear;
}


function incrementYear(){
    tbodyNode.innerHTML="";
    for (var i = 0; i < 5; i++) {
        let trNode = document.createElement("tr");
        for (var a = 0; a < 5; a++) {
            minYear++;
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

function decrementYear(){
    tbodyNode.innerHTML="";
    for (var i = 0; i < 5; i++) {
        let trNode = document.createElement("tr");
        for (var a = 0; a < 5; a++) {
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

function back() {
    document.getElementById('datePickerTable').style.visibility = 'visible';
    showDatePicker = true;
    document.getElementById('yearTable').style.visibility = 'hidden';
    showYearPicker = false;
}





