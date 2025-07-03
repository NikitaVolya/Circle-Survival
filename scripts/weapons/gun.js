
function createGunWeapon() {

    let weapon = createWeapon();

    weapon.name = 'gun';
    weapon.displayKey = 'm1 '
    weapon.keyBind = 'mouseclick';
    weapon.cooldown = 400;

    weapon.bulletSize = 5;
    weapon.bulletSpeed = 0.2;
    weapon.bulletDamage = 1;


    weapon.Activate = (player) => {
        let position = player.body.position.Copy();
        let direction = player.body.rotation.Copy();

        let newProjectile = createBullet(player, (e) => e != player, position, direction);

        newProjectile.SetLiveTime(1200);

        newProjectile.speed = weapon.bulletSpeed;
        newProjectile.body.size = weapon.bulletSize;
        newProjectile.damage = weapon.bulletDamage;

        Game.entities.Add(newProjectile);
    }

    return weapon;
}