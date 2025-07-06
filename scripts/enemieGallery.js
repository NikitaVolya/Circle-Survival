
const listItems = [];

function loadEnemy(list, enemy) {

    const card = document.createElement("div");
    card.className = "enemy-card";

    const info = document.createElement("div");
    info.className = "enemy-info";
    info.innerHTML = `
      <h2>${enemy.enemyName}</h2>
      <div class="enemy-stats">
        ❤️ Health: ${enemy.heals}<br>
        ⭐ XP: ${enemy.expirience}<br>
      </div>
      <div class="enemy-description">${enemy.description}</div>
    `;
    card.appendChild(info);

    const canvas = document.createElement("canvas");
    canvas.className = "enemy-canvas";
    canvas.width = 400;
    canvas.height = 300;
    card.appendChild(canvas);


    const ctx = canvas.getContext("2d");

    list.appendChild(card);

    enemy.body.position.Add(canvas.width / 2, canvas.height / 2);
    enemy.body.AddVelocity = (v) => {};

    listItems.push([enemy, canvas, ctx, CreateObjectsContainer()]);
}

function DrawEnemies(t = 0) {

    
    Game.deltaTime = t - Game.lastTime;
    Game.lastTime = t;

    for (let i in listItems)
    {
        const [enemy, canvas, ctx, container] = listItems[i];
        ctx.clearRect(0, 0, 400, 300);
        Game.entities = container;
        
        Game.ctx = ctx;
        Game.canvas = canvas;
        Game.entities.UpdateAll();
        Game.entities.DrawAll();

        enemy.Update();
        enemy.Draw();
    }

    
    requestAnimationFrame(DrawEnemies);
}

function loadEnemies() {
    const enemieList = document.getElementById('enemyList');

    Game.player = {
        body: {position: Vector(-1000, 150)},
        progressionController: {DrawExperienceBar(){}}
    };
    Game.DrawWeaponsCooldown = () => {};
    Game.entities = CreateObjectsContainer();

    enemieList.innerHTML = '';


    for (let i in ObjectsSpawner.units)
    {
        const [chance, enemySpawner] = ObjectsSpawner.units[i];
        const enemy = enemySpawner();

        
        enemy.waveCooldown = 3000;
        enemy.nextWaveAttack = 0;

        loadEnemy(enemieList, enemy);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('backButton').addEventListener('click', e => 
        window.location.href = 'index.html');

    loadEnemies();
    DrawEnemies();
});