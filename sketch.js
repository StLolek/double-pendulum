let r1, r2, m1, m2, s1, s2, av1, av2, aa1, aa2, g, a1, a2;
let buttonCheck;
let loopCheck;
let bufferCheck = true;
let s1Input, s2Input, r1Input, r2Input, m1Input, m2Input, gInput;
let slider;
let px2 = -1;
let py2 = -1;
let cx, cy;
let buffer;
let counter = 0;

function setup() {
    frameRate(240);
    createCanvas(800, 600);
    loopCheck = false;
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

    createElement('h4', 'Przyspieszenie ziemskie \(kropka jako przecinek\)');
    gInput = createInput('9.81');
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
    slider = createSlider(0.990, 1, 1, 0.0005);
    setter();
}

function setter() {
    loopCheck = false;
    bufferCheck = true;
    g = gInput.value() * 0.1;
    r1 = r1Input.value();
    r2 = r2Input.value();
    m1 = m1Input.value();
    m2 = m2Input.value();
    s1 = s1Input.value();
    s2 = s2Input.value();
    av1 = 0.0;
    av2 = 0.0;
    aa1 = 0.0;
    aa2 = 0.0;
    a1 = s1 * PI / 180;
    a2 = s2 * PI / 180;
    loop();
    buffer.clear();
    noLoop();
}

function draw() {
    background(255);
    imageMode(CORNER);
    image(buffer, 0, 0, width, height);

    let num1 = (-g * (2 * m1 + m2) * sin(a1));
    let num2 = (-m2 * g * sin(a1 - 2 * a2));
    let num3 = (-2 * sin(a1 - a2) * m2);
    let num4 = (sq(av2) * r2 + sq(av1) * r1 * cos(a1 - a2));
    let den = (r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2)));
    aa1 = ((num1 + num2 + (num3 * num4)) / den);

    num1 = (2 * sin(a1 - a2));
    num2 = (sq(av1) * r1 * (m1 + m2));
    num3 = (g * (m1 + m2) * cos(a1));
    num4 = (sq(av2) * r2 * m2 * cos(a1 - a2));
    den = (r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2)));
    aa2 = ((num1 * (num2 + num3 + num4)) / den);
    translate(cx, cy);
    stroke(0);
    strokeWeight(2);

    let x1 = r1 * sin(a1);
    let y1 = r1 * cos(a1);

    let x2 = x1 + r2 * sin(a2);
    let y2 = y1 + r2 * cos(a2);

    av1 += aa1;
    av2 += aa2;

    a1 += av1;
    a2 += av2;

    av1 *= slider.value();
    av2 *= slider.value();
    line(0, 0, x1, y1)
    fill(0);
    ellipse(x1, y1, 20, 20);

    line(x1, y1, x2, y2)
    fill(0);
    ellipse(x2, y2, 20, 20);
    counter++;
    if (counter == 1000) {
        counter = 0;
        buffer.stroke(random(255), random(255), random(255));
    }
    buffer.strokeWeight(2);
    if (bufferCheck == true) {
        buffer.line(px2, py2, x2, y2);
    }

    px2 = x2;
    py2 = y2;
}

function clearing() {
    buffer.clear();
}

function startstop() {
    if (loopCheck == false) {
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