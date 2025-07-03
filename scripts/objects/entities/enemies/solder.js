


function createSolder() {

    let entity = createEntity();

    entity.speed = 0.01;
    entity.color = "blue";
    entity.distanceToPlayer = 300;

    entity.fireCooldown = 1400;
    entity.nextFire = Game.lastTime + entity.fireCooldown;

    const playerPosition = Game.player.body.position;
    const selfPosition = entity.body.position;


    entity.SolderMove = () => {
        let vectorToPlayer = selfPosition.GetVectorTo(playerPosition);

        if (vectorToPlayer.Length() < 10)
            return;

        let directionToPlayer = selfPosition.GetDirectionTo(playerPosition);
        directionToPlayer.Multiply(entity.distanceToPlayer);

        vectorToPlayer.SubVector(directionToPlayer);
        vectorToPlayer.AddVector(selfPosition);

        let direction = selfPosition.GetDirectionTo(vectorToPlayer);

        entity.body.rotation = selfPosition.GetDirectionTo(playerPosition);
        direction.Multiply(entity.speed);

        entity.body.AddVelocity(direction);
    }

    entity.FireUpdate = () => {
        if (entity.nextFire < Game.lastTime)
        {
            let direction = selfPosition.GetDirectionTo(playerPosition);
            
            let newProjectile = createBullet(entity, (e) => e == Game.player, selfPosition.Copy(), direction);
            newProjectile.speed = 0.05;
            newProjectile.body.size = 10;
            newProjectile.color = 'red';

            newProjectile.SetLiveTime(3000);

            Game.entities.Add(newProjectile);

            entity.nextFire = Game.lastTime + entity.fireCooldown * (0.6 + Math.random());
        }
    }

    entity.WhenDie = () => {
        Game.entities.Add(createCoin(entity.body.position, 3));
    }

    entity.LogicUpdate = () => {

        entity.SolderMove();
        entity.FireUpdate();
    }

    return entity;
}
