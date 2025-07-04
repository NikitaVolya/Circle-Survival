
function createZombie(game) {

    let entity = createEntity();
    entity.speed = 0.025;
    entity.SetMaxHeals(3);
    entity.SetColor("green");

    entity.hitCooldown = 1500;
    entity.nextAttack = 0;
    
    const playerPosition = Game.player.body.position;
    const selfPosition = entity.body.position;

    entity.WhenDie = () => {
        Game.entities.Add(createCoin(entity.body.position));
        Game.score++;
    }

    entity.body.OnCollision = (otherEntity) => {
        if (otherEntity != Game.player)
            return;

        if (entity.nextAttack < Game.lastTime)
        {
            otherEntity.TakeDamage(1);
            entity.nextAttack = Game.lastTime + entity.hitCooldown;
        }
    }

    entity.LogicUpdate = () => {

        let direction = selfPosition.GetDirectionTo(playerPosition);
        entity.body.rotation = direction.Copy();
        direction.Multiply(entity.speed);

        entity.body.AddVelocity(direction);
    }
    return entity;
}