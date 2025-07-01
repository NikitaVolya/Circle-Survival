
function createBody(position, size) {
    return {
        position: position,
        rotation: GetVectorByAngle(0),
        velocity: Vector(0, 0),
        size: size,

        positionAbsolut: false,

        AddVelocity(vector) {
            this.velocity.AddVector(vector);
        },

        Move(game) {

            let deltaPosition = this.velocity.Copy();
            deltaPosition.Multiply(game.deltaTime);

            this.position.AddVector(deltaPosition);
            this.velocity.Multiply(0.80);


        },

        OnCollision(game, object) {

        },

        Collision(game) {
            for (let i in game.entities)
            {
                const entity = game.entities[i];
                if (entity.body === this)
                    continue;
                    
                let deltaVector = this.position.GetVectorTo(entity.body.position);

                let length = deltaVector.Length();
                let colisionDistance = this.size + entity.body.size;

                if (length < colisionDistance && length != 0)
                {
                    if (!this.positionAbsolut && !entity.body.positionAbsolut)
                    {   
                        deltaVector.Multiply(-1 / length / length);
                        this.AddVelocity(deltaVector);
                    }
                    
                    this.OnCollision(game, entity);
                }
            }
            
        },

        Update(game) {
            this.Collision(game);
            this.Move(game);
        }
    }
};


function createObject() {
    return {
        name: 'object',
        color: 'gray',
        speed: 0.1,
        body: createBody(Vector(20, 20), 20),

        LogicUpdate(game) {

        },

        Update(game) {
            
            this.LogicUpdate(game);
            this.body.Update(game);
        },

        Draw(game) {
            game.ctx.beginPath();
            game.ctx.arc(this.body.position.x, this.body.position.y, this.body.size, 0, 2 * Math.PI);
            game.ctx.fillStyle = this.color;
            game.ctx.fill();
        }
    }
}


function createEntity() {
    let object = createObject();

    object.heals = 1;
    object.maxHeals = 1;
    object.name = 'entity';

    object.SetMaxHeals = (number) => {
        object.maxHeals = number;
        object.heals = number;
    }

    

    object.Update = (game) => {
        object.LogicUpdate(game);
        object.body.Update(game);

        if (object.heals <= 0)
        {
            game.Kill(object);
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
        
        if (entity.name != 'projectile')
            entity.heals -= 1;
        else 
            game.Kill(entity);
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