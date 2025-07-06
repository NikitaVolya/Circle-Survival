

function createZombie() {

    let entity = createEntity();

    entity.enemyName = 'zombie';
    entity.description = 'Zombie — a common enemy that slowly approaches the player and attacks in close combat.';


    entity.speed = 0.025;
    entity.SetMaxHeals(3);
    entity.SetColor("green");
    entity.expirience = 1;

    entity.hitCooldown = 1500;
    entity.nextAttack = 0;

    entity.WhenDie = () => {
        const coin = createCoin(entity.body.position, entity.expirience);
        
        Game.entities.Add(coin);
        Game.score += entity.expirience;
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

        let direction = entity.body.position.GetDirectionTo( Game.player.body.position);
        entity.body.rotation = direction.Copy();
        direction.Multiply(entity.speed);

        entity.body.AddVelocity(direction);
    }
    return entity;
}