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
				j == 2 ? this.grid[i].push(1) : this.grid[i].push(0);
			}
		}
		this.print = function(){
			var bottom = " ----";
			for(var i=0; i < this.grid.length; i++){
				var string = "|  ";
				for(var j=0; j<this.grid[i].length; j++){
					string += this.grid[i][j] + "  ";
				}
				string += "|";
				bottom += "-----";
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
		//is it possible to rotate this box? default: true
		this.directSpec = true;

	}
}

// class emptySpace(){
// 	contructor(){
// 		this.rows = [];
// 		this.start = -1;
// 		this.stop = -1;
// 	}
// }

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
				//loop through all rows in grid array to find space equal to the box size
				for(let vertInd = 0; vertInd < this.grid.length; vertInd++){
					var nextStart = 0;
					//loop through elements in a grid row to find space
					for(let horzInd = 0; horzInd < this.grid[vertInd].length; horzInd+= nextStart+1){
						var space = {
							start: [],
							stop: null
						};
						console.log('Starting at: ' + vertInd + ', ' + horzInd);
						console.log('-----------------');
						//if the value is 0 (empty), and the horizontal and vertical point plus the length/width does not extend beyond the end of the grid
						// to be used as top left corner for search
						if(vertInd + boxes[boxInd].width <= this.grid.length && horzInd + boxes[boxInd].length <= this.grid[vertInd].length && this.grid[vertInd][horzInd] == 0){
							console.log('im here!')
							space.start = [vertInd, horzInd];
							var isSize = true;
							//loop through elements to the left of the position up to the full width of the box
							for(var i=0; i < boxes[boxInd].width; i++){
								//if the current sized search box is within the size of the given box and is completely empty
								if(isSize){
									for(var j=0; j < boxes[boxInd].length; j++){
										console.log('')
										console.log(i + ', ' + j)
										if(this.grid[vertInd + i][horzInd + j] != 0){
											isSize = false;
											if(i == 0){
												nextStart += j;
											}
										}
										if(i == boxes[boxInd].width-1 && j == boxes[boxInd].length-1){
											space.stop = [vertInd + i, horzInd + j];
											spaces.push(space);
											break;
										}
									}
								} else {
									break;
								}
							}
						}
					}
				}
			console.log(spaces);
			}
		}
	} 
}



var bin = new Bin(30,30);
bin.print();
var box1 = new Box(3,3);
bin.packBox(box1);
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