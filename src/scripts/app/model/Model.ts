import * as EventEmitter from "vendor/primus/eventemitter3";
import { PixiAppWrapper } from "vendor/dacaher/pixi-app-wrapper";

export enum gameStates {Splash,Menu,Game};

export class Model{             
    public app : PixiAppWrapper;
    public gameState : gameStates;
    
    constructor(app:PixiAppWrapper) {
        this.app = app;
        this.init();
    }
    protected init(){
        this.gameState = gameStates.Splash;
    }

}