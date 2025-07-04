
function createTank() {

    let entity = createEntity();
    entity.speed = 0.02;
    entity.SetMaxHeals(40);
    entity.SetColor("orange");

    entity.hitCooldown = 2000;
    entity.nexHitAttack = 0;

    entity.waveCooldown = 10000;
    entity.nextWaveAttack = 1000;

    entity.body.size = 40;
    
    const playerPosition = Game.player.body.position;
    const selfPosition = entity.body.position;

    entity.WhenDie = () => {
        const coin = createCoin(entity.body.position);
        coin.experience = 10;
        Game.entities.Add(coin);
        Game.score += 10;
    };

    entity.body.OnCollision = (otherEntity) => {
        if (otherEntity != Game.player)
            return;

        if (entity.nexHitAttack <= 0)
        {
            otherEntity.TakeDamage(2);
            entity.nexHitAttack = entity.hitCooldown;
        }
    };

    entity.WaveUpdate = () => {
        if (entity.nextWaveAttack <= 0) {

            let wave = createExplosion(entity.body.position);

            wave.filter = (entity) => { return entity.name == 'player'; }
            wave.waveSize = 80;
            wave.color = 'rgba(150, 150, 150, 0.2)';

            wave.isActive = false;
            wave.activateCooldown = 700;
            wave.explosionSize = window.innerWidth * 1.5;  
            wave.explosionSpeed = 6000;
            wave.explosionDamage = 80;

            wave.Draw = () => {

                Game.DrawOutlineCircle(
                    wave.body.position.x, 
                    wave.body.position.y,
                    wave.body.size,
                    wave.color,
                    wave.waveSize
                );
            }

            wave.body.OnCollision = (entity) => {
                if (!wave.filter(entity))
                    return;
                let distance = entity.body.position.GetDistance(wave.body.position);
                if (distance < wave.body.size - wave.waveSize)
                    return;
                if (!wave.isActive)
                    return;
                entity.TakeDamage(wave.explosionDamage * Game.deltaTime / wave.explosionSpeed);
            }

            wave.LogicUpdate = () => {
        
                wave.iteration += Game.deltaTime / wave.explosionSpeed;

                wave.body.size = Math.max(Math.sin(wave.iteration * Math.PI / 2) * wave.explosionSize, 0);

                if (wave.iteration >= 1)
                    Game.entities.Remove(wave);
                if (wave.isActive)
                    return;
                if (wave.activateCooldown > 0) {
                    wave.activateCooldown -= Game.deltaTime;
                } else {
                    wave.isActive = true;
                    wave.color = 'rgba(150, 0, 0, 0.2)';
                }
            }


            Game.entities.Add(wave);

            entity.nextWaveAttack = entity.waveCooldown;

        }
    }

    entity.LogicUpdate = () => {

        if (entity.nexHitAttack > 0)
            entity.nexHitAttack -= Game.deltaTime;
        
        if (entity.nextWaveAttack > 0)
            entity.nextWaveAttack -= Game.deltaTime;

        entity.WaveUpdate();

        let distance = selfPosition.GetDistance(playerPosition);

        if (distance > 300)
        {
            let direction = selfPosition.GetDirectionTo(playerPosition);
            entity.body.rotation = direction.Copy();
            direction.Multiply(entity.speed);

            entity.body.AddVelocity(direction);

        }

    }
    return entity;
}