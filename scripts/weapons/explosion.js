

function createExplosionWeapon() {

    let weapon = createWeapon();

    weapon.name = 'bomb';
    weapon.displayKey = 'f';

    weapon.keyBind = 70;
    weapon.cooldown = 5000;

    weapon.ExplosionSize = 180;
    weapon.ExplosionSpeed = 200;
    weapon.ExplosionDemage = 4;

    weapon.Activate = (player) => {

        let object = ObjectsBuilder.CreateObject();

        let position = player.body.position.Copy();

        let iteration = 0;

        object.body.position = position;
        object.color = 'rgba(150, 150, 150, 0.5)';
        object.body.positionAbsolut = true;
        object.body.size = 1;

        object.body.OnCollision = (entity) => {
            if (entity == Game.player || entity.name != 'entity')
                return;
            entity.TakeDamage(weapon.ExplosionDemage * Game.deltaTime / weapon.ExplosionSpeed);
        }

        object.LogicUpdate = () => {
            
            iteration += Game.deltaTime / weapon.ExplosionSpeed;

            object.body.size = Math.max(Math.sin(iteration * Math.PI) * weapon.ExplosionSize, 0);

            if (iteration >= 1)
                Game.entities.Remove(object);
        }
        
        Game.entities.Add(object);
    }

    return weapon;
}