
function createSatelliteWeapon() {

    let weapon = createWeapon();

    weapon.name = 'satellite';
    weapon.displayKey = ''
    weapon.keyBind = 'passive';
    weapon.cooldown = 8000;

    weapon.satelliteWeapon = 5;
    weapon.satelliteSpeed = 0.2;


    weapon.Activate = (player) => {
        let position = player.body.position.Copy();
        let direction = player.body.rotation.Copy();

        let newProjectile = createBullet(player, (e) => e != player, position, direction);

        newProjectile.SetLiveTime(5000);
        newProjectile.body.size = 10;
        newProjectile.owner = player;

        newProjectile.iterator = 0;
        newProjectile.distance = 100;
        newProjectile.speed = 5;

        newProjectile.MoveUpdate = () => {
            let newPosition = Game.player.body.position.Copy();
            let direction = GetVectorByAngle(newProjectile.iterator);
            direction.Multiply(newProjectile.distance);
            newPosition.AddVector(direction);

            newProjectile.body.position = newPosition;

            newProjectile.iterator += newProjectile.speed;
        }

        Game.entities.Add(newProjectile);
    }

    return weapon;
}