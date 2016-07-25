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
        victim.health-=(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
        $('.tile').off('click',targetClick);
        jsConvert(unitSelector).actions=0;
        attacking = false;
      }
      else{
        alert("Missed!")
        $('.tile').off('click',targetClick);
        jsConvert(unitSelector).actions=0;
        attacking = false;
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
var healthChart = {rookie: 5, sectoid:3}


//This really should be automated. If I had more time...
//creates initial board state.
  var ayyone = new Unit("alien", healthChart.sectoid, 3, accChart.rookie, 3, 2, "alien_1")
  var ayytwo = new Unit("alien", healthChart.sectoid, 3, accChart.rookie, 3, 2, "alien_2")
  var ayythree = new Unit("alien", healthChart.sectoid, 3, accChart.rookie, 3, 2, "alien_3")
  var ayyfour = new Unit("alien", healthChart.sectoid, 3, accChart.rookie, 3, 2, "alien_4")
  var ayyfive = new Unit("alien", healthChart.sectoid, 3, accChart.rookie, 3, 2, "alien_5")
  var ayysix = new Unit("alien", healthChart.sectoid, 3, accChart.rookie, 3, 2, "alien_6")
  var xone = new Unit("human", healthChart.rookie, 3, accChart.rookie, 3, 2, "human_1")
  var xtwo = new Unit("human", healthChart.rookie, 3, accChart.rookie, 3, 2, "human_2")
  var xthree = new Unit("human", healthChart.rookie, 3, accChart.rookie, 3, 2, "human_3")
  var units = [[ayyone, ayytwo, ayythree, ayyfour, ayyfive, ayysix],[xone, xtwo, xthree]]

var boardBuilder = function(){

  for (var i = 1;i <= 6; i++){
    for (var j = 1; j <= 13;j++){
      $('.board').append("<div class = 'tile' id = "+String(j)+String(i)+'>')
    }
  }
  $('#21').append("<div class = 'unit alien' id = "+ayyone.id+'>')
  $('#'+ayyone.id).append("<div class = health-bar id = "+ayyone.id+'health>')
  $('#23').append("<div class = 'unit alien' id = "+ayytwo.id+'>')
  $('#'+ayytwo.id).append("<div class = health-bar id = "+ayytwo.id+'health>')
  $('#25').append("<div class = 'unit alien' id = "+ayythree.id+'>')
  $('#'+ayythree.id).append("<div class = health-bar id = "+ayythree.id+'health>')
  $('#121').append("<div class = 'unit human grenade' id = "+xone.id+'>')
  $('#'+xone.id).append("<div class = health-bar id = "+xone.id+'health>')
  $('#123').append("<div class = 'unit human grenade' id = "+xtwo.id+'>')
  $('#'+xtwo.id).append("<div class = health-bar id = "+xtwo.id+'health>')
  $('#125').append("<div class = 'unit human grenade' id = "+xthree.id+'>')
  $('#'+xthree.id).append("<div class = health-bar id = "+xthree.id+'health>')
  $('#12').append("<div class = 'unit alien' id = "+ayyfour.id+'>')
  $('#'+ayyfour.id).append("<div class = health-bar id = "+ayyfour.id+'health>')
  $('#14').append("<div class = 'unit alien' id = "+ayyfive.id+'>')
  $('#'+ayyfive.id).append("<div class = health-bar id = "+ayyfive.id+'health>')
  $('#16').append("<div class = 'unit alien' id = "+ayysix.id+'>')
  $('#'+ayysix.id).append("<div class = health-bar id = "+ayysix.id+'health>')

}
boardBuilder();
$('#grenade').hide();
//add a bunch of aliens to "balance" game, try to make mind blast work.

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
var unitCounter = {"alien": 6, "human": 3}
var healthBar = {0: "black", 1: "red", 2: "orange", 3: "yellow", 4: 'green', 5: 'blue'}

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

var healthUpdate = function(data, dom){

  var par = dom.attr('id')
  var bar = $('#'+par+'> .health-bar');
  if (data.health < 0)
  {
    bar.css('background-color', 'black')
  }
  else{
    bar.css('background-color', healthBar[data.health])
  }
}

//sends updates to the dom for health and abilities

//selects units if it's your turn.
var unitSelector = $(".unit").on('click',function(){
  var sideCheck = $(this).attr('id');
  $('.unit').removeClass('selector')
  //prevents selecting own units while attacking.
  if (attacking ===false&&grenading===false){
    if (sideCheck.split("_")[0]===turnTrack){
      $(this).addClass('selector')
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

  var second = $(victim).attr('id')
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
    var sideCheck = targetdom.attr('id').split('_')[0]
    if (sideCheck == enemy)
    {
      unitCounter[enemy]-=1
      alert('enemy killed')
      targetdom.addClass('dead'+enemy);
    }
    else
    {
      unitCounter[turnTrack]-=1
      alert('ally killed')
      targetdom.addClass('dead'+turnTrack);
    }

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
        var $clickParent = $clickTarget.parent();
        var rangeCheck = rangeFinder(unitSelector, $clickParent)
        if(attacker.range >= rangeCheck){
          var $targId = $clickTarget.attr('id')
          var target = jsConvert($targId)
          attacker.attack(target)
          var bull = $('<img id = bullet src = https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg>')
          bull.css('top', $('#'+unitSelector).position().top+55)
          bull.css('left', $('#'+unitSelector).position().left+80)
          $('.board').append(bull)
          bull.css('top', $clickTarget.position().top+40)
          bull.css('left', $clickTarget.position().left+50)
          setTimeout(function(){
          killCheck(target,$clickTarget)
          healthUpdate(target, $clickTarget)
          bull.remove();
          },1000)

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
  var crossArr = []
  if($(event.target).hasClass('unit')===true)
  {
    var $child = $(event.target).parent()
    var $clickTarget = Number($child.attr('id'));
    console.log($clickTarget)
  }
  else
  {
    var $child = $(event.target)
    var $clickTarget = Number($(event.target).attr('id'));
    console.log($clickTarget)
  }
  console.log('work')
  if(rangeFinder(unitSelector, $child)<=3)
  {
    var center = $('#'+($clickTarget)+"> .unit");
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
        naded.health -=1;
        healthUpdate(naded, crossArr[p])
        killCheck(naded, crossArr[p])
      }
    }
    grenading = false;
    $('.tile').off('click',grenadeThrow)
    jsConvert(unitSelector).actions = 0;
    $('#'+unitSelector).removeClass('grenade')
  }
  else{
    alert('Out of Range')
  }
}

//tracks whether player is attempting to target something
var attacking = false;
var grenading = false;

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
  if(jsConvert(unitSelector).actions>0 && $('#'+unitSelector).hasClass('grenade')===true){
    if (grenading ===false)
    {
      grenading = true;
      $('.tile').on('click',grenadeThrow)
    }
    else
    {
      $('.tile').off('click',grenadeThrow);
    }
  }
  else{
    alert('Out of actions/grenades')
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
  $('.unit').removeClass('selector')
  var resetter = {}
  selectDomInfo()
  if(turnTrack==='alien'){
    turnTrack = 'human';
    $('#grenade').show();
    $('#turntracker').text('Turn: Humans')
    for (var i = 0; i < units[1].length; i++){
      units[1][i].actions = 2;
    }
    enemy = 'alien';
  }
  else{
    turnTrack = 'alien';
     $('#turntracker').text('Turn: Aliens')
    for (var j = 0; j < units[0].length; j++){
      units[0][j].actions = 2;
    }
    $('#grenade').hide()
    enemy = 'human';
  }
})

})
