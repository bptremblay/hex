$(function () {
  var SCALE = 0.25;
  report(' ');
  var id = 0;
  var mouseOverTarget = null;

  function setColor(e, color) {
    // #color-fill .hex {
    // fill: #eeffff;
    // display: none;
    // position: absolute;
    // }
    //
    // .wall {
    // fill: #565656;
    // }
  }

  function setScale(el, scale) {
    //el.setAttribute("transform", "scale(" + scale + " " + scale + ")");
  }

  function translate(el, h, v) {
    if (el.length) {
      el = el[0];
    }
    // el.setAttribute("transform", "translate(" + h + " " + v + ")");
  }

  function rotate(el, degrees) {
    if (el.length) {
      el = el[0];
    }
    // el.setAttribute("transform", "rotate(" + degrees + ")");
  }

  function transform(el, h, v, degrees, scale) {
    //        if (el.length) {
    //            el = el[0];
    //        }
    var xform = '';
    if (scale) {
      xform = "translate(" + h + " " + v + ") rotate(" + degrees + ") scale(" + scale + " " + scale + ")";
    } else {
      xform = "translate(" + h + " " + v + ") rotate(" + degrees + ")";
    }
    // console.log(xform);
    // el.setAttribute("transform", xform);
    el.transform(xform);
  }
  window.lastHex = null;

  function addRowItem(proto) {
    var s = Snap('#' + proto.attr('id'));
    var hex = s.select("#hexProto")
      .clone();
    var viewport = Snap('#color-fill');
    viewport.add(hex);
    //        var hex = proto.find('.hex').clone();
    //        var viewport = $('#color-fill');
    hex.attr('id', 'hex_' + (id++));
    //        viewport[0].appendChild(hex[0]);
    //hex.show();
    //        window.lastHex = hex[0];
    return hex;
  }

  function isOdd(num) {
    return num % 2;
  }

  function buildRow(proto, n, rowNum) {
    var newH = 200;
    var viewport = Snap('#prototypes');
    var hexHeight = viewport.select("#hexProto")
      .getBBox()
      .height;
    if (isOdd(rowNum)) {
      newH = newH + ((hexHeight * SCALE) / 2);
    }
    var angle = 360 / 12;
    for (var index = 0; index < n; index++) {
      var theNewEl = addRowItem(proto);
      var idStr = theNewEl.attr('id');
      theNewEl.attr('id', idStr + '_' + rowNum + '_' + index);
      var oldV = (rowNum * ((theNewEl.getBBox()
        .height * SCALE) - 9));
      transform(theNewEl, newH, oldV, angle, SCALE);
      newH = newH + (theNewEl.getBBox()
        .width);
    }
    return viewport.select('.hex');
  }
  var chosenFillColor = 'rgb(86,86,86)';
  var chosenCharacter = 'PLAYER';
  var characters = {
    'PLAYER': {
      name: 'Player',
      icon: 'icon1'
    }
  };

  function whichTool() {
    if (designMode) {
      return function (evt, el) {
        //el.addClass('wall');
        //window.el = el;
        var newColor = '';
        var fill = el[0].style.fill;
        //console.log(fill);
        fill = fill.split(' ')
          .join('');
        if (fill === 'rgb(238,255,255)' || fill === '') {
          newColor = chosenFillColor;
          //"url('#image-bg')";
        } else {
          newColor = 'rgb(238,255,255)';
        }
        // console.log(newColor);
        el[0].style.fill = newColor;
      };
    } else {
      return function (evt, el) {
        report('Add drag and drop.');
        //                //el.addClass('wall');
        //                //window.el = el;
        //                var newColor = '';
        //                var fill = el[0].style.fill;
        //                //console.log(fill);
        //                fill = fill.split(' ').join('');
        //                if (fill === 'rgb(238,255,255)' || fill === '') {
        //                    newColor = chosenFillColor;
        //                    //"url('#image-bg')";
        //                } else {
        //                    newColor = 'rgb(238,255,255)';
        //                }
        //                // console.log(newColor);
        //                // el[0].style.fill = newColor;
        //
        //                var character = characters[chosenCharacter];
        //                report('Move player "' + character.name + '" to ' + el[0].id + '.');
        //                //console.log(evt);
        //                $('#char1').css('left', (evt.clientX - 32) + 'px');
        //                $('#char1').css('top', (evt.clientY + 64) + 'px');
      };
    }
  }

  function report(msg) {
    //$("#info").text(msg);
    console.log(msg);
  }
  var designMode = false;
  $('.radio')
    .click(function () {
      if ($('#play')
        .is(':checked')) {
        designMode = false;
      } else {
        designMode = true;
      }
      report('Set design mode to ' + designMode);
    });
  $('#color-fill')
    .on("click", function (evt) {
      if (evt.target.id.indexOf('hex') !== -1) {
        report('click: ' + evt.target.id);
        var targ = $(evt.target);
        var tool = whichTool();
        if (tool) {
          tool(evt, targ);
          //saveBoard();
        }
      }
    });
  //  $('#color-fill').on("mousemove", function (evt) {
  //    //console.log(evt);
  //    if (evt.target.id.indexOf('hex') !== -1) {
  //      //var targ = $(evt.target);
  //      mouseOverTarget = $(evt.target);
  //      report('hover: ' + mouseOverTarget.attr('id'));
  //    }
  //  });
  function createEmptyBoard() {
    var prototypes = $('#prototypes');
    var viewport = $('#color-fill');
    //debugger;
    //setScale(viewport[0], 0.25);
    for (var index = 0; index < 8; index++) {
      buildRow(prototypes, 16, index);
    }
  }

  function getHexWidth() {
    var viewport = Snap('#prototypes');
    var hexWidth = viewport.select("#hexProto")
      .getBBox()
      .height - 40;
    return hexWidth * SCALE;
  }

  function drawThings() {}

  function drawCharacters() {
    //        var img = $('<img>');
    //        img.attr('src', './assets/images/icon1.png');
    //        img.attr('border', '1');
    //        img.attr('id', 'char1');
    //        img.css('position', 'absolute');
    //        img.css('left', '100px');
    //        img.css('top', '300px');
    //        img.css('width', getHexWidth() + 'px');
    //        // debugger;
    //        console.log(img.attr('src'));
    //        $('body').append(img);
    var s = Snap("#color-fill");
    var ddx = 0;
    var ddy = 0;
    var dxDone = 0;
    var dyDone = 0;
    // s.scale();
    var hexWidth = getHexWidth();
    var block = s.rect(hexWidth, hexWidth, hexWidth, hexWidth, 20, 20);
    block.attr({
      fill: "rgb(236, 240, 241)",
      stroke: "#1f2c39",
      strokeWidth: 3,
      id: 'dragblock'
    });

    /**
     * [[Description]]
     * @param {[[Type]]} snapEl [[Description]]
     * @param {[[Type]]} x      [[Description]]
     * @param {[[Type]]} y      [[Description]]
     */
    function translateLive(snapEl, x, y) {
      snapEl.transform("t" + x + ',' + y);
    }

    /**
     * [[Description]]
     * @param {[[Type]]} piece        [[Description]]
     * @param {[[Type]]} pieceOffsetX [[Description]]
     * @param {[[Type]]} pieceOffsetY [[Description]]
     * @param {object}   hex          [[Description]]
     */
    function snapPieceToBoardHex(piece, pieceOffsetX, pieceOffsetY, hex) {
      var el = $('#' + hex.node.id)[0];
      Snap(el).addClass('selected');
      var offset = hex.matrix.offset();
      var hOffset = parseFloat(offset[0], 10) - 200.0;
      var vOffset = parseFloat(offset[1], 10);
      translateLive(piece, hOffset + 131, vOffset - 32);
    }

    mouseOverTarget = null;
    block.drag(function (dx, dy, a, b, evt) {

      var el = Snap.getElementByPoint(evt.clientX, evt.clientY);
      if (el && el.node) { //&& el.node.id.indexOf('hex') !== -1
        var node = el.node,
          o,
          next = node.nextSibling,
          parent = node.parentNode,
          display = node.style.display;
        node.style.display = "none";
        o = Snap.getElementByPoint(evt.clientX, evt.clientY);
        if (o.matrix){
          mouseOverTarget = o;
        }
        node.style.display = display;
      }
      this.attr({
        transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
      });
    }, function () {
      this.data('origTransform', this.transform()
        .local);
    }, function (evt) {
      var all = Snap.selectAll('.hex');
      for (var index = 0; index < all.length; index++) {
        var node = all[index];
        node.removeClass('selected');
      }
      if (mouseOverTarget && mouseOverTarget.matrix) {
        window.setTimeout(function(){
          snapPieceToBoardHex(block, 131, -32, mouseOverTarget);
        });
      }
      else{
        console.warn('mouseOverTarget is bad', mouseOverTarget);
      }
    });
  }

  function draw() {
    //        $.ajax({
    //            url: '../hex'
    //        }).done(function (results) {
    //
    //            createEmptyBoard();
    //            //deserialize(results.hexes);
    //            drawThings();
    //            drawCharacters();
    //        });
    createEmptyBoard();
    //deserialize(results.hexes);
    drawThings();
    drawCharacters();
  }

  function deserialize(hexes) {
    var prototypes = $('#prototypes');
    //var viewport = $('#color-fill');
    //debugger;
    //setScale(viewport[0], 0.25);
    var viewport = $('#color-fill');
    for (var index = 0; index < hexes.length; index++) {
      var hexData = hexes[index];
      var theNewEl = addRowItem(prototypes);
      var idStr = hexData.id;
      theNewEl.attr('id', idStr);
      //debugger;
      //console.log(hexData.transform);
      theNewEl.transform(hexData.transform);
      //theNewEl[0].style.fill = hexData.fill;
      //theNewEl[0].st("fill", hexData.fill);
      //"transform": "translate(3700 2564) rotate(30)"
    }
  }

  function serialize() {
    var walls = $('#color-fill polygon');
    //console.log(walls);
    var result = [];
    for (var index = 0; index < walls.length; index++) {
      var wall = walls[index];
      var hex = {
        id: wall.id,
        transform: wall.getAttribute('transform'),
        //fill: 'rgb(238,255,255)'
        fill: wall.style.fill ? wall.style.fill : 'rgb(238,255,255)'
      };
      //console.log(hex);
      result.push(hex);
    }
    //console.log(JSON.stringify(result));
    var package = {
      "board": {
        "scale": 0.25,
        "clip": {
          "h": -1,
          "v": -1
        },
        "defaultColor": "#ffffff"
      },
      "hexes": result
    };
    return package;
  }

  function saveBoard() {
    var postData = serialize();
    $.ajax({
        url: '../hex',
        method: "POST",
        data: postData
      })
      .done(function (data) {
        console.log("Response " + JSON.stringify(data));
      });
  }
  $('#test')
    .on("click", function () {
      draw();
    });
  $('#save')
    .on("click", function () {
      saveBoard();
    });
  draw();
  report('Ready.');
});
