import { Model } from "./model/Model";
import { SplashScreen } from "./views/SpashScreen";
import { MenuScreen } from "./views/MenuScreen";
import { Button } from "./views/Button";
import { GameScreen } from "./views/GameScreen";
import { Player } from "./views/Player";
import { Bullet } from "./views/Bullet";
import { PixiAppWrapper } from "vendor/dacaher/pixi-app-wrapper";
import { Enemy } from "./views/Enemy";
import { EnemyProperties } from "./properties/EnemyProperties";
import { BulletProperties } from "./properties/BulletProperties";
import { SpawnerProperties, SpawnerType } from "./properties/SpawnerProperties";
import { AbstractGameView } from "./views/AbstractGameView";
import { PlayerProperties } from "./properties/PlayerProperties";
import { GameProperties } from "./properties/GameProperties";
import { ButtonProperties } from "./properties/ButtonProperties";
import { MenuProperties } from "./properties/MenuProperties";
import { SplashProperties } from "./properties/SplashProperties";

// Factory

export class Factory{
    protected model:Model;
    constructor(model:Model){
        this.model=model;    // reference for the model, for points, lives, etc.
    }

    public createSplashScreen():SplashScreen{
        return new SplashScreen(new SplashProperties(),this.model,this);
    }

    public createMenuScreen():MenuScreen{
        return new MenuScreen(new MenuProperties(),this.model,this);
    }

    public createButton():Button{
        return new Button(new ButtonProperties(),this.model,this);
    }

    public createGameScreen():GameScreen{
        return new GameScreen(new GameProperties(),this.model,this);
    }

    public createPlayer():Player{
        return new Player(new PlayerProperties(),this.model,this);
    }

    public createSpawner(spawnerType:SpawnerType,stage:AbstractGameView):Spawner{
        return new Spawner(new SpawnerProperties(spawnerType),this,stage);
    }

    public createBullet():Bullet{
        return new Bullet(new BulletProperties(),this.model,this);
    }

    public createEnemy():Enemy{
        return new Enemy(new EnemyProperties(),this.model,this);
    }
    

    public createParticleField(app:PixiAppWrapper, particleSprite:any, config:object):PIXI.Container{
        let container = new PIXI.Container; 
        let particlesContainer = new PIXI.particles.ParticleContainer();
        container.addChild(particlesContainer);

        let particlesEmitter = new PIXI.particles.Emitter(particlesContainer, particleSprite, config );

        let elapsed = Date.now();

        const update = () => {
            const now = Date.now();
            particlesEmitter.update((now - elapsed) * 0.0015);
            elapsed = now;
        };

        // Start emitting
        if (particlesEmitter) {
            particlesEmitter.emit = true;
        }

        app.ticker.add(update);

        return container;
    }
}


// MOVE TO UTILS

export class Spawner{
    protected properties:SpawnerProperties;
    protected factory:Factory;
    protected gameView:AbstractGameView;
    protected pool:Pool;

    constructor(properties:SpawnerProperties,factory:Factory,gameView:AbstractGameView){
        this.properties=properties;
        this.factory=factory;
        this.gameView=gameView as AbstractGameView;
        this.init();
    }
    protected init(){
        this.pool = new Pool(this.properties.spawnerType,this.factory,this.gameView);
    }
    public SpawnObject():Bullet | Enemy{
        return this.pool.getElement();
    }
}

export class Pool{
    protected elements:any[];
    protected type:SpawnerType;
    protected factory:Factory;
    protected gameView:AbstractGameView;
    constructor(type:SpawnerType, factory:Factory, gameView:AbstractGameView){
        this.type=type;
        this.factory=factory;
        this.gameView=gameView;
        this.elements=[];
    }

    public getElement() {
        let element : any;
            for (let i=0; i <= this.elements.length; i++) {
               if(this.elements[i] != undefined){
                if (this.elements[i].visible === false) {
                    if(this.type==SpawnerType.Bullet){
                        // LOAD BULLET
                        this.elements[i].visible=true;
                        element = this.elements[i] as Bullet;
                        element.init();
                        break;
                    }else{
                        // LOAD ENEMY
                        this.elements[i].visible=true;
                        element = this.elements[i] as Enemy;
                        element.init();
                        break;
                    }   
                }
            }else{
                if(this.type==SpawnerType.Bullet){
                    // CREATE BULLET
                    element = this.factory.createBullet() as Bullet;
                    this.elements.push(element);
                    this.gameView.addChild(element);    
                    element.init();
                    break;
                }else{
                    // CREATE ENEMY
                    element = this.factory.createEnemy() as Enemy;
                    this.elements.push(element);
                    this.gameView.addChild(element);    
                    element.init();
                    break;
                }
            }
            } 
            console.log("POOL");
            console.log(this.elements);
            return element;
        }
}

export class CollisionChecker{
    private static colliders : ICollider[] = [];
    constructor(){
    }

    public static init(){
        CollisionChecker.colliders=[];
    }

    public static registerCollider(collider:ICollider){
        if(CollisionChecker.colliders.length === 0){
            CollisionChecker.colliders[0]=collider;
        }else{
            CollisionChecker.colliders.push(collider);
        }
    }

    public static checkColliders(){

        if(CollisionChecker.colliders!=undefined){
                CollisionChecker.colliders.forEach((colA)=>{
                    CollisionChecker.colliders.forEach((colB)=>{
                        if(!colB.dirty){
                            if(BoundsUtil.isInBounds(colA.getObject(),colB.getObject())){
                                colA.checkCollision(colB);
                                colB.checkCollision(colA);
                            }
                        }
                    });
                    colA.dirty=true;
                });
            CollisionChecker.colliders.forEach((col)=>{col.dirty=false});
        }

    }
}

// collision checker

export class BoundsUtil {

    public static isInBounds(a:PIXI.Container, b:PIXI.Container):boolean {

        var ab = a.getBounds();
          var bb = b.getBounds();

        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    }

    public static globalPosition(object:PIXI.Sprite):PIXI.Point {
        return new PIXI.Point(object.worldTransform.tx, object.worldTransform.ty);
    }
}

export interface ICollider{
    dirty:boolean;
     checkCollision(collider:ICollider):void;
     getObject():any;
}
