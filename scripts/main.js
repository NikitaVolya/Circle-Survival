
const game = {

    player: null,
    entities: [ ],
    toDelete: [ ],
    objectsSpawner: null,

    keys: {},
    mousePosition: null,
    mouseClick: false,

    canvas: null,
    ctx: null,

    lastTime: 0,
    deltaTime: 0,

    Kill(entity) {
        if (this.toDelete.indexOf(entity) != -1)
            return;
        this.toDelete.push(entity);
    },

    GameDraw() {
        this.canvas.width = window.innerWidth - 4;
        this.canvas.height = window.innerHeight - 4;

        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i in this.entities)
        {
            const entity = this.entities[i];
            entity.Draw(this);
        }
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
        });

        this.mousePosition = Vector(0, 0);

        this.player = createPlayer();
        this.player.body.position.x = window.innerWidth / 2;
        this.player.body.position.y = window.innerHeight / 2;
        this.entities.push(this.player);

        this.objectsSpawner = createObjectsSpawner();
    },

    Start() {

        game.canvas = document.getElementById('canvas');
        if (!canvas.getContext)
            return;

        game.ctx = game.canvas.getContext('2d');
        requestAnimationFrame(() => game.GameLoop(0));
    }
}


document.addEventListener('DOMContentLoaded', () => {

        game.Init();
        game.Start();
});