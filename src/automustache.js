var automustache = function() {
	var canvas = document.createElement('canvas');
	canvas.className = this.className;
	canvas.style.cssText = this.style.cssText;
	canvas.width = this.width;
	canvas.height = this.height;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(this, 0, 0);
	this.parentNode.replaceChild(canvas, this);
	var d = ccv.detect_objects({canvas:ccv.grayscale(ccv.pre(this)),cascade:cascade,interval:5,min_neighbors:1});
	var img = new Image;
	img.src = mustache;
	img.onload = function(){
		for (var c = 0, b; b=d[c++];){
			var factor = b.width/100;
			var width = 73*factor;
			var height = 20*factor;
			ctx.drawImage(this, 0, 0, this.width, this.height, b.x + b.width / 2 - width/2, b.y +  b.height*0.75, width, height);
			ctx.strokeStyle = 'red';
		}
	};
};

window.onload = function() {
	[].slice.call(document.images).forEach(function(img){
		img.complete ? automustache.call(img) : img.onload = automustache
	});
};
