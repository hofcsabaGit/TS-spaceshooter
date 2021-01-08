import "howler";
import {
    Dom,
    PixiAppWrapper as Wrapper,
    PixiAppWrapperOptions as WrapperOpts,
} from "pixi-app-wrapper";
import "pixi-particles";
import "pixi-spine";
import { SplashScreen } from "./views/SpashScreen";
import { Model } from "./model/Model";
import { Styles } from "src/styles/Styles";
import { MenuScreen } from "./views/MenuScreen";
import { GameScreen } from "./views/GameScreen";
import { Events } from "./model/Events";
import { Factory } from "./Utils";

/**
 * Entry point of the app/Controller.
 */
export class SSApp {

    protected app: Wrapper;
    protected loadingText: PIXI.Text;
    protected model: Model;
    public factory:Factory;

    // Scenes
    protected splashScreen: SplashScreen;
    protected menuScreen: MenuScreen;
    protected gameScreen: GameScreen;

    private textStyle = new PIXI.TextStyle({
        fontFamily: "Verdana",
        fontSize: 24,
        fill: "#FFFFFF",
        wordWrap: true,
        wordWrapWidth: 440,
    });


    constructor() {
        const canvas = Dom.getElementOrCreateNew<HTMLCanvasElement>("app-canvas", "canvas", document.getElementById("app-root"));

        // if no view is specified, it appends canvas to body
        const appOptions: WrapperOpts = {
            width: 800,
            height: 600,
            scale: "keep-aspect-ratio",
            align: "middle",
            resolution: window.devicePixelRatio,
            roundPixels: true,
            transparent: false,
            backgroundColor: 0x000000,
            view: canvas,
            showFPS: true,
            showMediaInfo: true,
        };
        this.app = new Wrapper(appOptions);
        this.model = new Model(this.app);
        this.factory = new Factory(this.model);

        this.create();
        this.addEventListeners();
    }

    private create(){

        // splash => 
        let spaceBG = this.app.stage.addChild(new PIXI.Sprite(PIXI.Texture.from(Styles.BG)));
        let starfieldBG = this.factory.createParticleField(this.app, Styles.STAR, Styles.STARFIELD_EMITTER);
        this.app.stage.addChild(starfieldBG);

        this.splashScreen = this.factory.createSplashScreen();
        this.app.stage.addChild(this.splashScreen);

        // menu =>
        this.menuScreen = this.factory.createMenuScreen();
        this.app.stage.addChild(this.menuScreen);

        this.app.renderer.plugins.interaction.moveWhenInside = true;
        this.app.stage.interactive = true;

        // END
        this.init();
    }

    // START GAME
    public init(){
        window.setTimeout(()=>this.splashScreen.init(),1000); 
    }

    protected addEventListeners(){
        this.model.app.on(Events.LOAD_GAME,this.loadGame,this);
    }

    protected loadGame(){
            // game => 
            console.log("game loaded");
            this.gameScreen = this.factory.createGameScreen();
            this.app.stage.addChild(this.gameScreen);
    }

}