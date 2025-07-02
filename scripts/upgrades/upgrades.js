

function createRarity(name, chance)
{
    return {
        name: name,
        chance: chance
    }
}

const Rarities = {
    Common: createRarity('common', 0.75),
    Epic: createRarity('epic', 0.5),
    Legendary: createRarity('legendary', 0.35)
}

function createUpgrade() {
    return {
        name: 'none',
        description: 'none',
        rarity: null,
        useNumber: null,
        Condition(game) { return true; },

        Use(game) {

        }
    }
}

function createHealthUpgrade() {
    let upgrade = createUpgrade();

    upgrade.name = 'Health upgrade';
    upgrade.description = 'Add 10% to your health';
    upgrade.rarity = Rarities.Common;

    upgrade.Use = (game) => {
        let playerHeath = game.player.maxHeals;
        
        game.player.maxHeals *= 1.1;
        game.player.heals += playerHeath * 0.1;

    }
    return upgrade;
}

function createHealtRecoverUpgrade() {
    let upgrade = createUpgrade();

    upgrade.name = 'Health recover';
    upgrade.description = 'Recover 50% of your health';
    upgrade.rarity = Rarities.Common;

    upgrade.Use = (game) => {
        game.player.AddHeals(game.player.maxHeals * 0.5);
    }
    return upgrade;
}

function createBombUpgrade() {
    let upgrade = createUpgrade();

    upgrade.name = 'Bomb Weapon';
    upgrade.description = 'Adds a new weapon that creates an explosion to the player\'s injection and only damages enemies.\nTo use the weapon, press f';
    upgrade.rarity = Rarities.Common;
    upgrade.useNumber = 1;

    upgrade.Use = (game) => {
        game.player.weapons.push(createExplosionWeapon());
    }
    return upgrade;
}

function createBombSizeUpgrade() {
    let upgrade = createUpgrade();

    upgrade.name = 'Bomb size Upgrade';
    upgrade.description = 'Increase in the bomb blast radius by 5%';
    upgrade.rarity = Rarities.Epic;
    upgrade.useNumber = 5;

    upgrade.Condition = (game) => {
        return game.player.GetWeapon('bomb') != null;
    }

    upgrade.Use = (game) => {
        game.player.GetWeapon('bomb').ExplosionSize *= 1.05;
    }
    return upgrade;
}

function createBombDamageUpgrade() {
    let upgrade = createUpgrade();

    upgrade.name = 'Bomb damage Upgrade';
    upgrade.description = 'Increases bomb damage by 10%.';
    upgrade.rarity = Rarities.Epic;
    upgrade.useNumber = 8;

    upgrade.Condition = (game) => {
        return game.player.GetWeapon('bomb') != null;
    }

    upgrade.Use = (game) => {
        game.player.GetWeapon('bomb').ExplosionSize *= 1.1;
    }
    return upgrade;
}