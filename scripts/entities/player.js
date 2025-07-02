
function PlayerMovment(player, game) {
    const moveVector = Vector(0, 0);
    
    if (game.keys[87])
        moveVector.Add(0, -1);
    if (game.keys[83])
        moveVector.Add(0, 1);
    if (game.keys[65])
        moveVector.Add(-1, 0);
    if (game.keys[68])
        moveVector.Add(1, 0);
    
    moveVector.Normalize();
    moveVector.Multiply(player.speed);

    player.body.AddVelocity(moveVector);
}

function PlayerRotation(player, game) {

    let direction = player.body.position.GetDirectionTo(game.mousePosition);

    player.body.rotation = direction;
}


function createPlayer() {

    let entity = createEntity();
    entity.name = 'player';
    entity.SetMaxHeals(10);

    entity.progressionController = createProgressionController();

    entity.weapons = [
        createGunWeapon()
    ];

    entity.GetWeapon = (name) => {
        for (let i in game.player.weapons)
        {
            const weapon = game.player.weapons[i];
            if (weapon.name == 'bomb')
                return weapon;
        }
        return null;
    }


    entity.LogicUpdate = (game) => {
        
        PlayerMovment(entity, game);
        PlayerRotation(entity, game);
        entity.progressionController.Update(game);
        
        for (let i in entity.weapons)
        {
            const weapon = entity.weapons[i];
            weapon.Update(game, entity);
        }
    }


    return entity;
}