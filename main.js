import {Player} from "./player.js"
import { ImputHandler } from "./imputs.js"
import { Background } from "./backgrounds.js"
import { FlyingEnemy,GroundEnemy,ClimbingEnemy } from "./enemies.js"
window.addEventListener('load',function(){
   const canvas= this.document.getElementById('canvas1')
   const ctx = canvas.getContext('2d')
   canvas.width=500
   canvas.height=500

   class Game{
      constructor(width,height){
       this.width=width
       this.height=height
       this.groundMargin=80   
       this.speed=0
       this.backgrund= new Background(this)
       this.player= new Player(this)
       this.input= new ImputHandler()
       this.enemies=[]
       this.enemyTimer=0
       this.enemyInterval=1000
      }
      update(deltaTime){
        this.backgrund.update()
        this.player.update(this.input.keys,deltaTime)
        //HandleEnemy
        if(this.enemyTimer > this.enemyInterval){
            this.addEnemy()
            this.enemyTimer = 0
         } else {
           this.enemyTimer += deltaTime
         }
         this.enemies.forEach(enemy =>{
            enemy.update(deltaTime)
            if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy),1)
        })

      }         
     draw(context){ 
       this.backgrund.draw(context)
       this.player.draw(context)
       this.enemies.forEach(enemy =>{
          enemy.draw(context)
       })
     }       
     addEnemy(){
       this.enemies.push(new FlyingEnemy(this))
       console.log(this.enemies)
     }


   }
   
   
   const game = new Game( canvas.width, canvas.height )
   
   console.log(game)
   let lasTime=0

   function animate(timeStamp) {
      const deltaTime=timeStamp - lasTime
      lasTime=timeStamp
      ctx.clearRect(0,0,canvas.width,canvas.height)
      game.update(deltaTime) 
      game.draw(ctx)
      requestAnimationFrame(animate)
   }
   animate(0)
   

})