$(document).ready(function(){
    
	var can = $("#mycanvas");
	var con = can.get(0).getContext('2d');
	var canWidth = can.width();
	var canHeight = can.height(); 
	var numShapes;
	var ShapesArray;
	var Chopper ;
	var RedChopper;
	var clickDown;
	var playGame ;
	var numStones = 5;
	var stonesArray;
	var stoneImg;
	var difficultLevel = 1;
	var button = $("#reset");
	var endGame = $("#endgame"); 
	var startButton = $("#start");
	var easy = $("#easy");
	var medium = $("#medium");
	var hard = $("#hard");
	var score ;
	var targetScore = 1000;
	var shape = function(x,y,w,h,vx)
	{
		this.x = x;
		this.y = y;
		this.wi = w;
		this.he = h;
		this.vx = vx;
	}

	var Chopperobj = function(x,y,w,h,vx,vy)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.vx = vx ;
		this.vy = vy;
	};

	var stone = function(x,y,w,h,vx)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.vx = vx;
	};
	button.click(function(e){
		score = 0;
		e.preventDefault();
		startGame();
		button.hide();
	})
	startButton.click(function(e){
		e.preventDefault();
		easy.hide();
		medium.hide();
		hard.hide();
		startButton.hide();
		startGame();
        
		
	})
	easy.click(function(e){
		e.preventDefault();
		difficultLevel = 1;
	})
	medium.click(function(e){
		e.preventDefault();
		difficultLevel = 2;
	})
	hard.click(function(e){
		e.preventDefault();
		difficultLevel = 3;
	})

	$(can).mousedown(function(e){
		e.preventDefault();
		clickDown = true ;
	});

	$(can).mouseup(function(e){
		e.preventDefault();
		clickDown = false ;
	})

	function init()
	{ 
		
		con.font = "50px Verdana";
		con.fillStyle = "rgb(0,0,255)";
		con.save();
		con.fillStyle = "rgb(0,255,0)";
		con.save();
		con.font = "20px Verdana";
		con.fillStyle = "rgb(120,200,100)";
		con.save();
		con.restore();
		con.fillText("Created by : Sraban",700,450);
		con.restore();
		con.fillText("Score 1000 to win",300,200);
		con.restore();
		con.fillText("AIR ESCAPE -2",300,50);
		con.fillText("-----------------",300,100);
		button.hide();
		endGame.hide();
		playGame = false ;
		
	}

	function startGame()
	{ score = 0;
		button.hide();
		endGame.hide();
		playGame = true;
		numShapes = 100;
		if(difficultLevel == 2)
		{
			numStones = 10;
		}
		if(difficultLevel == 3)
		{
			numStones = 15;
		}

		ShapesArray = new Array() ;
		Chopper = new Image();
		Chopper.src = "chopper.png";
        RedChopper = new Chopperobj(100,100,150,150,0,0);

        stonesArray = new Array();
        stoneImg = new Image();
        stoneImg.src = "ston.png" ;


		//setting up shapes
		for(var i = 0; i<numShapes;i++)
		{
			var x  = Math.random()*canWidth;
			var y = Math.random() * canHeight;
			var w = 5;
			var h = 5;
			var vx = -4;
			ShapesArray.push(new shape(x,y,w,h,vx));

		};

		for(var j = 0;j<numStones;j++)
		{
			var x =canWidth + Math.random() *canWidth;
			var y = Math.random() * canHeight;
			var w = 80;
			var h = 60;
			var vx = -4;
			stonesArray.push(new stone(x,y,w,h,vx));
		}
		animate();
	}

	function animate()
	{
		shapesLength = ShapesArray.length;
		stoneLength = stonesArray.length;
		con.clearRect(0,0,canWidth,canHeight);
		for(var i = 0;i<shapesLength;i++)
		{
			var tempShape = ShapesArray[i];
			con.fillStyle = "#FFFFFF" ;
			con.fillRect(tempShape.x,tempShape.y,tempShape.wi,tempShape.he);
			tempShape.x += tempShape.vx;
			if(tempShape.x+tempShape.wi <0)
				{
					tempShape.x = canWidth;
					tempShape.y = Math.random() * canHeight;
					tempShape.vx = -4;

				}
		};

		for(var j = 0;j<stoneLength;j++)
		{
			var tempStone = stonesArray[j];
			con.drawImage(stoneImg,tempStone.x,tempStone.y,tempStone.w,tempStone.h);
			tempStone.x+=tempStone.vx;
			if(tempStone.x+tempStone.w < 0)
			{
					tempStone.x = canWidth + Math.random()*canWidth;
					tempStone.y = Math.random() * canHeight;
			}
			if((RedChopper.x+(RedChopper.w -45)>tempStone.x) &&
				(tempStone.x+(tempStone.w-30) > RedChopper.x)&&
				(RedChopper.y+(RedChopper.h - 115) > tempStone.y)&&
				(tempStone.y+(tempStone.h - 10) > RedChopper.y))
			{
				button.show();
				playGame = false;
			    endGame.show();

			}

		};
		score ++;
        con.font = "30px Bold Verdana";
		con.fillStyle = "#FF0000";
		con.fillText("Score :"+score,20,470);
		RedChopper.y += RedChopper.vy ;
		scoreCheck();
		con.drawImage(Chopper,RedChopper.x,RedChopper.y);
		if(clickDown)
		{
			RedChopper.vy = -2;
		}
		else
		{
			RedChopper.vy = 2; 
		};
		if(RedChopper.y < -20)
		{
			button.show();
			RedChopper.vy = 0;
			playGame = false;
			endGame.show();
		}
		if((RedChopper.y+30) > canHeight)
		{
			button.show();
			playGame = false;
			endGame.show();
			
		}
		

		if(playGame)
			{
				setTimeout(animate,33);

			};

	}

	function scoreCheck(){
		if(score == targetScore)
		{
			button.show();
			playGame = false;
			con.font = "50px Verdana";
			con.fillStyle = "rgb(0,255,0)";
			con.fillText("YOU WON",400,300);

		}
	}
		
	init();
	

	
	



});