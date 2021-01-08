import { AbstractProperties } from "./AbstractProperties";
import { Styles } from "src/styles/Styles";

export class GameProperties extends AbstractProperties{

    public bullet: PIXI.Sprite;
    public player: PIXI.Sprite;
    public enemies: PIXI.Sprite;
    public meteors: PIXI.Sprite;
    public prlxSetup1 : object;
    public prlxSetup2 : object;
    public prlxAmount : number;
    public spawnRate : number;
    public collisionRefreshRate : number;
    public stressTest : boolean;
    constructor(){
        super();
        this.create();
    }
    public create(){
        this.prlxSetup1 = Styles.PARALLAX_LAYER_1;
        this.prlxSetup2 = Styles.PARALLAX_LAYER_2;
        this.prlxAmount = 4;
        this.collisionRefreshRate = 30;
        this.spawnRate = 1000;   // set it to 100 for some arcade madness / with the stress test :)
        this.stressTest = false;    // change it to true for some arcade madness / with the stress test :)
    }
    
}