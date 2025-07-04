
function createWeapon() {

    return { 
        name: 'none',
        keyBind: null,
        displayKey: '',
        cooldown: 0,
        nextActivate: 0,

        Activate(player) {

        },

        Update(player) {
            if (Game.keys[this.keyBind] && this.nextActivate <= 0)
            {
                this.Activate(player);
                this.nextActivate = this.cooldown;
            }
            this.nextActivate -= Game.deltaTime;
        }
    }
}