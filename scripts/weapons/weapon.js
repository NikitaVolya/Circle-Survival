
function createWeapon() {

    return { 
        name: 'none',
        keyBind: null,
        displayKey: '',
        cooldown: 0,
        nextActivate: 0,

        Activate(player) {

        },

        Reload(weapon) {
            weapon.nextActivate = weapon.cooldown;
        },

        Update(player) {
            if (Game.keys[this.keyBind] && this.nextActivate <= 0)
            {
                this.Activate(player);
                this.Reload(this);
            }
            this.nextActivate -= Game.deltaTime;
        }
    }
}