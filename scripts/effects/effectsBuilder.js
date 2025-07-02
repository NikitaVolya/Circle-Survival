


const EffectsBuilder = {

    CreateEmptyEffect() {
        return {
            name: 'none',
            Init(entity) {

            },
            Update(entity) {

            },
            WhenDelete(entity) {

            }
        };
    },

    createDamageVisualEffect() {

        let effect = this.CreateEmptyEffect();

        effect.name = 'damageVisualEffect';
        effect.liveTime = 10;
        effect.damageColor = 'red';

        effect.Init = (entity) => {
            effect.entityBaseColor = entity.color;
            entity.color = effect.damageColor;
            effect.liveTime = Game.lastTime + 50; 
        }

        effect.Update = (entity) => {
            if (effect.liveTime <= Game.lastTime)
                entity.DeleteEffect(effect);
        }

        effect.WhenDelete = (entity) => {
            entity.color = effect.entityBaseColor;
        }
        
        return effect;
    }

}
