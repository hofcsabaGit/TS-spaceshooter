import { AbstractProperties } from "./AbstractProperties";
import { Styles } from "src/styles/Styles";

export class SplashProperties extends AbstractProperties{
    public splash:PIXI.Sprite;
    public timeout:number;
    public tweenTime:number;

    constructor(){
        super();
        this.create();
    }
    public create(){
        this.splash= new PIXI.Sprite(PIXI.Texture.from(Styles.SPLASH));
        this.timeout=4000;
        this.tweenTime=1;
    }
    
}