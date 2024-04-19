class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 300;
        this.rightArmX = this.bodyX + 90;
        this.leftArmX = this.bodyX - 90;
        this.rightArmY = this.bodyY + 30;
        this.leftArmY = this.bodyY + 30;    //technically don't need this value
        this.rightLegX = this.bodyX + 50;
        this.rightLegY = this.bodyY + 150;
        this.leftLegX = this.bodyX - 50;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_darkA.png");
        my.sprite.leftArm.flipX = true;
        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_darkA.png");

        my.sprite.eye1 = this.add.sprite(this.bodyX, this.bodyY - 10, "monsterParts", "eye_psycho_light.png");
        my.sprite.mouth = this.add.sprite(this.bodyX, this.bodyY + 50, "monsterParts", "mouthH.png");
        
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.rightLegY, "monsterParts", "leg_yellowA.png");
        my.sprite.leftLeg.flipX = true;
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_yellowA.png");
        
        my.sprite.leftHorn = this.add.sprite(this.bodyX + 50, this.bodyY - 75, "monsterParts", "detail_red_horn_large.png");
        my.sprite.rightHorn = this.add.sprite(this.bodyX - 50, this.bodyY - 75, "monsterParts", "detail_red_horn_large.png");
        my.sprite.rightHorn.flipX = true;
        
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 50, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.fangs.visible = false;

        this.aKey = this.input.keyboard.addKey(65);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // x = this.input.addKey('x') makes X a listener object on the key

        let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        sKey.on('down', (key, event) => {
            my.sprite.fangs.visible = false;
            my.sprite.mouth.visible = true;
        });
        let fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        fKey.on('down', (key, event) => {
            my.sprite.fangs.visible = true;
            my.sprite.mouth.visible = false;
        });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        if (this.aKey.isDown) {
            for (let sprite_object in my.sprite){
                my.sprite[sprite_object].x = my.sprite[sprite_object].x - 1;
            }
        }
        if (this.dKey.isDown) {
            for (let sprite_object in my.sprite){
                my.sprite[sprite_object].x = my.sprite[sprite_object].x + 1;
            }
        }
    }

}