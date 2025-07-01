
function createZombie(game) {

    let entity = createEntity();
    entity.speed = 0.025;
    entity.SetMaxHeals(3);
    entity.color = "green";

    entity.hitCooldown = 1500;
    entity.nextAttack = 0;
    
    const playerPosition = game.player.body.position;
    const selfPosition = entity.body.position;

    entity.WhenDie = (game) => {
        game.entities.push(createCoin(entity.body.position));
    }

    entity.body.OnCollision = (game, otherEntity) => {
        if (otherEntity != game.player)
            return;

        if (entity.nextAttack < game.lastTime)
        {
            otherEntity.heals -= 1;
            entity.nextAttack = game.lastTime + entity.hitCooldown;
        }
    }

    entity.LogicUpdate = (game) => {

        let direction = selfPosition.GetDirectionTo(playerPosition);
        entity.body.rotation = direction.Copy();
        direction.Multiply(entity.speed);

        entity.body.AddVelocity(direction);
    }
    return entity;
}