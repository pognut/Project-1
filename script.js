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
    this.attack = function(victim){
      var toHit = Math.random()*100;
      console.log(toHit);
      if(this.aim > Math.floor((Math.random()*100))){
        victim.health-=3;
        console.log(victim)
      }
      else{
        alert("Missed!")
      }

    }
  }
}

//to make adjusting stats easier.
var accChart = {rookie: 65, squaddie: 70, sergeant: 75}
var healthChart = {rookie: 1, squaddie: 2, sergeant: 3}



//creates initial board state.

  var ayyone = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 1, "alien_1")
  var ayytwo = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 1, "alien_2")
  var xone = new Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "human_1")
  var units = [[ayyone, ayytwo],[xone]]
var boardBuilder = function(){
  var ayythree = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 3, "alienthree")
  var xtwo = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "humanone")
  var xthree = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "humanone")
  $('#11').append('<div class = alien id = '+ayyone.id+'>')
  $('#21').append('<div class = alien id = '+ayytwo.id+'>')
  $('#31').append('<div class = alien id = '+xone.id+'>')
}
boardBuilder();

// var test1 = $('#alien_1').parent().attr('id');
// var test2 = test1.split("")
// var test3 = Number(test2[0])+Number(test2[1])
// console.log(test3)
// var test4 = $('#alien_2').parent().attr('id');
// var test5 = test4.split("")
// var test6 = Number(test5[0])+Number(test5[1])
// console.log(test6)

//dom -> js converter, returns unit object
var jsConvert = function (id){
  var split = id.split("_");
  var index = Number(split[1])-1;

  if (split[0]==="alien"){
    return units[0][index];
  }
  else{
    return units[1][index];
  }
}

var attacking = false;

//keeps track of turn, in string form for easier use with dom and js IDs.
var turnTrack = "alien";
var enemy = "human";

var unitSelector = $(".alien").on('click',function(){
  var sideCheck = $(this).attr('id');
  if (attacking ===false){
    if (sideCheck.split("_")[0]===turnTrack){
      unitSelector = sideCheck;
    }
    else {
      alert("You can't command the enemy.")
    }
  }
  else{

  }
})

var rangeFinder = function(shooter, victim){
  var first = $('#'+shooter).parent().attr('id')
  var firstLoc = Number(first.split('')[0])+Number(first.split('')[1])
  var second = $(victim).parent().attr('id')
  var secondLoc = Number(second.split('')[0])+Number(second.split('')[1])
  return Math.abs(firstLoc - secondLoc);
}


$('#attack').on('click', function(){
  console.log(unitSelector)
  if (attacking === false){
    attacking = true;
    var attacker = jsConvert(unitSelector);
    var range = attacker.range
    $('.tile').on('click',function(event){
      var $clickTarget = $(event.target);
      if ($clickTarget.hasClass(turnTrack)){
        var rangeCheck = rangeFinder(unitSelector, $clickTarget)
        console.log(range)
        console.log(rangeCheck)
        if(range >= rangeCheck){
          var $targId = $clickTarget.attr('id')
          var target = jsConvert($targId)
          attacker.attack(target)
        }
        else{
          alert('Out of Range')
        }
      }
      else {
        alert('Invalid target')
      }
      // var sideCheck = $(this).attr('id');
      // var location
      // if(sideCheck.split('_')[0]===attacker.side){
      //   alert('Friendly Fire!');
      // }
      // else if ($('#'+this+" > .alien").length===0){

      // }
    })
  }
  else {
    attacking = false;
    // to remove the event listeners if the attack is canceled
    // $('.tile').removeEventListener(name)
  }
})

$('#right').on('click',function(){
  var $currentLocation = $('#'+unitSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) + 10;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){

      }
  else{
  $('#'+unitSelector).appendTo("#"+$newLocation)
}
})

$('#left').on('click',function(){
  var $currentLocation = $('#'+unitSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) - 10;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){
      }
  else{
  $('#'+unitSelector).appendTo("#"+$newLocation)
}
})

$('#up').on('click',function(){
  var $currentLocation = $('#'+unitSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) - 1;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){
      }
  else{
  $('#'+unitSelector).appendTo("#"+$newLocation)
}
})

$('#down').on('click',function(){
  var $currentLocation = $('#'+unitSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) + 1;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){
    console.log('asdf')
      }
  else{
  $('#'+unitSelector).appendTo("#"+$newLocation)
}
})

})
