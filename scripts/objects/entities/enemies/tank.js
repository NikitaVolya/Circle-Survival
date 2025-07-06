

function createTank() {

    let entity = createEntity();
    
    entity.enemyName = 'tank';
    entity.description = 'Tank — a special enemy that appears rarely but poses a significant threat to the player. ' + 
    'It has a large health pool and grants a high reward upon defeat. <br><br>' +
    'The tank slowly approaches the player but stops when within a certain range. If the player gets too close, it deals melee damage.  <br><br>' +
    'Periodically, it releases a damaging shockwave around itself — the only safe zone is right next to the tank\'s body.  <br>';

    entity.speed = 0.02;
    entity.SetMaxHeals(20);
    entity.body.size = 40;
    entity.SetColor("orange");
    entity.expirience = 30;

    entity.hitCooldown = 2000;
    entity.nexHitAttack = 0;

    entity.waveCooldown = 10000;
    entity.nextWaveAttack = 15000;
    entity.waveDuration = 6000;
    

    entity.WhenDie = () => {
        const coin = createCoin(entity.body.position, entity.expirience);
        
        Game.entities.Add(coin);
        Game.score += entity.expirience;
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
            
            wave.color = 'rgba(150, 150, 150, 0.2)';
            wave.isActive = false;
            wave.waveSize = 80;
            wave.activateCooldown = 1000;
            wave.explosionSize = window.innerWidth * 1.5;  
            wave.explosionDuration = entity.waveDuration;

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
                if (!entity) return;
                if (!wave.filter(entity)) return;

                let distance = entity.body.position.GetDistance(wave.body.position);

                if (distance < wave.body.size - wave.waveSize) return;
                if (!wave.isActive) return;

                entity.TakeDamage(wave.explosionDamage * Game.deltaTime / wave.explosionDuration);
            }

            wave.LogicUpdate = () => {
        
                wave.iteration += Game.deltaTime / wave.explosionDuration;

                wave.body.size = Math.max(Math.sin(wave.iteration * Math.PI / 2) * wave.explosionSize, 0);

                if (wave.iteration >= 1)
                    Game.entities.Remove(wave);

                if (wave.isActive) return;
                
                wave.activateCooldown -= Game.deltaTime;

                if (wave.activateCooldown <= 0)  {
                    wave.isActive = true;
                    wave.color = 'rgba(150, 0, 0, 0.2)';
                }
            }

            Game.entities.Add(wave);

            entity.nextWaveAttack = entity.waveCooldown;
        }
    }

    entity.LogicUpdate = () => {

        const playerPosition = Game.player.body.position;

        entity.nexHitAttack -= Game.deltaTime;
        entity.nextWaveAttack -= Game.deltaTime;

        entity.WaveUpdate();

        let distance = entity.body.position.GetDistance(playerPosition);

        if (distance > 300)
        {
            let direction = entity.body.position.GetDirectionTo(playerPosition);
            entity.body.rotation = direction.Copy();
            direction.Multiply(entity.speed);

            entity.body.AddVelocity(direction);

        }

    }
    return entity;
}