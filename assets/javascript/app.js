$(document).ready(function(){
    var shows = ["futurama","south park","archer","rick and morty","hell's kitchen","masterchef"];

//adds button for the original shows array
function renderButtons() {
    $("#tv-show-buttons").empty();
    for (var i=0; i < shows.length; i++) {
        $("#tv-show-buttons").append("<button class='btn btn-secondary' data-show='" + shows[i] + "'>" + shows[i] + "</button>");
    }
}

renderButtons();

//add a button for an input show
$("#add-show").on("click", function() {
    event.preventDefault();
    var show = $("#show-input").val().trim();
    shows.push(show);
    renderButtons();
    return;
});










})