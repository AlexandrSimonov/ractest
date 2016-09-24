/*var stage = null;
var layer = null;

var clicked = {};

function lineDraw(){
  if(clicked.begin && clicked.end && adequate(clicked.begin, clicked.end)){

    console.log("От точки: " + clicked.begin + " к точке: " + clicked.end + " провести линию");
    clicked = {};
  }
}

function resetColor(id){
  $(id).css("background", "red");
}

function changeColor(id){
  $(id).css("background", "grey");
}

function reset(){
  resetColor(clicked.begin);
  resetColor(clicked.end);

  clicked = {};
}

function controller(id){
  
  if(id.split("-")[2] == "start"){
    if(clicked.begin){
      resetColor(clicked.begin);  
    }
    clicked.begin = id;
  }

  if(id.split("-")[2] == "end"){
    if(clicked.end){
      resetColor(clicked.end);
    }  
    clicked.end = id; 
  }

  if(clicked.begin && clicked.end){
    if(clicked.begin == "#startCircle" && clicked.end == "#endCircle"){
      reset();
      console.log("Не всё ок");
    }
    else if(clicked.begin.split("-")[1] == clicked.end.split("-")[1]){
      reset();
      console.log("Не всё ок");
    }
    else{
      begin = $(clicked.begin).offset();
      end = $(clicked.end).offset();

      var line = new Konva.Line({
        points: [begin.left + radiusCircle, begin.top - heightMenu, end.left + radiusCircle, end.top - heightMenu],
        stroke: 'red',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round',
      });
      
      if(clicked.begin == "#startCircle"){

      }
      layer.add(line);
      stage.add(layer);     
      
      reset();
    }
  }
  else{
    changeColor(id); 
  }

}

function drag(){

}

var heightMenu = 40;
var radiusCircle = 10;




$("#beginCircle").click(function(e){
  console.log();
  console.log(e.currentTarget);
  $("#beginCircle").css("background", "blue");
  clicked = { begin : "start" };
  //e.target.css("background", "blue");
  drowLine($("#beginCircle").offset().left + 10, $("#beginCircle").offset().top - 40);
});

$(".nCircle").click(function(e){
  if(clicked.begin){
    clicked.end = "node-1";
    console.log(clicked);
    clicked = null;
  }
});



var askArray = [];
var editor = {};
var lines = [];





function addBlock(ask){
  $("#container-fluid").append('<div class="ask" id="ask-'+ask.id+'"><div id="ask-'+ask.id+'-end" class="bCircle circle"></div>'+ask.askText+'<div id="ask-'+ask.id+'-start" class="nCircle circle"></div></div>')

  $(".bCircle").click(function(e){
    controller("#" + e.target.id);  
  });

  $(".nCircle").click(function(e){
    controller("#" + e.target.id); 
  });

  moveBlock();
  
}

function moveBlock(){
  offsetMouse = false;
  
  $(".ask").mousedown(function(e){
    offsetMouse = {x : e.pageX - $(e.target).offset().left, y : e.pageY - $(e.target).offset().top}
  });

  $(".ask").mouseup(function(e){
    offsetMouse = false;
  });

  $(".ask").mousemove(function(e){   
    if(offsetMouse){
      for(var i = 0; i < lines.length; i++){
        if(lines[i].clicked.begin){

        }
      }   
      console.log($(this).attr("id"));
      console.log(lines);
       var tween = new Konva.Tween({
          node: rect,
          duration: 1,
          x: 140,
          y: 90,
          fill : 'red',
          rotation: Math.PI * 2,
          opacity: 1,
          strokeWidth: 6,
          scaleX: 1.5
      });
      $(this).css("left", e.pageX - offsetMouse.x);
      $(this).css("top", e.pageY - offsetMouse.y - 50);
      /*console.log($(this));
      $(this).target.css("left", e.pageX + offsetMouse.x);
      $(this).target.css("top", e.pageY + offsetMouse.y);

    }
  });


}
*/

//import { Ask } from '../ask/main.js';

