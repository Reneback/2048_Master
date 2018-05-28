// US 2048 //

console.log ("Sketch.js Loaded !");



let grid;
let score = 0;
let keepplay = 0;
let gridsize = 0;
let divsize = 100;



var gamesize4 = document.querySelector('#size4');
var gamesize5 = document.querySelector('#size5');
var gamesize6 = document.querySelector('#size6');


let ColorsAndSizes = {

	"2" : {

		size: 64,
		color: '#FF3366'
	},

	"4" : {

		size: 64,
		color: '#6699FF'
	},

	"8" : {

		size: 64,
		color: "#66CC33"
	},

	"16" : {

		size: 64,
		color: "#CC9933"
	},

	"32" : {

		size: 64,
		color: "#6633CC"
	},

	"64" : {

		size: 64,
		color: "#FF9900"
	},

	"128" : {

		size: 50,
		color: "#FF00FF"
	},

	"256" : {

		size: 50,
		color: "#0066CC"
	},

	"512" : {

		size: 50,
		color: "#CCCCFF"
	},

	"1024" : {

		size: 40,
		color: "#663300"
	},

	"2048" : {

		size: 40,
		color: "#CCFF00"
	},

	"4096" : {

		size: 40,
		color: "#CCFF00"
	},

	"8192" : {

		size: 40,
		color: "#CCFF00"
	},

	"16384" : {

		size: 40,
		color: "#CCFF00"
	},


}



function isGameWon () {

for (let i=0; i < gridsize; i++) {

	for (let j=0; j < gridsize; j++) {

		if ((grid[i][j] == 2048) && (keepplay==0)) {

			return true;
		
			}
		}
	}

	return false;

}

function isGameOver () {

for (let i=0; i < gridsize; i++) {

	for (let j=0; j < gridsize; j++) {

		if (grid[i][j] == 0) {

			return false;
		}

		if ( i !== gridsize-1 && grid[i][j] === grid[i+1][j]) {

		return false;

		}


		if (j !==gridsize-1 && grid[i][j] === grid[i][j+1]) {

		return false;

			}
		}
	
	}

	return true;

}


function blankGrid () {

return [

[0,0,0,0,0,0],
[0,0,0,0,0,0],
[0,0,0,0,0,0],
[0,0,0,0,0,0],
[0,0,0,0,0,0],
[0,0,0,0,0,0]

];

}



function reload () {

	keepplay=0;
	score = 0;
	grid = blankGrid ();
	AddNumber();
	AddNumber();
	updateCanvas();

}


function setup() {

createCanvas(600, 600);
noLoop();

}




function AddNumber() {

let options = [];

for (let i=0; i < gridsize; i++) {
	for (let j=0; j < gridsize; j++) {

			if (grid[i][j] === 0) {

				options.push({x:i, y:j});
			}

		}

	}

if (options.length > 0) {

let spot = random(options);
let r = random(1);
grid[spot.x][spot.y] = r > 0.1 ? 2 : 4;


}

}



function operate(row) {
	row = slide(row);
	row = combine(row);
	row = slide(row);
	return row; 
}



function CopyGrid(grid) {

let extra = blankGrid ();

for (let i=0; i < gridsize; i++) {
	for (let j=0; j < gridsize; j++) {

	extra[i][j] = grid[i][j];

		}

	}

	return extra;
}


function Compare (a,b) {



for (let i=0; i < gridsize; i++) {
	for (let j=0; j < gridsize; j++) {

	if (a[i][j] !== b[i][j]  ){

		return true;

			}
		}

	}

 return false;

}



function flipGrid(grid) {

	for (let i=0; i < gridsize; i++) {

		grid[i].reverse();

	}
	return grid;
}


function rotateGrid(grid) {

let newGrid = blankGrid();

for (let i=0; i < gridsize; i++) {

	for (let j=0; j < gridsize; j++) {

		newGrid[i][j] = grid[j][i];

		}
	}

	return newGrid;
}




function keyPressed () {


console.log(keyCode);

let flipped = false;
let rotated = false;
let played = true;

if (keyCode === 82) {

	reload ();
}


if (keyCode === DOWN_ARROW) {

 
} else if (keyCode === UP_ARROW) {

	grid = flipGrid(grid);
	flipped = true;

} else if (keyCode === RIGHT_ARROW) {

	grid = rotateGrid(grid);
	rotated = true;

} else if (keyCode === LEFT_ARROW) {

	grid=rotateGrid(grid);
	grid=flipGrid(grid);
	rotated = true;
	flipped = true;


} else {

	played = false;
}

if (played) {


let past = CopyGrid(grid);

for (let i = 0; i < gridsize; i++) {

	grid[i] = operate(grid[i]);

}

let changed = Compare(past,grid);

if (flipped) {

	grid = flipGrid(grid);

}

if (rotated) {

grid = rotateGrid(grid);
grid = rotateGrid(grid);
grid = rotateGrid(grid);

}	


if (changed) {

	AddNumber();
			
		}

	updateCanvas();

	let gameover = isGameOver();

	if (gameover) {

		console.log ("GAME OVER !!");
		alert("YOU LOSE !!");
		reload ();

		}

	let gamewon = isGameWon  (); 

	if (gamewon)  {

		keepplay=1;
		console.log ("YOU WIN !!");
		choice();

		}

	}
}
 



function slide(row) {

	let arr = row.filter (val => val);
	let missing = gridsize - arr.length;
	let zeros = Array(missing).fill(0);
	arr = zeros.concat(arr);
	return arr;

}




function combine(row) {

	for (let i=gridsize-1; i>=1; i--) {
		let a = row[i];
		let b = row[i-1];

	if (a == b) {

		row[i]= a + b;
		score += row[i];
		row[i-1]= 0;
		 

		}

	}


	return row;
}





function GridDraw () {

	let w = divsize;
for (let i=0; i < gridsize; i++) {
	for (let j=0; j < gridsize; j++) {
		noFill();
		strokeWeight(10);
		let val = grid[i][j];
		let s = val.toString();

		if (val !== 0) {
		stroke('silver');
		fill(ColorsAndSizes[s].color);


		} else  { 

		stroke('silver');
		noFill();

	

	}
		rect(i*w, j*w, w, w, 25, 25);


		if (grid[i][j] !== 0) {
			textAlign(CENTER, CENTER);
			textSize(ColorsAndSizes[s].size);
			fill('white');
			noStroke();
			text(val, i* w + w / 2, j * w + w / 2);



			}

		}
	}
}


function updateCanvas() {


background('#415A65'); //'#415A65'
GridDraw();
select('#score').html(score);


}


function choice() {


   
    if (confirm("Génial ! Vous avez atteinds 2048 ! Voulez-vous continuer ?")) {




    } else {

        reload();


    }

}



gamesize4.addEventListener("click", function(){

gridsize = 4;
reload();

});

gamesize5.addEventListener("click", function(){

gridsize = 5;
reload();

});

gamesize6.addEventListener("click", function(){

gridsize = 6;
reload();

});



