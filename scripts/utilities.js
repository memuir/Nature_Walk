
var s3 = ' Handlee';
var s7 = ' Coming Soon';
var s10 = ' Kalam';
var s11 = ' Patrick Hand';
var s17 = ' Walter Turncoat';

function drawText(text, x, y, size='24px', color=['black']) {
    //console.log("Text: " + text);
    ctx.font = size + s3;
    for (var t=0; t<text.length; t++) {
        if (t < color.length) ctx.fillStyle = color[t]; 
        ctx.textBaseline = 'top';
        if (t>0) {
            var xnew = x+ctx.measureText(text[t-1]).width
        } else {
            xnew = x;
        }
        ctx.fillText(text[t], xnew, y);
    }
    ctx.fillStyle = 'black';
}

/* Text Wrapping Tutorial
http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
*/
function drawWrappedText(text, x, y, fontSize, maxWidth, lineHeight) {
        var words = text[0].split(' ');
        var line = '';
        if (fontSize) {ctx.font = fontSize + s3;}
        else {ctx.font = '24px ' + s3;}
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            //y -= (lineHeight/2);
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, y);
      }

function toCapitalize(string) {
    var _string = string.slice(1,string.length);
    var firstChar = string[0].toUpperCase();
    firstChar = firstChar.concat(_string);
    return firstChar;
}