
function createCoin(position, experience = 1) {
    let object = ObjectsBuilder.CreateObject();

    object.name = 'coin';
    object.experience = experience;
    object.color = 'yellow';
    object.body.position = position.Copy();
    object.body.size = 7;
    object.body.positionAbsolut = true;

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

    return object;
}

function createProgressionController() {
    return {
        level: 0,
        experience: 0,
        levelCost: 10,

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
            return 10 + (level / 3) * (level / 3) + level / 10;
        },

        Update() {
            if (this.experience >= this.levelCost)
            {
                this.experience -= this.levelCost;
                this.level += 1;
                this.levelCost = this.CalculateLevelCost(this.level);
                
                UpgradesController.UpgradeDialog(Game);
            }
        },

        AddExperience(number) {

            this.experience += number;
        }
    }
}