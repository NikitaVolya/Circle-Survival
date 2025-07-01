
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