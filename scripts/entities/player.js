
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

function Action(player, game) {
    if (game.mouseClick)
    {
        let position = player.body.position.Copy();
        let direction = player.body.rotation.Copy();

        let newProjectile = createProjectile((e) => e != player, position, direction);
        
        game.entities.push(newProjectile);
    }
}

function createPlayer() {

    let entity = createEntity();
    entity.name = 'player';
    entity.SetMaxHeals(10);

    entity.progressionController = createProgressionController();

    entity.LogicUpdate = (game) => {
        
        PlayerMovment(entity, game);
        PlayerRotation(entity, game);
        Action(entity, game);
    }


    return entity;
}