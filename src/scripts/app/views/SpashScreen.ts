import { AbstractProperties } from "app/properties/AbstractProperties";
import { SplashProperties } from "app/properties/SplashProperties";
import { AbstractGameView } from "./AbstractGameView";
import { Model, gameStates } from "app/model/Model";
import { TweenLite } from "gsap";
import { Events } from "app/model/Events";
import { Factory } from "app/Utils";

export class SplashScreen extends AbstractGameView{
    protected properties: SplashProperties;
    protected splash: PIXI.Sprite;
    constructor(properties:AbstractProperties,model:Model,factory:Factory) {
        super(model,factory);
        this.properties = properties as SplashProperties;
        this.create(); 
    }
    private create(){
        this.alpha=0;
        this.splash = this.addChild(this.properties.splash);
    }

    public init(){
        this.fadeSplashIn();
    }

    protected addEventListeners(){

    }

    protected fadeSplashIn(){
        let pos:PIXI.Point=new PIXI.Point(this.model.app.renderer.screen.width/2  - this.width/2, this.model.app.renderer.screen.height/2 - this.height/2);
        this.position = pos;
        TweenLite.to(this, this.properties.tweenTime, {alpha:1, complete: this.fadeSplashOut()});
    }

    protected fadeSplashOut(){
        this.model.gameState = gameStates.Menu;
        TweenLite.to(this, this.properties.tweenTime, {alpha:0, delay:2, onComplete: this.loadMenu.bind(this)});
    }

    protected loadMenu(){
        this.model.app.emit(Events.LOAD_MENU, this);
    }

}