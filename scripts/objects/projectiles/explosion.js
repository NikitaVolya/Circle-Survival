
function createExplosion(position) {
    let object = ObjectsBuilder.CreateObject();

    object.iteration = 0;

    object.name = 'explosion';

    object.body.position = position.Copy();
    object.color = 'rgba(150, 150, 150, 0.5)';

    object.body.positionAbsolut = true;

    object.body.size = 1;
    object.explosionSize = 180;
    object.explosionDamage = 4;
    object.explosionDuration = 200;

    object.filter = (entity) => { return entity.name == 'entity' || entity.name == 'player'; };

    object.body.OnCollision = (entity) => {
        if (!object.filter(entity)) return;
        entity.TakeDamage(object.explosionDamage * Game.deltaTime / object.explosionDuration);
    }

    object.LogicUpdate = () => {
        
        object.iteration += Game.deltaTime / object.explosionDuration;

        object.body.size = Math.max(Math.sin(object.iteration * Math.PI) * object.explosionSize, 0);

        if (object.iteration >= 1)
            Game.entities.Remove(object);
    }

    return object;
}