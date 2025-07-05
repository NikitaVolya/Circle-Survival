
const Game = {

    player: null,

    entities: null,

    keys: {},
    mousePosition: null,
    mouseClick: false,

    timers: null,
    cameraPosition: Vector(0, 0),

    AddDelay(f, time) {
        this.timers.Add(TimerBuilder.CreateTimer(f, time));
    },

    score: 0,

    canvas: null,
    ctx: null,

    isWork: false,
    blockPause: false,

    lastTime: 0,
    deltaTime: 0,

    ShowGameOverWindow() {
        const window = document.getElementById('gameOverWindow');
        const pauseBtn = document.getElementById('pauseButton');
        const resultScore = document.getElementById('resultScore');
        const bestScore = document.getElementById('bestScore');

        let userRecord = localStorage.getItem('record');

        resultScore.innerText = Game.score;
        if (!userRecord || Game.score > userRecord)
        {
            userRecord = Game.score;
            bestScore.innerText = Game.score + ' new record!!!';
        }
        else {
            bestScore.innerText = userRecord;
        }

        localStorage.setItem('record', userRecord);


        this.blockPause = true;

        this.HideWindow(pauseBtn);
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

    Restart() {
        window.location.reload();
    },

    ToMainMenu() {
        window.location.href = 'index.html';
    },

    DrawWeaponsCooldown() {
        
        let slide = 10;
        
        this.player.weapons.ForEach(weapon => {

            const nextUse = Math.max(weapon.nextActivate, 0);
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
        });
    },

    DrawScore() {

        this.ctx.fillStyle = 'orange';
        this.ctx.font = "20px Arial";
        this.ctx.fillText('Score: ' + this.score, 10, 70);
    },

    GameDraw() {
        this.canvas.width = window.innerWidth - 4;
        this.canvas.height = window.innerHeight - 4;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.entities.DrawAll();

        this.player.progressionController.DrawExperienceBar();
        this.DrawWeaponsCooldown();
        this.DrawScore();
    },

    CameraUpdate() {
        let windowCenter = Vector(window.innerWidth / 2, window.innerHeight / 2);
        windowCenter.AddVector(this.cameraPosition);
        let distanceToPlayer = windowCenter.GetDistance(this.player.body.position);

        if (50 < distanceToPlayer)
        {
            let cameraMove = windowCenter.GetDirectionTo(this.player.body.position);
            cameraMove.Multiply(distanceToPlayer * distanceToPlayer / 600);
            cameraMove.Multiply( 1 /this.deltaTime);
            this.cameraPosition.AddVector(cameraMove);
        }

        this.canvas.style.backgroundPosition = `${-this.cameraPosition.x}px ${-this.cameraPosition.y}px`;
    },

    GameUpdate() {

        this.CameraUpdate();

        this.entities.UpdateAll();
        this.timers.UpdateAll();

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
            this.mousePosition.AddVector(this.cameraPosition);
        });

        window.addEventListener('mousedown', e => {
            this.mouseClick = true;
            this.keys['mouseclick'] = true;
        });

        window.addEventListener('mouseup', e => {
            this.keys['mouseclick'] = false;
        });

        
        const pauseBtn = document.getElementById('pauseButton');

        pauseBtn.addEventListener('click', e => {
            if (this.blockPause)
                return;
            if (this.isWork)
            {
                this.Pause();
                pauseBtn.classList.remove('pause');
                pauseBtn.classList.add('resume');
            }
            else {
                this.Continue();
                pauseBtn.classList.remove('resume');
                pauseBtn.classList.add('pause');
            }
        })

        this.keys['passive'] = true;

        this.entities = CreateObjectsContainer();
        this.timers = CreateObjectsContainer();

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

    DrawRectangle(x, y, width, height, color = null, border = 0) {
        this.ctx.beginPath();

        if (border > 0)
        {
            this.ctx.rect(x - this.cameraPosition.x - border, y - this.cameraPosition.y - border, width + border * 2, height + border * 2);
            this.ctx.stroke();
        }

        this.ctx.rect(x - this.cameraPosition.x, y - this.cameraPosition.y, width, height)
        if (color != null)
        {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
    },

    DrawCircle(x, y, radius, color = null, border = 0) {
        this.ctx.beginPath();
        if (border > 0)
        {
            this.ctx.arc(x - this.cameraPosition.x, y - this.cameraPosition.y, radius + border, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
        this.ctx.arc(x - this.cameraPosition.x, y - this.cameraPosition.y, radius, 0, 2 * Math.PI);
        if (color != null)
        {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
    },

    DrawOutlineCircle(x, y, radius, color, border) {
        this.ctx.beginPath();
        this.ctx.arc(x - this.cameraPosition.x, y - this.cameraPosition.y, radius, 0, Math.PI * 2);

        this.ctx.lineWidth = border;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'black';
    }
}


document.addEventListener('DOMContentLoaded', () => {

    if  (document.getElementById('isGame'))
    {
        Game.Init();
        Game.Start();
    }
});