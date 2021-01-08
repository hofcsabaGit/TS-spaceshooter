import { AbstractProperties } from "./AbstractProperties";
import { Styles } from "src/styles/Styles";

export class ButtonProperties extends AbstractProperties{
    public button:PIXI.Sprite;
    public txtOffset:PIXI.Point;
    constructor(){
        super();
        this.create();
    }
    public create(){
        this.button= new PIXI.Sprite(PIXI.Texture.from(Styles.BUTTON));
        this.txtOffset = new PIXI.Point(60,15);
    }
    
}