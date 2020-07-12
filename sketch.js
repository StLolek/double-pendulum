let r1 = 100;
let r2 = 100;
let m1 = 20;
let m2 = 20;
let a1 = 1.4;
let a2 = 0;
let av1 = 0;
let av2 = 0;
let g = 9.81;
let t, h = 0.5, k1x1, k1x2, k1v1, k1v2, k2x1, k2x2, k2v1, k2v2, k3x1, k3x2, k3v1, k3v2, k4x1, k4x2, k4v1, k4v2, x1, x2, y1, y2;
let buttonCheck;
let loopCheck;
let bufferCheck = true;
let restartCheck = true;
let s1Input, s2Input, r1Input, r2Input, m1Input, m2Input, gInput, gSelect,Select;
let slider;
let px2 = -1;
let py2 = -1;
let cx, cy;
let buffer;
let counter = 0;
let type = 'line' ;


function fx1(t, a1, a2, av1, av2) {

    return av1;
}

function fv1(t, a1, a2, av1, av2) {

    return ((-g * (2.0 * m1 + m2) * sin(a1) - m2 * g * sin(a1 - 2.0 * a2) - 2.0 * sin(a1 - a2) * m2 * (sq(av2) * r2 + sq(av1) * r1 * cos(a1 - a2))) / (r1 * (2.0 * m1 + m2 - m2 * cos(2.0 * a1 - 2.0 * a2))));
}

function fx2(t, a1, a2, av1, av2) {

    return av2;
}

function fv2(t, a1, a2, av1, av2) {

    return ((2.0 * sin(a1 - a2) * (sq(av1) * r1 * (m1 + m2) + g * (m1 + m2) * cos(a1) + sq(av2) * r2 * m2 * cos(a1 - a2))) / (r2 * (2.0 * m1 + m2 - m2 * cos(2.0 * a1 - 2.0 * a2))));
}


function setup() {
    frameRate(30);
    createCanvas(800, 600);

    loopCheck = false;
    restartCheck = true;
    noLoop();
    pixelDensity(1);
    cx = width / 2;
    cy = 200;
    buffer = createGraphics(width, height);
    buffer.background(255);
    buffer.translate(cx, cy);

    buttonCheck = createButton('Start/Stop');
    buttonCheck.mousePressed(startstop);
    buttonCheck = createButton('Restart');
    buttonCheck.mousePressed(setter);
    buttonCheck = createButton('Wyczyść');
    buttonCheck.mousePressed(clearing);

    createElement('h4', 'Przyspieszenie ziemskie \(m/s^2\)');

    gSelect = createSelect();
    gSelect.option('Ziemia (9.81)');
    gSelect.option('Księżyc (1.62)');
    gSelect.option('Merkury (3.7)');
    gSelect.option('Wenus/Uran (8.87)');
    gSelect.option('Mars (3.711)');
    gSelect.option('Saturn (10.44)');
    gSelect.option('Neptun (11.15)');
    gSelect.option('Jowisz (24.79)');
    gSelect.changed(gSelEvent)
    createElement('h4', 'Kąt pierwszej belki w stopniach');
    s1Input = createInput('30');
    createElement('h4', 'Kąt drugiej belki w stopniach');
    s2Input = createInput('60');
    createElement('h4', 'Długość ramienia pierwszej belki');
    r1Input = createInput('100');
    createElement('h4', 'Długość ramienia drugiej belki');
    r2Input = createInput('100');
    createElement('h4', 'Masa pierwszej kulki');
    m1Input = createInput('10');
    createElement('h4', 'Masa drugiej kulki');
    m2Input = createInput('10');
    createElement('h4', 'Opory \(na prawo brak oporów, na lewo maksymalne opory\) ');
    slider = createSlider(0.990, 1, 1, 0.0001);
    slider.style('background-color','#000000');
    Select = createSelect();
    Select.option('Linia');
    Select.option('Kropki');
    Select.changed(SelectEvent);
    setter();
}
function SelectEvent() {
    if(Select.value() == 'Linia')
    {
        type = 'line';
    }
    else if(Select.value() == 'Kropki'){
        type = 'point';
    }

}
function gSelEvent() {

}
function setter() {
    restartCheck = true;
    loopCheck = false;
    bufferCheck = true;
    if(gSelect.value() == 'Ziemia (9.81)')
    {
        g=9.81;
    }
    else if(gSelect.value() == 'Księżyc (1.62)')
    {
        g=1.62;
    }
    else if(gSelect.value() == 'Merkury (3.7)')
    {
        g=3.7;
    }
    else if(gSelect.value() == 'Wenus/Uran (8.87)')
    {
        g=8.87;
    }
    else if(gSelect.value() == 'Mars (3.711)')
    {
        g=3.711;
    }
    else if(gSelect.value() == 'Saturn (10.44)')
    {
        g=10.44;
    }
    else if(gSelect.value() == 'Neptun (11.15)')
    {
        g=11.15;
    }
    else if(gSelect.value() == 'Jowisz (24.79)')
    {
        g=24.79;
    }
    r1 = r1Input.value();
    r2 = r2Input.value();
    m1 = int(m1Input.value());
    m2 = int(m2Input.value());
    s1 = int(s1Input.value());
    s2 = int(s2Input.value());
    av1 = 0.0;
    av2 = 0.0;
    a1 = s1 * PI / 180;
    a2 = s2 * PI / 180;
    if(loopCheck == true)
    {
        buffer.clear();
        noLoop();
    }
    else if(loopCheck == false)
    {
        loop();
        buffer.clear();
        noLoop();
    }
}

