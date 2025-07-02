
const game = {

    player: null,
    upgradesController: null,

    entities: [ ],
    toDelete: [ ],
    objectsSpawner: null,

    keys: {},
    mousePosition: null,
    mouseClick: false,

    canvas: null,
    ctx: null,

    isWork: false,

    lastTime: 0,
    deltaTime: 0,

    Kill(entity) {
        if (this.toDelete.indexOf(entity) != -1)
            return;
        this.toDelete.push(entity);
    },

    AddEntity(entity) {
        if (this.entities.indexOf(entity) != -1)
            return;
        this.entities.push(entity);
    },

    DrawWeaponsCooldown() {
        
        let slide = 10;

        for (let i in this.player.weapons)
        {
            const weapon = this.player.weapons[i];

            const nextUse = Math.max(weapon.nextActivate - game.lastTime, 0);
                const procent = nextUse / weapon.cooldown;

            game.ctx.beginPath();
            game.ctx.rect(slide, window.innerHeight - 10, 13, -30 + 30 * procent);
            game.ctx.fillStyle = 'rgb(0, 195, 255)';
            game.ctx.fill();

            
            game.ctx.beginPath();
            game.ctx.rect(slide, window.innerHeight - 10, 13, -30);
            game.ctx.stroke();

            const text = weapon.name + ' | ' + weapon.displayKey;
            
            game.ctx.fillStyle = 'black';
            game.ctx.font = "35px Arial";
            game.ctx.fillText(text, slide + 20, window.innerHeight - 15);
            

            slide += text.length * 22;
        }

    },

    GameDraw() {
        this.canvas.width = window.innerWidth - 4;
        this.canvas.height = window.innerHeight - 4;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i in this.entities)
        {
            const entity = this.entities[i];
            entity.Draw(this);
        }

        this.player.progressionController.DrawExperienceBar(this);
        this.DrawWeaponsCooldown(this);
    },
    GameUpdate() {

        this.entities = this.entities.filter((e) => this.toDelete.indexOf(e) == -1);
        this.toDelete = [];

        for (let i in this.entities)
        {
            const entity = this.entities[i];
            entity.Update(this);
        }

        this.objectsSpawner.Update(this);

        this.mouseClick = false;
    },
    GameLoop(timestamp) {

        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.GameDraw();
        if (this.isWork)
            this.GameUpdate();
        

        requestAnimationFrame(t => { this.GameLoop(t)});
    },

    Init() {
        window.addEventListener('keydown', (e) => {
            game.keys[e.keyCode] = true;
        }); 
        window.addEventListener('keyup', (e) => {
            game.keys[e.keyCode] = false;
        });

        window.addEventListener("mousemove", e => {
            this.mousePosition = Vector(e.clientX, e.clientY);
        });

        window.addEventListener('mousedown', e => {
            this.mouseClick = true;
            game.keys['mouseclick'] = true;
        });

        window.addEventListener('mouseup', e => {
            game.keys['mouseclick'] = false;
        });

        this.mousePosition = Vector(0, 0);

        this.player = createPlayer();
        this.player.body.position.x = window.innerWidth / 2;
        this.player.body.position.y = window.innerHeight / 2;

        this.upgradesController = createUpgradesController();

        this.entities.push(this.player);

        this.objectsSpawner = createObjectsSpawner();

    },

    Start() {

        this.isWork = true;

        game.canvas = document.getElementById('game');
        game.ctx = game.canvas.getContext('2d');
        requestAnimationFrame(() => game.GameLoop(0));

    },

    Continue() {
        this.isWork = true;
        const ui = document.getElementById('UI');
        ui.style.backgroundColor = '';
    },

    Pause() {
        this.isWork = false;

        const ui = document.getElementById('UI');
        ui.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    },
}


document.addEventListener('DOMContentLoaded', () => {

        game.Init();
        game.Start();

        document.getElementById('pauseBtn').addEventListener('click', () => {
            game.Pause();
        });
        document.getElementById('continueBtn').addEventListener('click', () => {
            game.Continue();
        });
});