


function createSolder(game) {

    let entity = createEntity();

    entity.speed = 0.01;
    entity.color = "blue";
    entity.distanceToPlayer = 300;

    entity.fireCooldown = 1400;
    entity.nextFire = game.lastTime + entity.fireCooldown;

    const playerPosition = game.player.body.position;
    const selfPosition = entity.body.position;


    function solderMove() {
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

    function fireUpdate() {
        if (entity.nextFire < game.lastTime)
        {
            let direction = selfPosition.GetDirectionTo(playerPosition);
            
            let newProjectile = createProjectile((e) => e == game.player, selfPosition.Copy(), direction);
            newProjectile.speed = 0.05;
            newProjectile.body.size = 10;
            newProjectile.color = 'red';

            newProjectile.SetLiveTime(5000);

            game.entities.push(newProjectile);

            entity.nextFire = game.lastTime + entity.fireCooldown * (0.6 + Math.random());
        }
    }

    entity.LogicUpdate = (game) => {

        solderMove();
        fireUpdate();
    }

    return entity;
}
