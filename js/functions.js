 function mapValue(value, initialRangeStart, initialRangeEnd, finalRangeStart, finalRangeEnd) {
     if (initialRangeEnd == initialRangeStart)
         console.error("Can't devide by zero");
     else {
         return (value - initialRangeStart) * (finalRangeEnd - finalRangeStart) / (initialRangeEnd - initialRangeStart) + finalRangeStart
     }
 }

 function getRandomFloat(min, max) {
     return Math.random() * (max - min) + min;
 }

 function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
 }

 function getMs(fps) {
     return 1000 / fps
 }

 function getMousePosElem(click) {
     return new Vector(click.clientX - click.target.getBoundingClientRect().x, click.clientY - click.target.getBoundingClientRect().y)
 }


 function randomHexColor() {
     return '#' + (function co(lor) {
         return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) &&
             (lor.length == 6) ? lor : co(lor);
     })('');
 }

 function componentToHex(c) {
     var hex = c.toString(16);
     return hex.length == 1 ? "0" + hex : hex;
 }

 function rgbToHex(r, g, b) {
     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
 }

 function hexToRgb(hex) {
     var bigint = parseInt(hex, 16);
     var r = (bigint >> 16) & 255;
     var g = (bigint >> 8) & 255;
     var b = bigint & 255;
     return new Color(r, g, b)
 }