function draw() {
    background(255);
    imageMode(CORNER);
    image(buffer, 0, 0, width, height);


    k1x1 = fv1(t, a1, a2, av1, av2);

    k1x2 = fx1(t, a1, a2, av1, av2);

    k1v1 = fv2(t, a1, a2, av1, av2);

    k1v2 = fx2(t, a1, a2, av1, av2);



    k2x1 = fv1((t + h / 2), (a1 + k1x2 * h / 2), (a2 + k1v2 * h / 2), (av1 + k1x1 * h / 2), (av2 + k1v1 * h / 2));

    k2x2 = fx1((t + h / 2), (a1 + k1x2 * h / 2), (a2 + k1v2 * h / 2), (av1 + k1x1 * h / 2), (av2 + k1v1 * h / 2));

    k2v1 = fv2((t + h / 2), (a1 + k1x2 * h / 2), (a2 + k1v2 * h / 2), (av1 + k1x1 * h / 2), (av2 + k1v1 * h / 2));

    k2v2 = fx2((t + h / 2), (a1 + k1x2 * h / 2), (a2 + k1v2 * h / 2), (av1 + k1x1 * h / 2), (av2 + k1v1 * h / 2));



    k3x1 = fv1((t + h / 2), (a1 + k2x2 * h / 2), (a2 + k2v2 * h / 2), (av1 + k2x1 * h / 2), (av2 + k2v1 * h / 2));

    k3x2 = fx1((t + h / 2), (a1 + k2x2 * h / 2), (a2 + k2v2 * h / 2), (av1 + k2x1 * h / 2), (av2 + k2v1 * h / 2));

    k3v1 = fv2((t + h / 2), (a1 + k2x2 * h / 2), (a2 + k2v2 * h / 2), (av1 + k2x1 * h / 2), (av2 + k2v1 * h / 2));

    k3v2 = fx2((t + h / 2), (a1 + k2x2 * h / 2), (a2 + k2v2 * h / 2), (av1 + k2x1 * h / 2), (av2 + k2v1 * h / 2));



    k4x1 = fv1((t + h), (a1 + k3x2 * h), (a2 + k3v2 * h), (av1 + k3x1 * h), (av2 + k3v1 * h));

    k4x2 = fx1((t + h), (a1 + k3x2 * h), (a2 + k3v2 * h), (av1 + k3x1 * h), (av2 + k3v1 * h));

    k4v1 = fv2((t + h), (a1 + k3x2 * h), (a2 + k3v2 * h), (av1 + k3x1 * h), (av2 + k3v1 * h));

    k4v2 = fx2((t + h), (a1 + k3x2 * h), (a2 + k3v2 * h), (av1 + k3x1 * h), (av2 + k3v1 * h));



    av1 = av1 + (k1x1 + k2x1 * 2 + k3x1 * 2 + k4x1) / 6.0 * h;

    a1 = a1 + (k1x2 + k2x2 * 2 + k3x2 * 2 + k4x2) / 6.0 * h;

    av2 = av2 + (k1v1 + k2v1 * 2 + k3v1 * 2 + k4v1) / 6.0 * h;

    a2 = a2 + (k1v2 + k2v2 * 2 + k3v2 * 2 + k4v2) / 6.0 * h;


    let x1 = r1 * sin(a1);

    let x2 = x1 + r2 * sin(a2);

    let y1 = r1 * cos(a1);

    let y2 = y1 + r2 * cos(a2);

    av1*= slider.value();
    av2*= slider.value();

    translate(width / 2, 200);
    stroke(0);
    strokeWeight(2);


    line(0, 0, x1, y1);
    fill(255);
    ellipse(x1, y1, m1, m1);

    line(x1, y1, x2, y2);
    fill(255);
    ellipse(x2, y2, m2, m2);
    counter++;
    if (counter == 600) {
        counter = 0;
        buffer.stroke(random(100,200));
        buffer.strokeWeight(4);
    }

    if (bufferCheck == true) {
        if(type == 'line') {
            buffer.line(px2, py2, x2, y2);
        }
        else if (type == 'point') {
            buffer.point(x2,y2);
        }
    }

    px2 = x2;
    py2 = y2;
}

function clearing() {
    buffer.clear();
}

function startstop() {
    if (loopCheck == false) {
        if (restartCheck == true) {
            restartCheck = false;
            buffer.clear();
        }
        counter = 0;
        buffercheck = false;
        loopCheck = true;
        loop();
    } else if (loopCheck == true) {

        bufferCheck = true;
        loopCheck = false;
        noLoop();

    }
}