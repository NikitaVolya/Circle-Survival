
function createCoin(position, experience = 1) {
    let object = createObject();

    object.name = 'coin';
    object.experience = experience;
    object.color = 'yellow';
    object.body.position = position.Copy();
    object.body.size = 7;
    object.body.positionAbsolut = true;

    object.body.OnCollision = (game, entity) => {
        if (game.player != entity)
            return;
        entity.progressionController.AddExperience(object.experience);
        game.Kill(object);
    }

    const selfPosition = object.body.position;
    const playerPosition = game.player.body.position;

    object.LogicUpdate = (game) => {

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

        DrawExperienceBar(game) {

            let progressionLineSize = this.experience / this.levelCost;

            game.ctx.beginPath();
            game.ctx.rect(1, 1, window.innerWidth * progressionLineSize - 1, 15);
            game.ctx.fillStyle = 'yellow';
            game.ctx.fill();

            game.ctx.beginPath();
            game.ctx.rect(1, 1, window.innerWidth * progressionLineSize - 1, 15);
            game.ctx.rect(2, 1, window.innerWidth - 6, 15);
            game.ctx.stroke();

            
            game.ctx.fillStyle = 'black';
            game.ctx.font = "30px Arial";
            game.ctx.fillText("Level: " + this.level,10,45);

        },

        CalculateLevelCost(level) {
            return 10 + level * level / 2;
        },

        UpdateLevel() {
            if (this.experience >= this.levelCost)
            {
                this.experience -= this.levelCost;
                this.level += 1;
                this.levelCost = this.CalculateLevelCost(this.level);

                this.UpdateLevel();
            }
        },

        AddExperience(number) {

            this.experience += number;
            this.UpdateLevel();
        }
    }
}