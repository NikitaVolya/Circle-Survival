

function createBullet(filter, position, direction) {
    
    let object = ObjectsBuilder.CreateObject();

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

    object.body.OnCollision = (entity) => {
        
        if (!object.filter(entity))
            return;

        switch (entity.name)
        {
            case 'projectile':
                Game.entities.Remove(entity);
                break;
            case 'entity': case 'player':
                entity.TakeDamage(1);
                entity.AddEffect(EffectsBuilder.createDamageVisualEffect());
                break;
        }
        
        Game.entities.Remove(object);
    }

    object.LogicUpdate = () => {

        let impulse = direction.Copy();
        impulse.Multiply(object.speed);

        object.body.AddVelocity(impulse);

        if (object.deadTime <= Game.lastTime)
        {
            Game.Kill(object);
        }
    }

    return object;
}