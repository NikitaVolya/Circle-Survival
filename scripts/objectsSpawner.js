

const ObjectsSpawner = {
        
    timeCooldown: 1500,
    spawnNumber: 1,
    nextSpawn: 0,

    units: [
        [0.15, createSolder], 
        [0.75, createZombie],
        [0.05, createTank]
    ],

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
        object.body.position.AddVector(Game.cameraPosition);
    },

    Update() {

        if (this.nextSpawn <= 0)
        {
            for (let i = 0; i < Math.floor(this.spawnNumber); i += 1)
            {
                let entity = this.RandomEntityGenerate()();
                this.DeployRandomOutScreen(entity);
                
                Game.entities.Add(entity);
            }
            this.nextSpawn = this.timeCooldown;
            this.timeCooldown -= 0.2;
            this.spawnNumber += 0.01;
        }
        this.nextSpawn -= Game.deltaTime;
    },

    Init() {

    }
}