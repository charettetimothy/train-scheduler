var config = {
    apiKey: "AIzaSyBFopttKCCGAo2frVMDPMzP-hB1RqmfyLQ",
    authDomain: "train-scheduler-56cfd.firebaseapp.com",
    databaseURL: "https://train-scheduler-56cfd.firebaseio.com",
    projectId: "train-scheduler-56cfd",
    storageBucket: "train-scheduler-56cfd.appspot.com",
    messagingSenderId: "632464262085"
  };
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();
    var name = $("#newName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();
    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })
})

database.ref().on("child_added", function(snapshot) {
    var employeeStartDate = snapshot.val().startDate;
    var employeeMonthRate = snapshot.val().monthRate;
    var convertedDate = moment(employeeStartDate).format('DD/MM/YY'); 
    var monthsWorked = moment().diff(moment(convertedDate), "months");
    var totalBilled = monthsWorked * employeeMonthRate;
    $("tbody").append("<tr><th>" + snapshot.val().name + "</th><th>" + snapshot.val().role + "</th><th>" + snapshot.val().startDate + "</th><th>" + monthsWorked + "</th><th>" + snapshot.val().monthRate + "</th><th>" + totalBilled + "</th></tr>")
})