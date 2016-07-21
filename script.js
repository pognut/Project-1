//loader check
$(function(){

//basic unit constructor. Arguments supplied by subconstructors
var Unit = function(d, h, s, a, r) {
  {
    this.side=d;
    this.health=h;
    this.speed=s;
    this.accuracy=a;
    this.range=r
  }
}

var accChart = {rookie: 1, squaddie: 2, sergeant: 3}
var healthChart = {rookie: 1, squaddie: 2, sergeant: 3}

var Human = function(rankh, ranka){
  new Unit("human", rankh.health, 3, ranka.accuracy, 3);
}

var Alien = function(rankh, ranka){
  new Unit("alien", rankh.health, 3, ranka.accuracy, 3);
}

var boardBuilder = function(){
  var ayyone = new Alien(healthChart.rookie, accChart.rookie)
  $('#11').append('<div class = alien id = alienone>')
}
boardBuilder();

$('button').on('click',function(){
  var currentLocation = $('#alienone').parent();
  var newLocation = Number(currentLocation.attr("id")) + 10;
  console.log(newLocation)
  $('#alienone').appendTo("#"+newLocation)
})

})
