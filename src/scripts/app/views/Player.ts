import { AbstractProperties } from "app/properties/AbstractProperties";
import { Model } from "app/model/Model";
import { Ship } from "./Ship";
import { Events } from "app/model/Events";
import { Styles } from "src/styles/Styles";
import { Factory, CollisionChecker, ICollider } from "app/Utils";
import { Enemy } from "./Enemy";

export class Player extends Ship implements CollisionChecker{
    public dirty:boolean = false;
    protected ship: PIXI.Sprite;
    constructor(properties:AbstractProperties,model:Model,factory:Factory) {
        super(properties,model,factory);
        this.addEnetlisteners();
    }

    public addEnetlisteners(){
        CollisionChecker.registerCollider(this);
    }

    public hide(){
        this.visible=false;
        console.log("PLAYER GOT HIT");
        this.explode();
    }

    protected explode(){
        let explosion = this.factory.createParticleField(this.model.app,Styles.EXPLOSION,Styles.EXPLOSION_EMITTER);
        this.model.app.stage.addChild(explosion);
        explosion.position.set(this.position.x,this.position.y);
        window.setTimeout(()=>{this.removeChild(explosion);},500);
        window.setTimeout(this.kill.bind(this),500);     
    }

    protected kill(){
        this.model.app.emit(Events.PLAYER_DEATH);
        this.destroy();
    }

    public checkCollision(collider:ICollider){
        if(collider.getObject() instanceof Enemy){
            console.log(collider.getObject());
            collider.getObject().hide();
            this.hide();
        }
    }

    public getObject(){
        return this;
    }
}