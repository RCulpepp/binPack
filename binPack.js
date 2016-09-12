class Bin {
	constructor(length, width){
		this.dimen = [length,width];
		this.full = false;
		//set up grid with no contents
		this.contents = [];
		//set contents based on given length, width.  Empty spaces noted by zeros
		this.grid = [];
		for(var i=0; i < length; i++){
			this.grid[i] = [];
			for (var j=0; j < width; j++){
				// j == 2 || i == 2 ? this.grid[i].push(1) : 
				this.grid[i].push(' ');
			}
		}
		this.print = function(){
			var bottom = " --";
			for(var i=0; i < this.grid.length; i++){
				var string = "|  ";
				for(var j=0; j<this.grid[i].length; j++){
					string += this.grid[i][j] + " ";	
				}
				string += "|";
				bottom += "--";
				console.log(string);
			}
			console.log(bottom);
		}
	}
}

class Box {
	constructor(length, width){
		this.length = length;
		this.width = width;
		this.directSpec = true;

	}
}

Bin.prototype.packBox = function(boxes){
	if(this.full){
		return "This container is full and will not fit any more boxes."
	} 
	//type check for given argument, return false
	var validType = true;
	if(typeof(boxes) == 'object' && boxes.width){
		//set boxes to an array for packing
		boxes = [boxes];
	} else if(!Array.isArray(boxes)){
		validType = false;
	}
	if(!validType){
		return 'Cannot pack given type.'
	} else {
		if(boxes.length == 0){
			return "No box was provided."
		} else {
			var spaces = [];
			//loop through box list
			for(var boxInd = 0; boxInd < boxes.length; boxInd++){
				//begin by trying to pack box in the bottom left corner
				console.log(boxes[boxInd])
				var match = false;
				var flipped = false;
				for(var vertInd = this.grid.length-1; vertInd >= 0 && !match; vertInd--){
					for(var horzInd = 0; horzInd < this.grid[vertInd].length && !match; horzInd++){
						//if there's nothing at this space, and the addition of the box size does not go beyond the bounds of the box
						if(vertInd - boxes[boxInd].width > 0 && horzInd + boxes[boxInd].length <= this.grid[vertInd].length && this.grid[vertInd][horzInd] == ' '){
							var isSize = true;
							for(var i = boxes[boxInd].width; i >= 0 && isSize; i--){
								for(var j = 0; j < boxes[boxInd].length && isSize; j++){
									if(this.grid[vertInd - i][horzInd + j] != 0 && !match){
										isSize = false;
									} else if(j == boxes[boxInd].length-1 && i == 0 && !match){
										i = boxes[boxInd].width-1;
										j = -1;
										match = true;
									} else if(match){
										this.grid[vertInd - i][horzInd + j] = boxInd+1;
									} 
								}
							}
						}
					}
				}
				//if the box can be rotated and there hasnt been a match yet, rotate to try and fit
				console.log(boxes[boxInd].directSpec + ' ' + match + ' ' + flipped)
				if(!boxes[boxInd].directSpec && !match && !flipped){
					[boxes[boxInd].width, boxes[boxInd].length] = [boxes[boxInd].length,boxes[boxInd].width];
					boxInd--;
					flipped = true;
				} 
				else if(!match){
					return 'Could not pack box number ' + (boxInd+1) + ' of size [' + boxes[boxInd].width + ',' + boxes[boxInd].length + ']'
				}
				this.print();
			}
		}
	} 
}



var bin = new Bin(30,30);
bin.print();
var box1 = new Box(3,3);
var box2 = new Box(10,10);
var box3 = new Box(10,10);
var box4 = new Box(5,10);
var box5 = new Box(3,18);
var box6 = new Box(2,18);
<<<<<<< HEAD
var box7 = new Box(30,30);
=======
var box7 = new Box(10,25);
box7.directSpec = false;
var box8 = new Box(40,40);
>>>>>>> finding_spaces_from_right



console.log(bin.packBox([box1,box2,box3,box4,box5,box6,box7,box8]));
bin.print()
// console.log(bin.packBox({name:'Ryan'}));
// var box2 = new Box(1,1);
// var box3 = new Box(1,1);
// var box4 = new Box(1,1);
// var box5 = new Box(1,1);
// var box6 = new Box(1,1);
// var box7 = new Box(1,1);
// var box8 = new Box(1,1);
// var box9 = new Box(1,1);
// var box10 = new Box(1,1);

// var box2 = new Box(1,5);
// var box3 = new Box(1,10);
// var box4 = new Box(2,3);
// var box5 = new Box(1,5);
// var box6 = new Box(1,10);
// var box1 = new Box(2,3);
// var box2 = new Box(1,5);
// var box3 = new Box(1,10);