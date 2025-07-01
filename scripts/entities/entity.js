

function createEntity() {
    let object = createObject();

    object.heals = 1;
    object.maxHeals = 1;
    object.name = 'entity';

    object.SetMaxHeals = (number) => {
        object.maxHeals = number;
        object.heals = number;
    }

    object.WhenDie = (game) => {
        
    };

    object.Die = (game) => {
        object.WhenDie(game);
        game.Kill(object);
    }

    object.Update = (game) => {
        object.LogicUpdate(game);
        object.body.Update(game);

        if (object.heals <= 0)
        {
            object.Die(game);
            return;
        }
    };

    object.DrawHealsBar = (game) => {
        if (object.heals == object.maxHeals)
            return;
        
        const barPos = object.body.position.Copy();
        barPos.Add(-object.body.size, -object.body.size * 2.5);

        let barsize = object.body.size * 2;
        let livesProc = Math.max(object.heals, 0) / object.maxHeals

        game.ctx.beginPath();
        game.ctx.rect(barPos.x, barPos.y, barsize * livesProc, 10);
        game.ctx.fill();

        game.ctx.beginPath();
        game.ctx.rect(barPos.x, barPos.y, barsize * livesProc + 1, 10);
        game.ctx.rect(barPos.x, barPos.y, barsize, 10);
        game.ctx.stroke();
    }

    object.Draw = (game) => {
        
        game.ctx.beginPath();
        game.ctx.arc(object.body.position.x, object.body.position.y, object.body.size, 0, 2 * Math.PI);
        game.ctx.fillStyle = object.color;
        game.ctx.fill();

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

            game.ctx.beginPath();
            game.ctx.arc(fistPosition.x, fistPosition.y, object.body.size / 2.5, 0, 2 * Math.PI);
            game.ctx.fillStyle = object.color;
            game.ctx.fill();
        }

        object.DrawHealsBar(game);
    }

    return object;
}