import { AbstractProperties } from "app/properties/AbstractProperties";
import { MenuProperties } from "app/properties/MenuProperties";
import { AbstractGameView } from "./AbstractGameView";
import { Model, gameStates } from "app/model/Model";
import { Events } from "app/model/Events";
import { TweenLite } from "gsap";
import { Button } from "./Button";
import { Factory } from "app/Utils";

export class MenuScreen extends AbstractGameView{
    protected properties: MenuProperties;
    protected logo: PIXI.Sprite;
    protected buttons : Button[]=[];
    
    constructor(properties:AbstractProperties,model:Model, factory:Factory) {
        super(model,factory);
        this.properties = properties as MenuProperties;
        this.create(); 
    }
    private create(){
        this.alpha=0;
        this.createLogo();
        this.createButtons();
        this.addEventListeners();
    }

    protected addEventListeners(){
        this.model.app.on(Events.LOAD_MENU,this.init,this);
    }

    protected init(){
        this.logo.x = this.model.app.renderer.screen.width/2 - this.logo.width/2;
        this.logo.y = this.properties.logoOffsetY;
        for(let i=0;i<4;i++){
            this.buttons[i].x = this.model.app.renderer.screen.width/2 - this.buttons[i].width/2;
            this.buttons[i].y = this.properties.buttonsStartY + this.buttons[i].height * (i+1) + this.properties.buttonMargin;
        }
        this.fadeMenuIn();
    }

    protected createLogo(){
        this.logo = this.addChild(this.properties.logo);
        this.addChild(this.logo);
    }

    protected createButtons(){
        for(let i=0;i<4;i++){
            this.buttons[i] = this.factory.createButton();
            this.addChild(this.buttons[i]);
            if(i==3){
                this.buttons[i].initButton("EXIT",()=>{
                    window.open("http://www.google.com");
                    console.log("EXIT clicked");
                });
                this.buttons[i].getTextField().position.x += 20;
            }else{
                this.buttons[i].initButton("GAME "+(i+1),()=>{
                    console.log((i+1) +" clicked");
                    this.hideMenu();
                    this.model.app.emit(Events.LOAD_GAME, this);
                });
            }
            console.log(this.buttons[i]);
        }

    }

    protected fadeMenuIn(){
        TweenLite.to(this, this.properties.fadeInTime, {alpha:1, onComplete: this.enableButtons.bind(this)});
    }

    protected enableButtons(){
        this.buttons.forEach( el => {
            el.enable();
        });
    }

    protected hideMenu(){
        this.alpha=0;
        this.buttons.forEach( el => {
            el.disable();
        });
    }

}