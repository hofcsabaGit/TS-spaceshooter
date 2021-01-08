import { AbstractProperties } from "app/properties/AbstractProperties";
import { AbstractGameView } from "./AbstractGameView";
import { Model } from "app/model/Model";
import { ShipProperties } from "app/properties/ShipProperties";
import { Factory } from "app/Utils";

export class Ship extends AbstractGameView{
    protected properties: ShipProperties;
    protected ship: PIXI.Sprite;
    constructor(properties:AbstractProperties,model:Model,factory:Factory) {
        super(model,factory);
        this.properties = properties as ShipProperties;
        this.create(); 
    }
    private create(){
        this.ship = this.addChild(this.properties.ship);
        this.ship.anchor.set(0.5, 0.5);
        this.ship.scale.set(0.5,0.5);
    }
}