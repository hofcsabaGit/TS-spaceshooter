import { AbstractProperties } from "./AbstractProperties";
import { Styles } from "src/styles/Styles";

export class BulletProperties extends AbstractProperties{

    public bullet: PIXI.Sprite;
    public speed: number;

    constructor(){
        super();
        this.create();
    }
    public create(){
        this.bullet= new PIXI.Sprite(PIXI.Texture.from(Styles.BULLET));
        this.speed = 15;
    }
    
}