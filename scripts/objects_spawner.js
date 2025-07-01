

function createObjectsSpawner() {
    return {
        
        timeCooldown: 1500,
        spawnNumber: 0.85,
        nextSpawn: 0,

        units: [[0.15, createSolder], [0.75, createZombie]],

        RandomEntityGenerate() {
            let i = 0;
            while (true) {

                let [chance, func] = this.units[i];
                let randomNumber = Math.random();
                
                if (randomNumber <= chance)
                    return func;

                i++;
                if (i >= this.units.length)
                    i = 0;
            }
        },

        DeployRandomOutScreen(object)
        {
            if (Math.random() < 0.5) {
                object.body.position.x = -object.body.size + Math.random() * (window.innerWidth + object.body.size);
                if (Math.random() < 0.5)
                    object.body.position.y = -object.body.size;
                else
                    object.body.position.y = window.innerHeight + object.body.size;
            } else {
                object.body.position.y = -object.body.size + Math.random() * (window.innerHeight + object.body.size);
                if (Math.random() < 0.5)
                    object.body.position.x = -object.body.size;
                else
                    object.body.position.x = window.innerWidth + object.body.size;
            }
        },

        Update(game) {

            if (this.nextSpawn <= game.lastTime)
            {
                for (let i = 0; i < this.spawnNumber; i += 1)
                {
                    let entity = this.RandomEntityGenerate()(game);
                    this.DeployRandomOutScreen(entity);
                    
                    game.entities.push(entity);

                    this.nextSpawn = game.lastTime + this.timeCooldown;
                }
                this.spawnNumber = this.spawnNumber + 0.001;
                this.timeCooldown -= 0.2;
            }
        },

        Init() {

        }
    }
}