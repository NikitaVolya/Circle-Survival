
function createCoin(position, experience = 1) {

    let object = ObjectsBuilder.CreateObject();

    object.name = 'coin';
    object.color = 'yellow';
    object.experience = experience;

    object.body.size = 7;
    object.body.positionAbsolut = true;
    object.body.position = position.Copy();

    object.body.OnCollision = (entity) => {
        if (Game.player != entity)
            return;
        entity.progressionController.AddExperience(object.experience);
        Game.entities.Remove(object);
    }

    const selfPosition = object.body.position;
    const playerPosition = Game.player.body.position;

    object.LogicUpdate = () => {

        let distance = playerPosition.GetDistance(selfPosition);
        if (distance < 200)
        {
            const directionToPlayer = selfPosition.GetDirectionTo(playerPosition);
            directionToPlayer.Multiply(15 / distance);

            object.body.AddVelocity(directionToPlayer);
        }
    }

    object.Draw = () => {
        Game.DrawCircle(object.body.position.x, object.body.position.y, object.body.size, object.color, 1);
    }

    return object;
}

function createProgressionController() {
    return {
        level: 0,
        experience: 0,
        levelCost: 10,
        experienceM: 1,

        DrawExperienceBar() {

            let progressionLineSize = this.experience / this.levelCost;

            Game.ctx.beginPath();
            Game.ctx.rect(1, 2, window.innerWidth * progressionLineSize - 1, 15);
            Game.ctx.fillStyle = 'yellow';
            Game.ctx.fill();

            Game.ctx.beginPath();
            Game.ctx.rect(1, 2, window.innerWidth * progressionLineSize - 1, 15);
            Game.ctx.rect(2, 2, window.innerWidth - 6, 15);
            Game.ctx.stroke();

            
            Game.ctx.fillStyle = 'black';
            Game.ctx.font = "30px Arial";
            Game.ctx.fillText("Level: " + this.level,10,45);

        },

        CalculateLevelCost(level) {
            return 10 + (level / 5) * (level / 2.5) + level / 20;
        },

        CheckLevelProgression(){
            switch (this.level)
            {
                case 5:
                    Rarities.Epic.chance = 0.4;
                    Rarities.Legendary.chance = 0.05;
                    
                    ObjectsSpawner.units = [
                        [0.7, createZombie],
                        [0.2, createSpeedster],
                        [0.5, createSolder], 
                        [0, createTank],
                    ];
                    break;
                case 10:
                    ObjectsSpawner.units = [
                        [0.7, createZombie],
                        [0.3, createSpeedster],
                        [0.5, createSolder], 
                        [0.1, createTank],
                    ];
                    break;

                case 20: 
                    Rarities.Rare.chance = 0.6;
                    Rarities.Epic.chance = 0.35;
                    Rarities.Legendary.chance = 0.1;

                    ObjectsSpawner.units = [
                        [0.7, createZombie],
                        [0.35, createSpeedster],
                        [0.5, createSolder], 
                        [0.2, createTank],
                    ];
                    break;

                case 30:
                    Rarities.Epic.chance = 0.6;
                    Rarities.Legendary.chance = 0.4;
                    break;
            }
        },

        Update() {
            if (this.experience >= this.levelCost)
            {
                this.experience -= this.levelCost;
                this.level += 1;
                this.CheckLevelProgression();
                this.levelCost = this.CalculateLevelCost(this.level);
                
                UpgradesController.UpgradeDialog(Game);
            }
        },

        AddExperienceMultiple(number) {
            this.experienceM += number;
        },

        AddExperience(number) {
            this.experience += number * this.experienceM;
        }
    }
}