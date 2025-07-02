
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

        Move() {

            let deltaPosition = this.velocity.Copy();
            deltaPosition.Multiply(Game.deltaTime);

            this.position.AddVector(deltaPosition);
            this.velocity.Multiply(0.80);
        },

        OnCollision(object) {

        },

        Collision() {
            Game.entities.ForEach((entity) => {
                
                if (entity.body === this)
                    return;
                    
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
                    
                    this.OnCollision(entity);
                }
            });
            
            
        },

        Update() {
            this.Collision();
            this.Move();
        }
    }
};

