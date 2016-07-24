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

// var Rookie = function (){
//   this.grenade = function(target){

//   }

// }

//to make adjusting stats easier.
var accChart = {rookie: 65, squaddie: 70, sergeant: 75}
var healthChart = {rookie: 1, squaddie: 2, sergeant: 3}



//creates initial board state.
  var ayyone = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 1, 2, "alien_1")
  var ayytwo = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 1, 2, "alien_2")
  var ayythree = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 1, 2, "alien_3")
  var xone = new Unit("human", healthChart.rookie, 3, accChart.rookie, 3, 2, "human_1")
  var xtwo = new Unit("human", healthChart.rookie, 3, accChart.rookie, 3, 2, "human_2")
  var xthree = new Unit("human", healthChart.rookie, 3, accChart.rookie, 3, 2, "human_3")
  var units = [[ayyone, ayytwo, ayythree],[xone, xtwo, xthree]]

var boardBuilder = function(){

  for (var i = 1;i <= 6; i++){
    for (var j = 1; j <= 13;j++){
      $('.board').append("<div class = 'tile' id = "+String(j)+String(i)+'>')
    }
  }
  $('#21').append("<div class = 'unit alien' id = "+ayyone.id+'>')
  $(ayyone.id).append("<div class = health-bar id = "+ayyone.id+'health>')
  $('#23').append("<div class = 'unit alien' id = "+ayytwo.id+'>')
  $('#25').append("<div class = 'unit alien' id = "+ayythree.id+'>')
  $('#131').append("<div class = 'unit human' id = "+xone.id+'>')
  $('#133').append("<div class = 'unit human' id = "+xtwo.id+'>')
  $('#135').append("<div class = 'unit human' id = "+xthree.id+'>')

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
var unitCounter = {"alien": 2, "human": 1}

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
  if(first.split('').length==2)
  {
    var firstLoc = Number(first.split('')[0])+Number(first.split('')[1])
  }
  else
  {
    var firstLoc = Number(first.split('')[0]+first.split('')[1])+Number(first.split('')[2])
  }

  var second = $(victim).parent().attr('id')
  if(second.split('').length==2)
  {
    var secondLoc = Number(second.split('')[0])+Number(second.split('')[1])
  }
  else
  {
    var secondLoc = Number(second.split('')[0]+second.split('')[1])+Number(second.split('')[2])
  }
  console.log(firstLoc)
  console.log(secondLoc)
  return Math.abs(firstLoc - secondLoc);
}

//handles death checks and win checks
var killCheck = function(targetdata, targetdom){
  if(targetdata.health <= 0){
    alert('enemy killed');
    unitCounter[enemy]-=1
    targetdom.remove();
    if(unitCounter[enemy] <=0)
    {
      alert('you win')
    }
  }
}

//handles logic for targeting enemy units.
var targetClick = function(event){
      var $clickTarget = $(event.target);
      var attacker = jsConvert(unitSelector);
      if ($clickTarget.hasClass(enemy)===true){
        var rangeCheck = rangeFinder(unitSelector, $clickTarget)
        if(attacker.range >= rangeCheck){
          var $targId = $clickTarget.attr('id')
          var target = jsConvert($targId)
          attacker.attack(target)
          killCheck(target,$clickTarget)
        }
        else{
          alert('Out of Range')
        }
      }
      else {
        alert('Invalid target')
      }
}

var grenadeThrow = function(event){
  //add if to handle clicking on tile vs unit
  var $clickTarget = Number($(event.target).attr('id'));
  var crossArr = []
  var center = $('#'+($clickTarget+1)+"> .unit");
  var below = $('#'+($clickTarget+1)+"> .unit");
  var right = $('#'+($clickTarget + 10)+"> .unit");
  var above = $('#'+($clickTarget - 1)+"> .unit");
  var left = $('#'+($clickTarget - 10)+"> .unit");
  crossArr.push(center, below, right, above, left)
  console.log(right)
  console.log(above)
  for (var p = 0; p < crossArr.length; p++){
    if(crossArr[p].length === 1){
      var naded = jsConvert(crossArr[p].attr('id'))
      naded.health -=3;
      selectDomInfo(crossArr[p].attr('id'))
      killCheck(naded, crossArr[p])
    }
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

$('#grenade').on('click', function(){
  if(jsConvert(unitSelector).actions>0){
    if (attacking ===false)
    {
      attacking = true;
      $('.tile').on('click',grenadeThrow)
    }
    else
    {
      $('.tile').off('click',grenadeThrow);
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
