


const EffectsBuilder = {

    CreateEmptyEffect() {
        return {
            liveTime: null,
            name: 'none',
            Init(entity) {

            },
            LogicUpdate(entity) {

            },
            Update(entity) {
                if(!entity)
                    return;

                this.LogicUpdate(entity);
                if (this.liveTime != null)
                {
                    if (this.liveTime <= 0)
                    {
                        entity.effects.Remove(this);
                    }
                    this.liveTime -= Game.deltaTime;
                }
            },
            WhenDie(entity) {

            }
        };
    },

    createDamageVisualEffect() {

        let effect = this.CreateEmptyEffect();

        effect.name = 'damageVisualEffect';
        effect.liveTime = 100;
        effect.damageColor = 'red';

        effect.Init = (entity) => {
            entity.color = effect.damageColor;
        }

        effect.WhenDie = (entity) => {
            entity.color = entity.baseColor;
        }
        
        return effect;
    },

    CreateReloadWeaponEffect(f) {
        let effect = this.CreateEmptyEffect();

        effect.name = 'reloadWeaponSpeedEffect';
        effect.weapons = [];

        effect.LogicUpdate = (entity) => {

            entity.weapons.ForEach(weapon => {

                if (effect.weapons.includes(weapon))
                    return;

                const reloadMethod = weapon.Reload;

                weapon.Reload = () => {
                    reloadMethod(weapon);
                    f(weapon);
                }

                effect.weapons.push(weapon);
            });
        } 

        return effect;
    }

}
