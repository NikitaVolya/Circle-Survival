

function createExplosion() {

    let weapon = createWeapon();

    weapon.keyBind = 70;
    weapon.cooldown = 5000;

    weapon.ExplosionSize = 250;
    weapon.ExplosionSpeed = 200;
    weapon.ExplosionDemage = 6;

    weapon.Activate = (game, player) => {

        let object = createObject();

        let position = player.body.position.Copy();

        let iteration = 0;

        object.body.position = position;
        object.color = 'rgba(150, 150, 150, 0.5)';
        object.body.positionAbsolut = true;
        object.body.size = 1;

        object.body.OnCollision = (game, entity) => {

            if (entity == game.player)
                return;

            switch (entity.name) {
                case 'entity':
                    entity.heals -= weapon.ExplosionDemage* game.deltaTime / weapon.ExplosionSpeed ;
                    break;
            }
        }

        object.LogicUpdate = (game) => {

            
            iteration += game.deltaTime / weapon.ExplosionSpeed;

            object.body.size = Math.max(Math.sin(iteration * Math.PI) * weapon.ExplosionSize, 0);

            if (iteration >= 1)
            {
                game.Kill(object);
            }
        }
        
        game.AddEntity(object);
    }

    return weapon;
}