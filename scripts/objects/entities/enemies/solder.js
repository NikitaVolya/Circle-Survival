


function createSolder() {

    let entity = createEntity();

    entity.enemyName = 'solder';
    entity.description = 'Soldier — a common enemy that slowly approaches the player and stops once within range. He continuously showers the player with bullets, which can either be dodged or destroyed using your own projectiles.';

    entity.speed = 0.01;
    entity.SetColor('blue');
    entity.distanceToPlayer = 300;
    entity.expirience = 3;

    entity.fireCooldown = 1400;
    entity.nextFire = Game.lastTime + entity.fireCooldown;

    const selfPosition = entity.body.position;

    entity.SolderMove = () => {
        
        const playerPosition = Game.player.body.position;

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

        
        const playerPosition = Game.player.body.position;

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
        const coin = createCoin(entity.body.position, entity.expirience);
        coin.experience = entity.expirience;
        Game.entities.Add(coin);
        Game.score += entity.expirience;
    }

    entity.LogicUpdate = () => {

        entity.SolderMove();
        entity.FireUpdate();
    }

    return entity;
}
