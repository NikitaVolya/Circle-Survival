
const Game = {

    player: null,

    entities: null,

    keys: {},
    mousePosition: null,
    mouseClick: false,

    canvas: null,
    ctx: null,

    isWork: false,

    lastTime: 0,
    deltaTime: 0,

    ShowGameOverWindow() {
        const window = document.getElementById('gameOverWindow');
        this.ShowWindow(window);
    },

    ShowWindow(element) {
        element.classList.remove('hidden');
        element.classList.add('visible');
    },
    HideWindow(element) {
        element.classList.remove('visible');
        element.classList.add('hidden');
    },

    DrawWeaponsCooldown() {
        
        let slide = 10;

        for (let i in this.player.weapons)
        {
            const weapon = this.player.weapons[i];

            const nextUse = Math.max(weapon.nextActivate - this.lastTime, 0);
            const procent = nextUse / weapon.cooldown;

            this.ctx.beginPath();
            this.ctx.rect(slide, window.innerHeight - 10, 13, -30 + 30 * procent);
            this.ctx.fillStyle = 'rgb(0, 195, 255)';
            this.ctx.fill();

            
            this.ctx.beginPath();
            this.ctx.rect(slide, window.innerHeight - 10, 13, -30);
            this.ctx.stroke();

            const text = weapon.name + ' | ' + weapon.displayKey;
            
            this.ctx.fillStyle = 'black';
            this.ctx.font = "35px Arial";
            this.ctx.fillText(text, slide + 20, window.innerHeight - 15);
            

            slide += text.length * 22;
        }

    },

    GameDraw() {
        this.canvas.width = window.innerWidth - 4;
        this.canvas.height = window.innerHeight - 4;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.entities.DrawAll();

        this.player.progressionController.DrawExperienceBar(this);
        this.DrawWeaponsCooldown();
    },
    GameUpdate() {

        this.entities.UpdateAll();

        ObjectsSpawner.Update();

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
            this.keys[e.keyCode] = true;
        }); 
        window.addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = false;
        });

        window.addEventListener("mousemove", e => {
            this.mousePosition = Vector(e.clientX, e.clientY);
        });

        window.addEventListener('mousedown', e => {
            this.mouseClick = true;
            this.keys['mouseclick'] = true;
        });

        window.addEventListener('mouseup', e => {
            this.keys['mouseclick'] = false;
        });

        this.keys['passive'] = true;

        this.entities = CreateObjectsContainer();

        this.mousePosition = Vector(0, 0);

        this.player = createPlayer();
        this.player.body.position.x = window.innerWidth / 2;
        this.player.body.position.y = window.innerHeight / 2;

        this.entities.Add(this.player);

    },

    Start() {

        this.isWork = true;

        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        requestAnimationFrame(() => this.GameLoop(0));

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

        Game.Init();
        Game.Start();

        document.getElementById('pauseBtn').addEventListener('click', () => {
            Game.Pause();
        });
        document.getElementById('continueBtn').addEventListener('click', () => {
            Game.Continue();
        });
});