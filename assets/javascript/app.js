$(document).ready(function() {
  var shows = ["futurama", "south park", "archer", "rick and morty"];

  //adds button for the original shows array
  function renderButtons() {
    $("#tv-show-buttons").empty();
    for (var i = 0; i < shows.length; i++) {
      $("#tv-show-buttons").append("<button class='btn btn-secondary' data-show='" +shows[i] + "'>" +shows[i] +"</button>");
    }
  }

  renderButtons();

  //add a button for an input show
  $("#add-show").on("click", function() {
    event.preventDefault();
    var userShow = $("#show-input")
      .val()
      .trim();
    shows.push(userShow);
    console.log(shows);
    renderButtons();
    return;
  });

  //ajax call to the giphy api
  $("#tv-show-buttons").on("click", "button", function() {
    var show = $(this).attr("data-show");
    var queryURL ="https://api.giphy.com/v1/gifs/search?q=" +show +"&api_key=xxKKQ5ohrA8XTNvIi8DzYQhKeulRg0Uh&limit=10";
    //Taking the queryURL, gets a response from the server
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      //sets a variable results equal to the data from the server response
      var results = response.data;
      //empty the shows-gif div on clicking a new button
      $("#shows-gif").empty();
      //iterates along the ten gifs grabbed from the response.data
      for (var i = 0; i < results.length; i++) {
        var showDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var showImage = $("<img>");
        //sets the attr of showImage for a source of the still image url (default image)
        showImage.attr("src", results[i].images.original_still.url);
        //sets the attr data-still to the images still url
        showImage.attr("data-still", results[i].images.original_still.url);
        //sets the attr for data-animate to the animated gif
        showImage.attr("data-animate", results[i].images.original.url);
        //sets the default data-state to still (default state)
        showImage.attr("data-state", "still");
        //sets class of the image to gif
        showImage.attr("class", "gif");
        //appends the paragraph for the gifs rating to the showDiv
        showDiv.append(p);
        //appends the showImage (default state is a still gif) to the showDiv
        showDiv.append(showImage);
        //appends the showDiv containing the gif rating and gif image to the html div
        $("#shows-gif").append(showDiv);
      }
    });
  });

  function changeDataState() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state === "still") {
      $(this).attr("src", animateImage);
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      console.log("working");
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still");
    }
  }

  $(document).on("click", ".gif", changeDataState);
});
