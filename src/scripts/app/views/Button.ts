import { AbstractProperties } from "app/properties/AbstractProperties";
import { ButtonProperties } from "app/properties/ButtonProperties";
import { AbstractGameView } from "./AbstractGameView";
import { Model } from "app/model/Model";
import { Styles } from "src/styles/Styles";
import { Factory } from "app/Utils";

export class Button extends AbstractGameView{
    protected properties: ButtonProperties;
    protected btnText: PIXI.Text;
    constructor(properties:AbstractProperties,model:Model,factory:Factory) {
        super(model,factory);
        this.properties = properties as ButtonProperties;
        this.create(); 
    }
    private create(){
        this.addChild(this.properties.button);
    }

    public initButton(text:string, cb: Function){
        this.btnText = new PIXI.Text(text, Styles.TEXT_STYLE);
       // btnText.(btnText.);
        this.addChild(this.btnText);
        this.btnText.position = this.properties.txtOffset;
        this.on('click', () => {
        cb();});
    }
    public getTextField():PIXI.Text{
        return this.btnText;
    }
    public enable(){
        this.interactive = true;
        this.buttonMode = true;
    }

    public disable(){
        this.interactive = false;
        this.buttonMode = false;
    }
}