

function createBombWeapon() {

    let weapon = createWeapon();

    weapon.name = 'bomb';
    weapon.displayKey = 'f';

    weapon.keyBind = 70;
    weapon.cooldown = 5000;

    weapon.Activate = (player) => {

        let explosion = createExplosion(Game.player.body.position);

        explosion.ExplosionSize = 220;

        explosion.filter = (entity) => {return entity.name == 'entity'; }

        Game.entities.Add(explosion);
    }



    return weapon;
}