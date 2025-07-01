
function createGun() {

    let weapon = createWeapon();

    weapon.keyBind = 'mouseclick';
    weapon.cooldown = 400;

    weapon.bulletSize = 5;
    weapon.bulletSpeed = 0.2;


    weapon.Activate = (game, player) => {
        let position = player.body.position.Copy();
        let direction = player.body.rotation.Copy();

        let newProjectile = createProjectile((e) => e != player, position, direction);

        newProjectile.speed = weapon.bulletSpeed;
        newProjectile.body.size = weapon.bulletSize;

        
        game.AddEntity(newProjectile);
    }

    return weapon;
}