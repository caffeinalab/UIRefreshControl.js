/**
 * UIRefreshControl.js 1.0
 * HTML5 port of Apple iOS 6 UIRefreshControl.
 * https://github.com/CaffeinaLab/UIRefreshControl.js
 *
 * Caffeina Srl (c) 2013 http://caffeinalab.com
 *
 * @author Flavio De Stefano <flavio.destefano@caffeinalab.com>
 * @author Stefano Azzolini <stefano.azzolini@caffeinalab.com>
 */

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name UIRefreshControl.min.js
// ==/ClosureCompiler==

window["UIRefreshControl"] = function(canvas_id, args){
	var
	self = this,
	canvas = document.getElementById(canvas_id),
	gd = canvas.getContext("2d"),
	w = canvas.width,
	h = canvas.height,
	w2 = w >> 1,
	image = new Image(),
	opt = {
		circleUpScale :		0.8,
		circleDownScale :	0.2,
		easingFactor :		1,
		innerX :		0.5,
		background :		"#9BA2AC",
		foreground :		"#888",
		image :			'data:image/png;base64,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'
	};

	if(args) for(var k in args) if(opt[k]) opt[k] = args[k];

	image.src = opt.image;

	gd.fillStyle = opt.background;
	gd.strokeStyle = opt.foreground;

	self.easingCircle = function(x, scale) {
		return w2 *( 1 + (scale - 1) * Math.pow(x,opt.easingFactor));
	};

	self.drawBezier = function(p) {
		gd.bezierCurveTo(
			p[0], p[1],
			p[2], p[3],
			p[4], p[5]
		);
	};

	self.drawArc = function(x, y, r, clockwise) {
		var r2 = r * 2.0,
		xo = r2 * 0.05,
		yo = (clockwise ? -r*1.33334 : r*1.33334);
		a = (clockwise ? xo : -xo),
		b = y + yo,
		c = (x - r),
		d = (clockwise ? r2 : 0),
		e = (clockwise ? 0 : r2);
		self.drawBezier([c + e + a, b, c + d - a, b, c + d, y]);
	};

	self["draw"] = function(s) {
		var circleUpRadius = self.easingCircle(s, opt.circleUpScale),
		circleUp = {
			x : w2,
			y : circleUpRadius,
			r : circleUpRadius
		},
		circleDownRadius = self.easingCircle(s, opt.circleDownScale),
		circleDown = {
			x : w2,
			y : circleUp.y + s * (h - circleUp.y - circleDownRadius),
			r : circleDownRadius
		},
		circleDistances = {
			x : (circleUp.r - circleDown.r),
			y : (circleDown.y - circleUp.y)
		},
		pointControl1 = {
			xr:circleUp.x + circleUp.r,
			xl:circleUp.x - circleUp.r,
			y:circleUp.y + circleDistances.y * 0.1
		},
		pointControl2 = {
			xr:circleDown.x + circleDown.r,
			xl:circleDown.x - circleDown.r,
			y:circleDown.y - circleDistances.y * 0.5
		},
		imageSize = circleUp.r * 1.2,
		imageSize2 = imageSize * 0.5;

		gd.clearRect (0,0,w,h);
		gd.beginPath();
		gd.moveTo(circleUp.x - circleUp.r, circleUp.y);

		self.drawArc(circleUp.x, circleUp.y, circleUp.r, true);

		self.drawBezier([
			pointControl1.xr, pointControl1.y,
			pointControl2.xr, pointControl2.y,
			circleDown.x + circleDown.r, circleDown.y
		]);

		self.drawArc(circleDown.x, circleDown.y, circleDown.r, false);

		self.drawBezier([
			pointControl2.xl, pointControl2.y,
			pointControl1.xl, pointControl1.y,
			circleUp.x - circleUp.r, circleUp.y
		]);

		gd.closePath();

		gd.fill();
		gd.stroke();

		gd.drawImage(image, 0,0, image.width,image.height, circleUp.x - imageSize2, circleUp.y - imageSize2, imageSize, imageSize);

	};

};
