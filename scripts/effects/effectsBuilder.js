


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
                this.LogicUpdate(entity);
                if (this.liveTime != null)
                {
                    if (this.liveTime <= 0)
                    {
                        entity.DeleteEffect(this);
                    }
                    this.liveTime -= Game.deltaTime;
                }
            },
            WhenDelete(entity) {

            }
        };
    },

    createDamageVisualEffect() {

        let effect = this.CreateEmptyEffect();

        effect.name = 'damageVisualEffect';
        effect.liveTime = 100;
        effect.damageColor = 'red';

        effect.Init = (entity) => {
            effect.entityBaseColor = entity.color;
            entity.color = effect.damageColor;
        }

        effect.WhenDelete = (entity) => {
            entity.color = effect.entityBaseColor;
        }
        
        return effect;
    }

}
