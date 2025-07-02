
function createWeapon() {

    return { 
        name: 'none',
        keyBind: null,
        displayKey: '',
        cooldown: 0,
        nextActivate: 0,

        Activate(game, player) {

        },

        Update(game, player) {
            if (game.keys[this.keyBind] && this.nextActivate <= game.lastTime)
            {
                this.Activate(game, player);
                this.nextActivate = game.lastTime + this.cooldown;
            }
        }
    }
}