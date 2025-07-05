
function createSpeedster() {

    let entity = createEntity();

    entity.enemyName = 'speedster';
    entity.description = 'Speedster — small, fast, and annoyingly persistent.';


    entity.speed = 0.08;
    entity.SetMaxHeals(2);
    entity.SetColor("purple");
    entity.body.size = 13;
    entity.expirience = 2;

    entity.hitCooldown = 200;
    entity.nextAttack = 0;
    
    const selfPosition = entity.body.position;

    entity.WhenDie = () => {
        const coin = createCoin(entity.body.position);
        coin.experience = entity.expirience;
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

        let direction = selfPosition.GetDirectionTo( Game.player.body.position);
        entity.body.rotation = direction.Copy();
        direction.Multiply(entity.speed);

        entity.body.AddVelocity(direction);
    }
    return entity;
}