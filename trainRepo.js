/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new Trains - then update the html as well as the database
// 3. Create a way to retrieve Trains from the Train database.
// 4. Create a way to calculate the months worked. atttempt to use the difference between time and current time.
// -- It will most likely not work given the time to work on the project - however creating the math steps will set up the basic foundation.
//    Then use moment.js formatting to set difference in time.
// 5. After all this - calculate Total time
$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyCf8DLZRozLQRD2LhcakxNiG9ey4kRRGH0",
    authDomain: "matthew-s-project.firebaseapp.com",
    databaseURL: "https://matthew-s-project.firebaseio.com",
    projectId: "matthew-s-project",
    storageBucket: "matthew-s-project.appspot.com",
    messagingSenderId: "693787121696"
  };
  firebase.initializeApp(config);

  var database = firebase.database();   


  // 2. Button for adding Trains 
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-train-time-input").val().trim(), "DD/MM/YY").format("X");
    var min = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding Train data
    var train = {
      name: trainName,
      destination: trainDestination,
      time: firstTrainTime,
      frequency: min
    };
  
    // Uploads Train data to the database
    database.ref().push(train);
  
    // Logs everything to console
    console.log(train.name);
    console.log(train.destination);
    console.log(train.time);
    console.log(train.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding Trains to the database as well as a row when the user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var min = childSnapshot.val().frequency;
  
    // Trains Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(min);
  
    // foundation of the Train time
    var destination = moment.unix(firstTrainTime).format("MM/DD/YY");
  
    // Calculate the train time with the below equation 
    // To calculate the train time
    var firstTrainTime = moment().diff(moment.unix(firstTrainTime, "X"), "months");
    console.log(firstTrainTime);
  
    // Calculate the total time frequency
    var frequency = firstTrainTime * min;
    console.log(frequency);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    destination + "</td><td>" + firstTrainTime + "</td><td>" + min + "</td><td>" + frequency + "</td></tr>");
  });
  
  });