//loader check
$(function(){

//basic unit constructor. Arguments supplied by subconstructors
var Unit = function(d, h, s, a, r, m, id) {
  {
    this.side=d;
    this.health=h;
    this.speed=s;
    this.aim=a;
    this.range=r;
    this.actions = m;
    this.id = id;
    this.attack = function(victim){
      var toHit = Math.random()*100;
      console.log(toHit)
      console.log(this.aim)
      if(this.aim > toHit){
        victim.health-=3;
        console.log(victim)
        $('.tile').off('click',targetClick);
        jsConvert(unitSelector).actions=0;
      }
      else{
        alert("Missed!")
        $('.tile').off('click',targetClick);
        jsConvert(unitSelector).actions=0;
      }

    }
  }
}

//to make adjusting stats easier.
var accChart = {rookie: 65, squaddie: 70, sergeant: 75}
var healthChart = {rookie: 1, squaddie: 2, sergeant: 3}



//creates initial board state.

  var ayyone = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 1, 2, "alien_1")
  var ayytwo = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 1, 2, "alien_2")
  var xone = new Unit("human", healthChart.rookie, 3, accChart.rookie, 3, 2, "human_1")
  var units = [[ayyone, ayytwo],[xone]]
var boardBuilder = function(){
  var ayythree = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 3, "alienthree")
  var xtwo = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "humanone")
  var xthree = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "humanone")
  for (var i = 1;i <= 6; i++){
    for (var j = 1; j <= 13;j++)
      $('.board').append("<div class = 'tile' id = "+String(j)+String(i)+'><div>')
  }
  $('#11').append("<div class = 'unit alien' id = "+ayyone.id+'>')
  $('#21').append("<div class = 'unit alien' id = "+ayytwo.id+'>')
  $('#31').append("<div class = 'unit human' id = "+xone.id+'>')
}
boardBuilder();



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

//keeps track of turn, in string form for easier use with dom and js IDs.
var turnTrack = 'alien';
var enemy = "human";
var unitIndex = {"alien": 0, "human": 1}

//sends selected unit info to the dom
var selectDomInfo = function (selection){
  if (selection === undefined){
    $('#health').text('Health: ');
    $('#speed').text('Speed: ');
    $('#range').text('Range: ');
    $('#actions').text('Actions: ');
  }
  else{
  var source = jsConvert(selection);
    $('#health').text('Health: '+source.health);
    $('#speed').text('Speed: '+source.speed);
    $('#range').text('Range: '+source.range);
    $('#actions').text('Actions: '+source.actions);
  }
}

//sends updates to the dom for health and abilities

//selects units if it's your turn.
var unitSelector = $(".unit").on('click',function(){
  var sideCheck = $(this).attr('id');
  //prevents selecting own units while attacking.
  if (attacking ===false){
    if (sideCheck.split("_")[0]===turnTrack){
      unitSelector = sideCheck;
      selectDomInfo(unitSelector);
    }
    else {
      alert("You can't command the enemy.")
    }
  }
  else{

  }
})


//determines range between two units in whole numbers, to be compared
//with unit range property.
var rangeFinder = function(shooter, victim){
  var first = $('#'+shooter).parent().attr('id')
  var firstLoc = Number(first.split('')[0])+Number(first.split('')[1])
  var second = $(victim).parent().attr('id')
  var secondLoc = Number(second.split('')[0])+Number(second.split('')[1])
  return Math.abs(firstLoc - secondLoc);
}

//handles logic for targeting enemy units.
var targetClick = function(event){
      var $clickTarget = $(event.target);
      var attacker = jsConvert(unitSelector);
      if ($clickTarget.hasClass(enemy)===true){
        var rangeCheck = rangeFinder(unitSelector, $clickTarget)
        if(range >= rangeCheck){
          var $targId = $clickTarget.attr('id')
          var target = jsConvert($targId)
          attacker.attack(target)
          if(target.health<0){
            alert('he ded')
            var enemies = units[unitIndex[enemy]][0].health;
            if (enemies < 0){
              console.log("you win")
            }
            $clickTarget.remove();
          }
        }
        else{
          alert('Out of Range')
        }
      }
      else {
        alert('Invalid target')
      }
}

//tracks whether player is attempting to target something
var attacking = false;

//attack button; sets up state in which clicks determine validity of target,
//and possibly perform attack method, rather than normal functionality

$('#attack').on('click', function(){
  if(jsConvert(unitSelector).actions>0){
    if (attacking === false){
      attacking = true;
      $('.tile').on('click',targetClick)
    }

    else {
      attacking = false;
      $('.tile').off('click',targetClick);
      // to remove the event listeners if the attack is canceled
    }
  }
  else{
    alert('Out of actions')
  }
})


//movement buttons
$('#right').on('click',function(){
  var $currentLocation = $('#'+unitSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) + 10;
  console.log($newLocation)
  //checks for units in the destination tile
  if($('#'+$newLocation+" > .unit").length!=0){

    }
  else if(jsConvert(unitSelector).actions>0){
    $('#'+unitSelector).appendTo("#"+$newLocation)
    jsConvert(unitSelector).actions-=1;
    selectDomInfo(unitSelector)
    }
  else{
    alert('Out of Moves')
  }

})

$('#left').on('click',function(){
  var $currentLocation = $('#'+unitSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) - 10;
  console.log($newLocation)
  if($('#'+$newLocation+" > .unit").length!=0){
      }
  else if(jsConvert(unitSelector).actions>0){
    $('#'+unitSelector).appendTo("#"+$newLocation)
    jsConvert(unitSelector).actions-=1;
    selectDomInfo(unitSelector)
    }
  else{
    alert('Out of Moves')
  }
})

$('#up').on('click',function(){
  var $currentLocation = $('#'+unitSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) - 1;
  console.log($newLocation)
  if($('#'+$newLocation+" > .unit").length!=0){
      }
  else if(jsConvert(unitSelector).actions>0){
    $('#'+unitSelector).appendTo("#"+$newLocation)
    jsConvert(unitSelector).actions-=1;
    selectDomInfo(unitSelector)
    }
  else{
    alert('Out of Moves')
  }
})

$('#down').on('click',function(){
  var $currentLocation = $('#'+unitSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) + 1;
  console.log($newLocation)
  if($('#'+$newLocation+" > .unit").length!=0){
    console.log('asdf')
      }
  else if(jsConvert(unitSelector).actions>0){
    $('#'+unitSelector).appendTo("#"+$newLocation)
    jsConvert(unitSelector).actions-=1;
    selectDomInfo(unitSelector)
    }
  else{
    alert('Out of Moves')
  }
})


//turn button, also refreshes movements and resets unit selector
$('#turn').on('click',function(){
  unitSelector = null;
  attacking = false;
  var resetter = {}
  selectDomInfo()
  if(turnTrack==='alien'){
    turnTrack = 'human';
    for (var i = 0; i < units[1].length; i++){
      units[1][i].actions = 2;
    }
    enemy = 'alien';
  }
  else{
    turnTrack = 'alien';
    for (var j = 0; j < units[0].length; j++){
      units[0][j].actions = 2;
    }
    enemy = 'human';
  }
})

})
