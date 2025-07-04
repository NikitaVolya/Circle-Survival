

function createBombWeapon() {

    let weapon = createWeapon();

    weapon.name = 'bomb';
    weapon.displayKey = 'f';

    weapon.keyBind = 70;
    weapon.cooldown = 5000;

    weapon.ExplosionSize = 180;
    weapon.ExplosionSpeed = 200;
    weapon.ExplosionDemage = 4;

    weapon.Activate = (player) => {

        let explosion = createExplosion(Game.player.body.position);

        explosion.filter = (entity) => {return entity.name == 'entity'; }

        Game.entities.Add(explosion);
    }



    return weapon;
}