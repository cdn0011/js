const canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 600;


const ctx = canvas.getContext('2d');


function repere() {
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);

    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);

    ctx.font = '12px roboto';
    ctx.fillStyle = '#fff';
    var rx = 280 / 4;
    var dx = 4, dy = 4;

    for (var i=-dx; i<=dx; i++) {
        if (i == 0) continue;
        ctx.fillText(i, 300 + i*rx, 320);
    }

    for (var i=-dy; i<=dy; i++) {
        if (i == 0) continue;
        ctx.fillText(i, 280, 300 + i*rx);
    }

    ctx.stroke();
    ctx.closePath();
}

function plot(ft, a, b, fillStyle = 'red') {
    var n = 100;
    var dx = (b-a) / n;
    var s = 280/4;

    ctx.strokeStyle = fillStyle;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(300 + a*s, 300 - ft(a)*s);
    for (var x = a+dx; x <= b; x+=dx) {
        ctx.lineTo(300 + x*s, 300 - ft(x)*s);
    }
    ctx.stroke();
    ctx.closePath();
}

function int_using_rectangles(ft, a, b, n) {
    var dx = (b-a) / n;
    var s = 280/4;

    ctx.beginPath();

    ctx.strokeStyle = '#FCE22A';
    ctx.lineWidth = 1;

    var y = 0, x = 0;

    for (var i=0; i<n; i++) {
        x = (a+dx*i);
        y = ft(x + dx);
        ctx.rect(300 + x*s, 300 - y*s, dx*s, y*s);
    }


    ctx.stroke();

    ctx.closePath();
    // for (var i=1; i<=n; i++) {

    // }
}

var k = 0.5;
var n = 1;

const { pow } = Math;

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    repere();

    // plot(x => Math.exp(x/2), -4, 2, '#30E3DF');

    // int_using_rectangles(x => Math.exp(x/2), -4, 2, 20);
    plot(x => pow(x, 4) + 3*pow(x, 3)+pow(x, 2)*2, -4, 4, '#30E3DF');
    int_using_rectangles(x => pow(x, 4) + 3*pow(x, 3)+pow(x, 2)*2, -2, 2, 20);

    n += 0.1;
}

animate()


// const simpson_int = (ft, a, b, n) => {
//     if (n < 2) throw new Error("n < 2");
//     var dx = (b-a)/n;
//     console.log('dx = ', dx);
//     var coeff = [4, 2];
//     var s = ft(a) + ft(b);
//     var x = a+dx;
//     for (var i=0; i<n-2; i++) {
//         x += dx;
//         s += ft(x) * coeff[i%2];
//     }
//     return s * dx/3;
// }

// console.log(simpson_int(x => Math.cos(x), 2, 10, 4000));