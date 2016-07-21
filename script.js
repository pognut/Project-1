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
    this.attacker = function(target){
      var domID = $(target).attr('id');
      var scriptID = Number((domID.split('_'))[1])-1;
      units[scriptID]['health']-=3;
      console.log(units[scriptID])
    }
  }
}

var domToScript = function (element){
    var jID = (element.split('_')[1])-1
    return units[jID]
}
//to make adjusting stats easier.
var accChart = {rookie: 65, squaddie: 70, sergeant: 75}
var healthChart = {rookie: 1, squaddie: 2, sergeant: 3}

//Old redundant constructors.
// var Human = function(rankh, rankam, id){
//   new Unit("human", rankh, 3, ranka, 3);
// }

// var Alien = function(rankh, ranka, id){
//   new Unit("alien", rankh, 3, ranka, 3);
//   console.log(this.Unit)
// }

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


var alienSelector = $(".alien").on('click',function(){
  alienSelector = $(this).attr('id')
  console.log(alienSelector)
})

// var attacker = function(){
  // for (var i = 0; i < units.length; i++){
  //   if (units[i].id = alienSelector){
  //     if (units[i].aim > (Math.random()*100)){
  //       for (var j = 0; j < units.length; j++){
  //         if(units[j].id = this)
  //       }
  //     }
  //   }
  // }

// var attack = function(){

// }

//range checker, to be called when attack is clicked
var rangeChecker = function(location){
  var above = $('#'+(location - 1)+"> .alien");
  if (above.length > 0){
      above.on('click', domToScript(alienSelector).attacker(above))
  }
  var below = $('#'+(location + 1)+"> .alien");
  var right = $('#'+(location + 10)+"> .alien");
    if (right.length > 0){
      right.on('click', domToScript(alienSelector).attacker(right))
      console.log(right)
  }
  var left = $('#'+(location - 10)+"> .alien");
  var presence = above.length+below.length+left.length+right.length;
}
//hit calculator

//damage dealer




$('#attack').on('click', function(){
  var $location = $('#'+alienSelector).parent();
  var $idNum = Number($location.attr('id'))
  var targets = rangeChecker($idNum);
  if (targets < 0){
    alert('no targets in range')
  }
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
