
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

