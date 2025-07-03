
function createSatelliteWeapon() {

    let weapon = createWeapon();

    weapon.name = 'satellite';
    weapon.displayKey = ''
    weapon.keyBind = 'passive';
    weapon.cooldown = 8000;

    weapon.satelliteSpeed = 1.2;
    weapon.satellitesNumber = 1;


    weapon.Activate = (player) => {
        let position = player.body.position.Copy();
        let direction = player.body.rotation.Copy();

        for (let i = 0; i < weapon.satellitesNumber; i++)
        {
            let newProjectile = createBullet(player, (e) => e != player, position, direction);

            newProjectile.SetLiveTime(2000);
            newProjectile.body.size = 10;
            newProjectile.owner = player;

            newProjectile.iterator = 0;
            newProjectile.distance = 50;
            newProjectile.speed = weapon.satelliteSpeed;

            newProjectile.MoveUpdate = () => {
                let newPosition = Game.player.body.position.Copy();
                let direction = GetVectorByAngle(newProjectile.iterator);
                direction.Multiply(newProjectile.distance);
                newPosition.AddVector(direction);

                newProjectile.body.position = newPosition;

                newProjectile.iterator += newProjectile.speed;
            }

            Game.AddDelay(() => Game.entities.Add(newProjectile), i * 500);
        }

        
    }

    return weapon;
}