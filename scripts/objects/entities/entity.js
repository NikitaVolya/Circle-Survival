

function createEntity() {
    let object = ObjectsBuilder.CreateObject();

    object.heals = 1;
    object.maxHeals = 1;
    object.name = 'entity';
    object.baseColor = object.color;

    object.effects = CreateObjectsContainer();

    object.SetColor = (color) => {
        object.color = color;
        object.baseColor = color;
    }

    object.AddEffect = (effect) => {
        object.effects.Add(effect);
        effect.Init(object);
    }

    object.AddHeals = (number) => {
        object.heals = Math.min(object.heals + number, object.maxHeals);
    }

    object.SetMaxHeals = (number) => {
        object.maxHeals = number;
        object.heals = number;
    }

    object.TakeDamage = (number) => {
        
        object.heals -= number;
        object.AddEffect(EffectsBuilder.createDamageVisualEffect());
    }

    object.Die = () => {
        Game.entities.Remove(object);
    }

    object.Update = (game) => {

        object.LogicUpdate();
        object.body.Update();
        object.effects.UpdateAll(effect => effect.Update(object), effect => effect.WhenDie(object));

        if (object.heals <= 0)
        {
            object.Die();
            return;
        }
    };

    object.DrawHealsBar = () => {
        if (object.heals == object.maxHeals)
            return;
        
        const barPos = object.body.position.Copy();
        barPos.Add(-object.body.size, -object.body.size * 2.5);

        let barsize = object.body.size * 2;
        let livesProc = Math.max(object.heals, 0) / object.maxHeals

        Game.ctx.beginPath();
        Game.ctx.rect(barPos.x, barPos.y, barsize * livesProc, 10);
        Game.ctx.fill();

        Game.ctx.beginPath();
        Game.ctx.rect(barPos.x, barPos.y, barsize * livesProc + 1, 10);
        Game.ctx.rect(barPos.x, barPos.y, barsize, 10);
        Game.ctx.stroke();
    }

    object.Draw = () => {
        
        Game.ctx.beginPath();
        Game.ctx.arc(object.body.position.x, object.body.position.y, object.body.size, 0, 2 * Math.PI);
        Game.ctx.fillStyle = object.color;
        Game.ctx.fill();

        let rotationPoint = object.body.rotation.Copy();
        rotationPoint.Multiply(object.body.size);
        rotationPoint.AddVector(object.body.position);

        for (let i = -1; i <= 1; i++)
        {
            if (i == 0)
                continue
            let fistPosition = rotationPoint.Copy();
            let slide = object.body.rotation.Copy();
            slide.RotateByRadians(90 * -i);
            slide.Multiply(object.body.size);
            fistPosition.AddVector(slide);

            Game.ctx.beginPath();
            Game.ctx.arc(fistPosition.x, fistPosition.y, object.body.size / 2.5, 0, 2 * Math.PI);
            Game.ctx.fillStyle = object.color;
            Game.ctx.fill();
        }

        object.DrawHealsBar();
    }

    return object;
}