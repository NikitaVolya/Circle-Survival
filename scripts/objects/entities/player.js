
const Player = {
    
}

function PlayerMovment(player) {
    const moveVector = Vector(0, 0);
    
    if (Game.keys[87])
        moveVector.Add(0, -1);
    if (Game.keys[83])
        moveVector.Add(0, 1);
    if (Game.keys[65])
        moveVector.Add(-1, 0);
    if (Game.keys[68])
        moveVector.Add(1, 0);
    
    moveVector.Normalize();
    moveVector.Multiply(player.speed);

    player.body.AddVelocity(moveVector);
}

function PlayerRotation(player) {

    let direction = player.body.position.GetDirectionTo(Game.mousePosition);

    player.body.rotation = direction;
}


function createPlayer() {

    let entity = createEntity();

    entity.name = 'player';
    entity.SetMaxHeals(10);

    entity.progressionController = createProgressionController();

    entity.weapons = CreateObjectsContainer();
    entity.weapons.Add(createGunWeapon());
    
    entity.WhenDie = () => {
        Game.Pause();
        Game.ShowGameOverWindow();
    }


    entity.LogicUpdate = () => {
        
        PlayerMovment(entity);
        PlayerRotation(entity);
        
        entity.progressionController.Update();
        entity.weapons.UpdateAll(w => w.Update(entity), () => {});
    }

    return entity;
}