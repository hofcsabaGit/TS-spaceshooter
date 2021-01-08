import { AbstractProperties } from "app/properties/AbstractProperties";
import { BulletProperties } from "app/properties/BulletProperties";
import { AbstractGameView } from "./AbstractGameView";
import { Model } from "app/model/Model";
import { Enemy } from "./Enemy";
import { Factory, CollisionChecker, ICollider } from "app/Utils";

export class Bullet extends AbstractGameView implements ICollider{
    public dirty:boolean=false;
    protected properties: BulletProperties;
    protected bullet: PIXI.Sprite;
    protected moveInterval: any;
    
    constructor(properties:AbstractProperties,model:Model,factory:Factory) {
        super(model,factory);
        this.properties = properties as BulletProperties;
        this.create(); 
    }
    private create(){
        this.bullet = this.addChild(this.properties.bullet);
        this.bullet.anchor.set(0.5, 0.5);
        this.bullet.scale.set(0.25,0.25);
        this.addEventListeners();
        this.init();
    }

    public init(){
        this.moveInterval = window.setInterval(this.move.bind(this), 30);  // oldschool way to update better for optimalization
    }

    protected addEventListeners(){
        CollisionChecker.registerCollider(this);
    }

    protected move(){
        this.checkOutOfBounds();
        if(this.visible){
        this.position.x += this.properties.speed * this.model.app.ticker.deltaTime;
        }
    }

    public hide(){
        this.visible=false;
        this.position.x = 1000;
        window.clearInterval(this.moveInterval);
    }

    protected checkOutOfBounds(){
        if(this.position.x>900){
            this.hide();
        }
    }

    public checkCollision(collider:ICollider){
    }

    public getObject(){
        return this;
    }


}