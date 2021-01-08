import { AbstractProperties } from "app/properties/AbstractProperties";
import { Model } from "app/model/Model";
import { Ship } from "./Ship";
import { Factory, CollisionChecker, ICollider } from "app/Utils";
import { Styles } from "src/styles/Styles";
import { Bullet } from "./Bullet";

export enum Direction {UP,DOWN};

export class Enemy extends Ship implements ICollider{
    public dirty:boolean=false;
    protected dir:Direction;
    protected ship: PIXI.Sprite;
    constructor(properties:AbstractProperties,model:Model,factory:Factory) {
        super(properties,model,factory);
        this.addEventListeners();
    }
    
    public init(){
        this.dir=Direction.DOWN;
        this.model.app.ticker.add(this.move,this);    // just another way to update
    }

    protected addEventListeners(){
        CollisionChecker.registerCollider(this);
    }

    protected move(){
        this.checkOutOfBounds();
        // LEFT / RIGHT
            if(this.visible){
                this.position.x -= 5 * this.model.app.ticker.deltaTime;     // TODO move to properties
                if(this.position.y<50){
                    this.dir=Direction.UP;
                }else if(this.position.y>550){
                    this.dir=Direction.DOWN;
                }
                //UP / DOWN
                if(this.dir==Direction.UP){
                    this.position.y += 2 * this.model.app.ticker.deltaTime;     // TODO move to properties
                }else{
                    this.position.y -= 2 * this.model.app.ticker.deltaTime;     // TODO move to properties
                }
            }
    }

    public hide(){
        this.visible=false;
        this.model.app.ticker.remove(this.move,this);
        let explosion = this.factory.createParticleField(this.model.app,Styles.EXPLOSION,Styles.EXPLOSION_EMITTER);
        this.model.app.stage.addChild(explosion);
        explosion.position.set(this.position.x,this.position.y);
        setTimeout(()=>{this.removeChild(explosion);},500);
        this.position.x = -1000;
    }

    protected checkOutOfBounds(){
        if(this.position.x<-150){
            this.hide();            // turn it off needs for the pooling
        }
    }

    public checkCollision(collider:ICollider){
        if(collider.getObject() instanceof Bullet){
            collider.getObject().hide();
            this.hide();
        }
    }

    public getObject(){
        return this;
    }

}