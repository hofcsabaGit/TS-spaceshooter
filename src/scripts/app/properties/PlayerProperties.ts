import { AbstractProperties } from "./AbstractProperties";
import { Styles } from "src/styles/Styles";
import { ShipProperties } from "./ShipProperties";

export class PlayerProperties extends ShipProperties{

    constructor(){
        super();
        this.create();
    }
    public create(){
        this.ship= new PIXI.Sprite(PIXI.Texture.from(Styles.PLAYER_SHIP));
    }
    
}