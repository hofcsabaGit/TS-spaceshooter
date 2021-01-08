import { AbstractProperties } from "app/properties/AbstractProperties";
import { GameProperties } from "app/properties/GameProperties";
import { AbstractGameView } from "./AbstractGameView";
import { Model, gameStates } from "app/model/Model";
import { Events } from "app/model/Events";
import { Styles } from "src/styles/Styles";
import { SpawnerProperties, SpawnerType } from "app/properties/SpawnerProperties";
import { CollisionChecker, Spawner, Factory } from "app/Utils";
import { TweenLite } from "gsap";

export class GameScreen extends AbstractGameView{
    protected properties: GameProperties;
    protected prlxLayer_1:PIXI.Container;
    protected prlxLayer_2:PIXI.Container;
    protected player : AbstractGameView;
    protected bulletSpawner : Spawner;
    protected enemySpawner : Spawner;
    //TODO
    protected spawnInterval : any;
    protected checkInterval : any;

    constructor(properties:AbstractProperties,model:Model,factory:Factory) {
        super(model,factory);
        this.properties = properties as GameProperties;
        CollisionChecker.init();    // TODO init collider before anything / init flow should be changed a bit :(
        this.create();
    }
    private create(){
        this.alpha=0;
       this.prlxLayer_1 = this.factory.createParticleField(this.model.app,Styles.PARALLAX_STAR,this.properties.prlxSetup1);
       this.addChild(this.prlxLayer_1);
       this.prlxLayer_2 = this.factory.createParticleField(this.model.app,Styles.PARALLAX_STAR,this.properties.prlxSetup2);
       this.addChild(this.prlxLayer_2); 
       this.player = this.factory.createPlayer();
       this.addChild(this.player);
       this.player.x = 150;
       this.player.y = 300;

       this.bulletSpawner = new Spawner(new SpawnerProperties(SpawnerType.Bullet),this.factory,this);
       this.enemySpawner = new Spawner(new SpawnerProperties(SpawnerType.Enemy),this.factory,this);

       this.addEventListeners();
       this.init();
    }

    private addEventListeners(){
        this.model.app.stage.on(Events.MOUSE_MOVE, this.mouseMove, this);

        this.model.app.stage.on(Events.MOUSE_DOWN, (evt:any) => {
                if(this.model.gameState==gameStates.Game){
                    this.shootBullet(evt.data.global.x, evt.data.global.y);
                }
           });
        
        this.checkInterval = window.setInterval(CollisionChecker.checkColliders.bind(this),this.properties.collisionRefreshRate); // collision check / separate interval so we can reduce it under framerate
        this.model.app.on(Events.PLAYER_DEATH,this.clearGameView,this);
    }

    protected init(){
        this.model.gameState = gameStates.Game;
        console.log("GAME MODE");
        this.alpha=1;
        this.startGame();
    }

    private startGame(){
        this.spawnInterval = window.setInterval(this.spawnEnemy.bind(this), this.properties.spawnRate);  // spawner
    }

    private mouseMove(evt:any){
        if(this.model.gameState==gameStates.Game){
            this.player.x = evt.data.global.x;
            this.player.y = evt.data.global.y;
            this.prlxLayer_2.y = evt.data.global.y/this.properties.prlxAmount;
            // stress test
            if(this.properties.stressTest){
                this.shootBullet(evt.data.global.x, evt.data.global.y);
            }
        }
    } 

    private shootBullet(x:number,y:number){
        let bullet = this.bulletSpawner.SpawnObject();
        bullet.position.x = x;
        bullet.position.y = y;
    }

    private spawnEnemy(){
        let enemy = this.enemySpawner.SpawnObject();
        enemy.position.x = 900;
        enemy.position.y = Math.floor(Math.random()*601)//300;
    }



    private endGame(){
        this.model.gameState=gameStates.Menu;
        this.model.app.emit(Events.LOAD_MENU);
        this.destroy();
    }

    private clearGameView(){
        let myStage=this;
               window.clearInterval(this.spawnInterval);
               window.clearInterval(this.checkInterval);
               this.model.app.stage.off(Events.MOUSE_MOVE, this.mouseMove);
               this.removeChildren();
               this.removeAllListeners();
               this.endGame();
    }

}