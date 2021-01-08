import { AbstractProperties } from "app/properties/AbstractProperties";
import { Model } from "app/model/Model";
import { Factory } from "app/Utils";

export class AbstractGameView extends PIXI.Container{
    protected model:Model;
    protected factory: Factory;
    protected properties: AbstractProperties;
    constructor(model:Model,factory:Factory) {
        super();
        this.model=model;
        this.factory=factory;
    }

    protected init(){

    }

}