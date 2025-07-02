

function createProjectile(filter, position, direction) {
    
    let object = createObject();

    object.name = 'projectile';
    object.speed = 0.2;
    object.filter = filter;
    object.deadTime = game.lastTime + 1000;

    object.body.size = 5;
    object.body.position = position;
    object.body.direction = direction;
    object.body.positionAbsolut = true;

    object.SetLiveTime = (number) => {
        object.deadTime = game.lastTime + number;
    }

    object.body.OnCollision = (game, entity) => {
        
        if (!object.filter(entity))
            return;

        switch (entity.name)
        {
            case 'projectile':
                game.Kill(entity);
                break;
            case 'coin':
                break;
            case 'entity':
                entity.heals -= 1;
                entity.AddEffect(game, EffectsBuilder.createDamageVisualEffect());
                break;
        }
        
        game.Kill(object);
    }

    object.LogicUpdate = (game) => {

        let impulse = direction.Copy();
        impulse.Multiply(object.speed);

        object.body.AddVelocity(impulse);

        if (object.deadTime <= game.lastTime)
        {
            game.Kill(object);
        }
    }

    return object;
}