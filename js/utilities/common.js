const RADIANS_360_DEGREES_POSITIVE = 2 * Math.PI;
const RADIANS_270_DEGREES_NEGATIVE = -Math.PI * 3 / 2;
const RADIANS_240_DEGREES_NEGATIVE = -Math.PI * 4 / 3;
const RADIANS_180_DEGREES_NEGATIVE = -Math.PI;
const RADIANS_120_DEGREES_NEGATIVE = -Math.PI * 2 / 3;
const RADIANS_90_DEGREES_NEGATIVE = -Math.PI / 2;
const RADIANS_45_DEGREES_POSITIVE = Math.PI / 4;
const RADIANS_0_DEGREES = 0
const VISION_CONE_DOTPRODUCT = 0.707; // Plus/Minus 45 degrees for a 90 degree slice

//Calculates a point in world space from a center when rotated by an angle.
function getRotatedPoint(centerX, centerY, pX, pY, angle) {
    var xLen = pX - centerX;
    var yLen = pY - centerY;
    var hypLength = Math.sqrt(xLen * xLen + yLen * yLen);
    var angleCenterToPoint = Math.atan2(yLen, xLen);

    angle += angleCenterToPoint;

    var newX = centerX + hypLength * Math.cos(angle);
    var newY = centerY + hypLength * Math.sin(angle);

    return { x: newX, y: newY }; //Return values as an object; they can be accessed as varName.x and varName.y
}

function dotProduct(x1, y1, x2, y2)
{
    return (x1 * x2 + y1 * y2);
}

function isInFrontOf(x1, y1, ang1, x2, y2)
{
	var obj1VectorX = Math.cos(ang1);
	var obj1VectorY = Math.sin(ang1);

	var vecToObj2X = x2 - x1;
	var vecToObj2Y = y2 - y1;
	var vecToObj2 = normalizeVector(vecToObj2X, vecToObj2Y);

	var dot = dotProduct(obj1VectorX, obj1VectorY, vecToObj2X, vecToObj2Y);
	return (dot > VISION_CONE_DOTPRODUCT);
}

function normalizeVector(x1, y1)
{
    var hyp = Math.sqrt(x1*x1 + y1*y1);
    var newX=x1/hyp;
    var newY=y1/hyp;

    return { x: newX, y:newY };
}

function vectorMagnitude(x, y)
{
    return Math.sqrt(x * x + y * y);
}

function dist(x1, y1, x2, y2, forComparisonOnly = false) {
    var xd = x2 - x1;
    var yd = y2 - y1;
    var dist;
    if (forComparisonOnly) {
        dist = xd * xd + yd * yd;
    } else {
        dist = Math.sqrt(xd * xd + yd * yd);
    }
    return dist;
}

//Constrain an angle between 0 and -2PI.
function constrainAngleToNegativeRange(angle) {

    angle = angle % RADIANS_360_DEGREES_POSITIVE;

    if (angle > 0)
        angle -= RADIANS_360_DEGREES_POSITIVE;

    return angle;
}

//No clamp function in Javascript?
//Takes value and returns it in range of min->max (inclusive of min and max).
function clamp(min, value, max)
{
    return Math.min(Math.max(min, value), max);
}

//Easy way to isolate specific digit.
//n is the position from right, starting at 1
//So to isolate 8 from 5872, getDigit(5872, 3)
//Taken from https://stackoverflow.com/questions/13955738/javascript-get-the-second-digit-from-a-number
function getDigit(number, n) {
    return Math.floor((number / Math.pow(10, n - 1)) % 10);
}

function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
