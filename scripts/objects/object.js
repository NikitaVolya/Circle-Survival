
const ObjectsBuilder = {
    globalId: 0,

    CreateObject() {
        return {
            id: this.globalId++,
            name: 'object',
            color: 'gray',
            speed: 0.1,
            body: createBody(Vector(20, 20), 20),

            LogicUpdate() { },

            WhenDie() { },

            Update() {
                this.LogicUpdate();
                this.body.Update();
            },

            Draw() {
                Game.ctx.beginPath();
                Game.ctx.arc(this.body.position.x, this.body.position.y, this.body.size, 0, 2 * Math.PI);
                Game.ctx.fillStyle = this.color;
                Game.ctx.fill();
            }
        }
    },
}
