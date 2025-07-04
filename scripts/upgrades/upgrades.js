
function createRarity(name, chance)
{
    return {
        name: name,
        chance: chance
    }
}

const Rarities = {
    Common: createRarity('common', 0.6),
    Rare: createRarity('rare', 0.35),
    Epic: createRarity('epic', 0.2),
    Legendary: createRarity('legendary', 0)
}

const UpgradesBuilder = {

    createEmptyUpgrade() {
        return {
            name: 'none',
            description: 'none',
            rarity: null,
            useNumber: null,

            Condition() { return true; },
            Use() { }
        }
    },

    createHealthUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Health upgrade';
        upgrade.description = 'Add 10% to your health';
        upgrade.rarity = Rarities.Common;

        upgrade.Use = () => {
            let playerHeath = Game.player.maxHeals;
            
            Game.player.maxHeals *= 1.1;
            Game.player.heals += playerHeath * 0.1;

        }
        return upgrade;
    },

    createHealtRecoverUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Health recover';
        upgrade.description = 'Recover 30% of your health';
        upgrade.rarity = Rarities.Common;

        upgrade.Use = () => {
            Game.player.AddHeals(Game.player.maxHeals * 0.3);
        }
        return upgrade;
    },

    createBombUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Bomb Weapon';
        upgrade.description = 'Adds a new weapon that creates an explosion to the player\'s injection and only damages enemies.\nTo use the weapon, press f';
        upgrade.rarity = Rarities.Rare;
        upgrade.useNumber = 1;

        upgrade.Use = () => {
            Game.player.weapons.Add(createBombWeapon());
        }
        return upgrade;
    },

    createBombSizeUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Bomb size Upgrade';
        upgrade.description = 'Increase in the bomb blast radius by 5%';
        upgrade.rarity = Rarities.Epic;
        upgrade.useNumber = 5;

        upgrade.Condition = () => {
            return Game.player.weapons.GetByName('bomb') != null;
        }

        upgrade.Use = () => {
            Game.player.weapons.GetByName('bomb').ExplosionSize *= 1.05;
        }

        return upgrade;
    },

    createBombDamageUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Bomb damage Upgrade';
        upgrade.description = 'Increases bomb damage by 10%.';
        upgrade.rarity = Rarities.Epic;
        upgrade.useNumber = 8;

        upgrade.Condition = () => {
            return Game.player.weapons.GetByName('bomb') != null;
        }

        upgrade.Use = () => {
            Game.player.weapons.GetByName('bomb').ExplosionSize *= 1.1;
        }
        return upgrade;
    },

    createSatelliteUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Satellite weapon';
        upgrade.description = 'Adds a new weapon that passively creates satellites to the player\'s injection';
        upgrade.rarity = Rarities.Rare;
        upgrade.useNumber = 1;

        upgrade.Use = () => {
            Game.player.weapons.Add(createSatelliteWeapon());
        }
        return upgrade;
    },

    createGunDamageUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Gun damage Upgrade';
        upgrade.description = 'Increases gun damage by 5%.';
        upgrade.rarity = Rarities.Common;

        upgrade.Use = () => {
            Game.player.weapons.GetByName('gun').bulletDamage *= 1.05;
        }
        return upgrade;
    },

    createSatelliteNumberUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Gives +1 satellite';
        upgrade.description = 'Adds another spinning satellite to the player\'s injection.';
        upgrade.rarity = Rarities.Rare;
        upgrade.useNumber = 9;

        upgrade.Condition = () => {
            return Game.player.weapons.GetByName('satellite') != null;
        }

        upgrade.Use = () => {
            Game.player.weapons.GetByName('satellite').satellitesNumber++;
        }

        return upgrade;
    },

    createWeaponsSpeedUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Weapon acceleration';
        upgrade.description = 'Speeds up the recovery rate of all available weapons by 0.1 seconds.';
        upgrade.rarity = Rarities.Epic;
        upgrade.useNumber = 2;

        upgrade.Use = () => {
            Game.player.effects.Add(
                EffectsBuilder.CreateReloadWeaponEffect( (w) => {
                        w.nextActivate -= 100;
                    })
            );
        }

        return upgrade;
    },

    createLegendaryWeaponsSpeedUpgrade() {
        let upgrade = this.createEmptyUpgrade();

        upgrade.name = 'Weapon acceleration';
        upgrade.description = 'Speeds up the recovery rate of all available weapons by 30%.';
        upgrade.rarity = Rarities.Legendary;
        upgrade.useNumber = 1;


        upgrade.Use = () => {
            
            Game.player.effects.Add(
                EffectsBuilder.CreateReloadWeaponEffect( (w) => {
                        w.nextActivate *= 0.7;
                    })
            );

        }

        return upgrade;
    }
}   