import { Sitting , Running,Jumping,Falling } from "./playerStates.js"

export class Player{
   constructor(game){
    this.game=game
    this.width=100
    this.height=91.3
    this.x=0
    this.y= this.game.width - this.height - this.game.groundMargin
    this.vy=0
    this.weight=1
    this.img=document.getElementById('player')  
    this.frameX=0
    this.frameY=0
    this.maxFrame=5
    this.fps=20
    this.frameInterval=1000/this.fps
    this.frameTimer=0
    this.speed=0
    this.maxSpeed=10
    this.state=[new Sitting(this), new Running(this),new Jumping(this),new Falling(this)]
    this.currenState=this.state[0]
    this.currenState.enter()
   };
   update(input,deltaTime){
      this.currenState.handleInput(input)
      //movimiento horizontal
      this.x += this.speed 
      if(input.includes('ArrowRight')) this.speed=this.maxSpeed
      else if(input.includes('ArrowLeft'))this.speed =- this.maxSpeed
      else this.speed=0
      if(this.x<0) this.x=0
      if(this.x>this.game.width - this.width)this.x = this.game.width - this.width
      //movimiento vertical
      //if(input.includes('ArrowUp')&& this.onGround()) this.vy -= 20
      this.y += this.vy
      if(!this.onGround()) this.vy += this.weight
      else this.vy=0
      //sprite animacion 
      if(this.frameTimer > this.frameInterval){
         this.frameTimer=0
         if(this.frameX< this.maxFrame)this.frameX ++
         else this.frameX=0
      }else{
         this.frameTimer += deltaTime
      }
   }
   draw(context){
     context.drawImage(this.img,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
   }
   onGround(){
      return   this.y >= this.game.height - this.height - this.game.groundMargin
   }
   
   setState(state,speed){
      this.currenState  = this.state[state]
      this.game.speed=speed
      this.currenState.enter()
   }
}
