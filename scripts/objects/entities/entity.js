

function createEntity() {
    let object = ObjectsBuilder.CreateObject();

    object.heals = 1;
    object.maxHeals = 1;
    object.name = 'entity';

    object.effects = [];
    object.effectsToDelete = [];

    object.AddEffect = (effect) => {
        if (object.effects.find(ef => ef.name == effect.name))
            return;
        effect.Init(object);
        object.effects.push(effect);
    };

    object.DeleteEffect = (effect) => {
        if (object.effectsToDelete.indexOf(effect) != -1)
            return;
        object.effectsToDelete.push(effect);
    }

    object.UpdateEffects = () => {

        for (let i in object.effects)
        {
            let effect = object.effects[i];
            effect.Update(object);
        }
        for (let i in object.effectsToDelete) 
        {
            let effect = object.effectsToDelete[i];
            effect.WhenDelete(object);
        }   

        object.effects = object.effects.filter(ef => object.effectsToDelete.indexOf(ef) == -1);
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
        object.WhenDie();
        Game.entities.Remove(object);
    }

    object.Update = (game) => {

        object.LogicUpdate();
        object.body.Update();
        object.UpdateEffects();

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