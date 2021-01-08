export class Styles {

    // textures
    public static SPLASH:string = "assets/gfx/Splash.png";
    public static LOGO:string = "assets/gfx/Logo.png";
    public static BG:string = "assets/gfx/BG.png";
    public static BUTTON:string = "assets/gfx/Button.png";
    public static PLAYER_SHIP:string = "assets/gfx/PlayerShip.png";
    public static ENEMY_SHIP:string = "assets/gfx/EnemyShip.png";
    public static BULLET:string = "assets/gfx/Laser.png";
    public static METEOR:string = "assets/gfx/Meteor.png";
    public static STAR:string = "assets/gfx/Star.png";
    public static PARALLAX_STAR:string = "assets/gfx/parallaxStar.png";
    public static EXPLOSION:string = "assets/gfx/explosion.png";

    //text styles

    public static TEXT_STYLE = new PIXI.TextStyle({
        fontFamily: "Verdana",
        fontSize: 24,
        fill: "#FFFFFF",
        wordWrap: true,
        wordWrapWidth: 440,
    });

    // particle emitters
    public static STARFIELD_EMITTER: object = {
        "alpha": {
            "start": 0.56,
            "end": 0
        },
        "scale": {
            "start": 0.4,
            "end": 0.2,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffffff",
            "end": "#ffff6e"
        },
        "speed": {
            "start": 0.1,
            "end": 0.3,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 8,
            "max": 5
        },
        "blendMode": "normal",
        "frequency": 0.3,
        "emitterLifetime": -1,
        "maxParticles": 300,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": 0,
            "y": 0,
            "w": 800,
            "h": 600
        }
    }

    public static PARALLAX_LAYER_1: object = {
        "alpha": {
            "start": 0.5,
            "end": 0.5
        },
        "scale": {
            "start": 1,
            "end": 1,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffffff",
            "end": "#ffffff"
        },
        "speed": {
            "start": -1000,
            "end": -1000,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 0
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.81,
            "max": 0.81
        },
        "blendMode": "normal",
        "frequency": 0.03,
        "emitterLifetime": -1,
        "maxParticles": 200,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "rect",
        "spawnRect": {
            "x": 800,
            "y": 0,
            "w": 0,
            "h": 700
        }
    }

    public static PARALLAX_LAYER_2: object = {
        "alpha": {
            "start": 0.5,
            "end": 0.5
        },
        "scale": {
            "start": 1,
            "end": 1,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffffff",
            "end": "#ffffff"
        },
        "speed": {
            "start": -1700,
            "end": -1700,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 0
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.81,
            "max": 0.81
        },
        "blendMode": "normal",
        "frequency": 0.02,
        "emitterLifetime": -1,
        "maxParticles": 200,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "rect",
        "spawnRect": {
            "x": 800,
            "y": -600,
            "w": 0,
            "h": 1200
        }
    }

    public static EXPLOSION_EMITTER: object = {
        "alpha": {
            "start": 0.8,
            "end": 0.1
        },
        "scale": {
            "start": 1,
            "end": 0.3,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#f0cdb8",
            "end": "#f08c09"
        },
        "speed": {
            "start": 200,
            "end": 200,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 0
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.5,
            "max": 0.5
        },
        "blendMode": "normal",
        "frequency": 0.1,
        "emitterLifetime": 0.31,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "burst",
        "particlesPerWave": 10,
        "particleSpacing": 0,
        "angleStart": 0
    }
}