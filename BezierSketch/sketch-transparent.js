/**
 * @name  decoding messages in traditional music
 * @description create a visualization for amplitude
 **/
var input, analyzer; //variable setup
var circleArr;


function noiseGate(mic)  {
  if (mic < 1){
    return 0;
  }
    return mic;
}


function setup() { //function setup
  createCanvas(windowWidth, windowHeight); //need a canvas before we can make art
    // Create an Audio input
    mic = new p5.AudioIn();

    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(noiseGate(mic));

  circleArr = [];
}

/* fucks w pitch */

function draw() { //let's draw it tho!

  //console.log(mic);
  background(255); //background color

  circleArr.push(createCircle());

  circleArr.forEach(function (circle) {
    fill(circle.color.r, circle.color.g, circle.color.b, circle.color.o); //apply rgb value to fill
    stroke(255); //keep the stroke black
    bezier(mouseX*9, circle.size.y*2, circle.size.x, circle.size.y, mouseY*9, circle.size.yRadius*9, circle.size.xRadius*1.5, circle.size.yRadius*8); //draw an ellipse with my modified volume value
  });

}

function createCircle() {
    var vol_t = analyzer.getLevel();   // Get the overall volume (between 0 and 1.0)
    var vol = vol_t*10000; //do it again so that it's hex conversion friendly
    var hexString_t = vol * 100000000; //i'm not sure why i threw this in but here we are
    var hexString_t_v = hexString_t.toString(16); //convert this to a string
    var hex = hexString_t_v.substring(0,6); //grab the first six characters

    var color_r = parseInt(hex.substring(0,2), 16);
    var color_g = parseInt(hex.substring(2,4), 16);
    var color_b = parseInt(hex.substring(4,6), 16);

    var circleX = constrain(vol%25, 0, width);
    var circleY = constrain(vol%10, 0, height);
    var circleRadius = 10+vol_t*200;
    var opacity = parseInt(50)

    return {
          color:
          {
            r: color_r,
            g: color_g,
            b: color_b,
            o: opacity
          },
          size:
          {
            x: circleX,
            y: circleY,
            xRadius: circleRadius,
            yRadius: circleRadius
          }
      };
    //color, size, position
    }
