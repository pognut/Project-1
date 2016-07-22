//loader check
$(function(){

//basic unit constructor. Arguments supplied by subconstructors
var Unit = function(d, h, s, a, r, id) {
  {
    this.side=d;
    this.health=h;
    this.speed=s;
    this.aim=a;
    this.range=r;
    this.id = id;

  }
}

var domToScript = function (element){
    var jID = (element.split('_')[1])-1
    return units[jID]
}
//to make adjusting stats easier.
var accChart = {rookie: 65, squaddie: 70, sergeant: 75}
var healthChart = {rookie: 1, squaddie: 2, sergeant: 3}



//creates initial board state.

  var ayyone = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 3, "alien_1")
  var ayytwo = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 3, "alien_2")
  var units = [ayyone, ayytwo]
var boardBuilder = function(){
  var ayythree = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 3, "alienthree")
  var xone = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "humanone")
  var xtwo = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "humanone")
  var xthree = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "humanone")
  console.log(ayyone['health'])
  console.log(ayytwo)
  $('#11').append('<div class = alien id = '+ayyone.id+'>')
  $('#21').append('<div class = alien id = '+ayytwo.id+'>')
}
boardBuilder();

//dom -> js converter, returns unit object
var jsConvert = function (id){
  var index = Number(id.split("_")[1])-1;
  return units[index];

}

//keeps track of turn, in string form for easier use with dom and js IDs.
var turnTrack = "alien";

var alienSelector = $(".alien").on('click',function(){
  var sideCheck = $(this).attr('id')
  if (sideCheck.split("_")[0]===turnTrack){
    alienSelector = sideCheck;
  }
  else {
    alert("You can't command the enemy.")
  }
  console.log(alienSelector)
})




$('#attack').on('click', function(){
  var $location = $('#'+alienSelector).parent();
  var $idNum = Number($location.attr('id'))
  var range = jsConvert(alienSelector).range;
})

$('#right').on('click',function(){
  var $currentLocation = $('#'+alienSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) + 10;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){

      }
  else{
  $('#'+alienSelector).appendTo("#"+$newLocation)
}
})

$('#left').on('click',function(){
  var $currentLocation = $('#'+alienSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) - 10;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){
      }
  else{
  $('#'+alienSelector).appendTo("#"+$newLocation)
}
})

$('#up').on('click',function(){
  var $currentLocation = $('#'+alienSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) - 1;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){
      }
  else{
  $('#'+alienSelector).appendTo("#"+$newLocation)
}
})

$('#down').on('click',function(){
  var $currentLocation = $('#'+alienSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) + 1;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){
    console.log('asdf')
      }
  else{
  $('#'+alienSelector).appendTo("#"+$newLocation)
}
})

})
