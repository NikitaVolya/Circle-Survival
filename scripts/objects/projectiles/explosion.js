
function createExplosion(speed, damage, size) {
    let object = ObjectsBuilder.CreateObject();

    let position = Game.player.body.position.Copy();

    let iteration = 0;

    object.body.position = position;
    object.color = 'rgba(150, 150, 150, 0.5)';
    object.body.positionAbsolut = true;
    object.body.size = 1;

    object.body.OnCollision = (entity) => {
        if (entity == Game.player || entity.name != 'entity')
            return;
        entity.TakeDamage(damage * Game.deltaTime / speed);
    }

    object.LogicUpdate = () => {
        
        iteration += Game.deltaTime / speed;

        object.body.size = Math.max(Math.sin(iteration * Math.PI) * size, 0);

        if (iteration >= 1)
            Game.entities.Remove(object);
    }

    return object;
}