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
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    var trainObj= {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };

    database.ref().push(trainObj)})

database.ref().on("child_added", function(snapshot,prevKey) {


    //Store data in variable
    var tFreq = snapshot.val().frequency
    var tDest = snapshot.val().destination
    var tName = snapshot.val().trainName
    var tFirstTrain = snapshot.val().firstTrainTime


    var timeArr = tFirstTrain.split(":");
    var trainTime = moment.hours(timeArr[0]).minutes(timeArr[1])

    var maxMoment = moment.max(moment(),"minutes")
    var tMinutes
    var tArrival


    // if the first train is later than the current time, set the arrival to the first train
    if (maxMoment === trainTime){

            tArrival = trainTime.format("hh:mm A");
            tMinutes = trainTime.diff(moment(), "minutes")
            


    }else{

        var differenceTimes = moment.diff(trainTime,"minutes")
        var tRemainder = differenceTimes % tFreq;

        tMinutes = tFrequency - tRemainder

        tArrival = moment().add(tMinutes,"m").format("hh:mm A")

    }

    // to get next arrival - difference bewtween current and firstTrinTime
    // then we want to display this to firstTrainTime
    // so... var diffCurrentFirst = moment()


    // to get minutesAway - difference between next arrival and current time
    $("tbody").append("<tr><th>" + tName 
    + "</th><th>" + tDest
    + "</th><th>" + tFreq 
    + "</th><th>" + tArrival 
    + "</th><th>" + tMinutes + "</th><th>")
})
