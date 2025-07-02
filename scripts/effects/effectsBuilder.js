


const EffectsBuilder = {

    CreateEmptyEffect() {
        return {
            name: 'none',
            Init(game, entity) {

            },
            Update(game, entity) {

            },
            WhenDelete(game, entity) {

            }
        };
    },

    createDamageVisualEffect() {

        let effect = this.CreateEmptyEffect();

        effect.name = 'damageVisualEffect';
        effect.liveTime = 10;
        effect.damageColor = 'red';

        effect.Init = (game, entity) => {
            effect.entityBaseColor = entity.color;
            entity.color = effect.damageColor;
            effect.liveTime = game.lastTime + 50; 
        }

        effect.Update = (game, entity) => {
            if (effect.liveTime <= game.lastTime)
                entity.DeleteEffect(effect);
        }

        effect.WhenDelete = (game, entity) => {
            entity.color = effect.entityBaseColor;
        }
        
        return effect;
    }

}
