

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
        Game.entities.Add(createExplosion(weapon.ExplosionSpeed, weapon.ExplosionDemage, weapon.ExplosionSize));
    }

    return weapon;
}