var Ask = function(id, text){

  /*Иницилизация*/

  this._id = id;
  this.text = text;

  /*-----------------------*/
  $("#container-fluid").append('<div class="ask" id="ask-' + id + '"><div id="ask-end" class="bCircle circle"></div>'+text+'<div id="ask-start" class="nCircle circle"></div></div>');

  //Линии которые нужно перерысовать

  /*------События----------*/

  var offsetMouse = false;

  var lines = [];

  this.addLine = function(line){
    lines.push(line);
  }

  $(".ask").mousedown(function(e){
    offsetMouse = {x : e.pageX - $(e.target).offset().left, y : e.pageY - $(e.target).offset().top}
  });

  $(".ask").mouseup(function(e){
    offsetMouse = false;
  });

  $(".ask").mousemove(function(e){   
    if(offsetMouse){
      for(i = 0; i < lines.length; i++){
        lines[i].move();
      }
      $(this).css("left", e.pageX - offsetMouse.x);
      $(this).css("top", e.pageY - offsetMouse.y - offsetContainerY);
    }
  });
}

Template.editorNotLinear.onRendered(function(){
  this._editor = new Editor();
});

Template.editorNotLinear.onCreated(function(){
  this.addOption = new ReactiveVar(false);
});

Template.editorNotLinear.helpers({
  addOption : function(){
    return Template.instance().addOption.get();
  }
});

Template.editorNotLinear.events({
  'click #addAsk' : function(e, t){
    t.addOption.set(!t.addOption.get());
  },
  'click .circle' : function(e, t){
    t._editor.clickCircle(e);
  },
  'submit #askForm' : function(e, t){
    e.preventDefault();
    t._editor.addAsk(e.target.askText.value);
    t.addOption.set(false);
  }
});

var lines = [];
var asks = [];

var Editor = function(){
  
  stage = null;
  layer = null;
  
  offsetContainerY = $("#container").offset().top;

  stage = new Konva.Stage({
    container: "container",
    width: $(document).width(),
    height : $(document).height() -  offsetContainerY
  });

  layer = new Konva.Layer();

  

  i = 0;
  
  /*События*/

  this.addAsk = function(text){
    asks.push(new Ask(i, text)); 
    i++;
  }


  /*-----------*/

  clicked = {start : {}, end : {}};
  
  /*Если дропаем елемент такой-то и такой-то, то в самой линии это можно отследить*/

  this.clickCircle = function(e){
    if(e.target.id == "startTest"){
      clicked.start.circle = e.target;
      clicked.start.ask = false;
    }
    else if(e.target.id == "endTest"){
      clicked.end.circle = e.target;
      clicked.end.ask = false;
    }
    else{
      if(e.target.id.split("-")[1] == "end"){
        clicked.end.circle = e.target;
        clicked.end.ask = e.target.parentElement;
      }
      else{
        clicked.start.circle = e.target;
        clicked.start.ask = e.target.parentElement;
      }
    }

    if(!$.isEmptyObject(clicked.start) && !$.isEmptyObject(clicked.end)){
      line = new Line(clicked.start, clicked.end);
      if(clicked.start.ask){
        asks[clicked.start.ask.id.split("-")[1]].addLine(line);
      }
      if(clicked.end.ask){
        asks[clicked.end.ask.id.split("-")[1]].addLine(line);
      }
      clicked = {start : {}, end : {}};
    }

  }
}



var Line = function(start, end){
  var start = start;
  var end = end;

  offsetStart = $(start.circle).offset();
  offsetEnd = $(end.circle).offset();

  offsetEnd.top -= offsetContainerY;
  offsetStart.top -= offsetContainerY;

  var line = new Konva.Line({
    points: [offsetStart.left + 10 , offsetStart.top + 10, offsetEnd.left + 10, offsetEnd.top + 10],
    stroke: 'red',
    strokeWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
  });

  layer.add(line);
  stage.add(layer);

  this.move = function(){
    /*console.log("Перемещение");
    console.log(line);
    console.log(start, end);*/
    offsetStart = $(start.circle).offset();
    offsetEnd = $(end.circle).offset();

    offsetEnd.top -= offsetContainerY;
    offsetStart.top -= offsetContainerY;

    /*Konva.Tween({
        node: line,
        duration: 0.0000001,
        points: [offsetStart.left + 10 , offsetStart.top + 10, offsetEnd.left + 10, offsetEnd.top + 10]
    }).play();*/
     var tween = new Konva.Tween({
        node: line,
        duration: 0.001,
        points: [offsetStart.left + 10 , offsetStart.top + 10, offsetEnd.left + 10, offsetEnd.top + 10]
    });

    tween.play();
  }
}