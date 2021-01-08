import { AbstractProperties } from "./AbstractProperties";
import { Styles } from "src/styles/Styles";

export class MenuProperties extends AbstractProperties{

    public logo: PIXI.Sprite;
    public buttonsStartY: number;
    public buttonMargin: number;
    public logoOffsetY: number;
    public fadeInTime: number;

    constructor(){
        super();
        this.create();
    }
    public create(){
        this.logo= new PIXI.Sprite(PIXI.Texture.from(Styles.LOGO));
        this.buttonsStartY=115;
        this.buttonMargin=15;
        this.logoOffsetY=35;
        this.fadeInTime=1;
    }
    
}