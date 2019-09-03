


var datePickerObj =[{month : "January", numberOfDays : 31},
                    {month : "February", numberOfDays : 28},
                    {month : "March", numberOfDays : 31},
                    {month : "April", numberOfDays : 30},
                    {month : "May", numberOfDays : 31},
                    {month : "June", numberOfDays : 30},
                    {month : "July", numberOfDays : 31},
                    {month : "August", numberOfDays : 31},
                    {month : "September", numberOfDays : 30},
                    {month : "October", numberOfDays : 31},
                    {month : "November", numberOfDays : 30},
                    {month : "December", numberOfDays : 31}
                    ];
var showDatePicker = false;
var currentDate = new Date();

function openDatePicker() {
console.log("Setting the date");
if(showDatePicker==true){
showDatePicker=false;
document.getElementById('datePicker').style.visibility = 'hidden';
}
else{
showDatePicker=true;
document.getElementById('datePicker').style.visibility = 'visible';
}
  document.getElementById("datePickerInput").innerHTML = "2019/08/29";
}

function isLeapYear(selectedYear){
    var remainder = selectedYear % 4;
    if(remainder==0){
    return 29;
    }
    else{
    return 28;
    }
}

function getModularValue(selectedYear){
    var answer= selectedYear % 4;
    console.log("displayModularValueCalled");
    console.log("displayModularValueCalled answer :  " +answer);

    return answer;
}

function calculate(){

        var inputYear = document.getElementById("inputBox").value;
         document.getElementById("answer").innerHTML = getModularValue(inputYear);
}

function displayIndex(){

document.getElementById("answer").innerHTML = datePickerObj[0].month;
}

var datePickerTable = document.getElementById("datePickerTableBody");
var row = datePickerTable.insertRow();
        addCell(row, 'Category: ' + datePickerObj[0].month);
