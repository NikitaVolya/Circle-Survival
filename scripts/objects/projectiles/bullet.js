

function createBullet(owner, filter, position, direction) {
    
    let object = ObjectsBuilder.CreateObject();

    object.name = 'projectile';
    object.owner = owner;
    object.speed = 0.2;
    object.filter = filter;
    object.deadTime = game.lastTime + 1000;

    object.body.speed = 1;
    object.body.size = 5;
    object.body.position = position;
    object.damage = 1;
    object.body.direction = direction;
    object.body.positionAbsolut = true;

    object.SetLiveTime = (number) => {
        object.deadTime = Game.lastTime + number;
    }

    object.body.OnCollision = (entity) => {
        
        if (!object.filter(entity))
            return;

        switch (entity.name)
        {
            case 'projectile':
                if (entity.owner == object.owner)
                    return;
                Game.entities.Remove(entity);
                break;
            case 'entity': case 'player':
                entity.TakeDamage(object.damage);
                entity.AddEffect(EffectsBuilder.createDamageVisualEffect());
                break;
        }
        
        Game.entities.Remove(object);
    }

    object.MoveUpdate = () => {
        let impulse = object.body.direction.Copy();
        impulse.Multiply(object.speed);

        object.body.AddVelocity(impulse);
    }

    object.LogicUpdate = () => {

        object.MoveUpdate();

        if (object.deadTime <= Game.lastTime)
        {
            Game.entities.Remove(object);
        }
    }

    return object;
}