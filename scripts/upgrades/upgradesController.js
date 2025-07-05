
const UpgradesController = {
    
    rarities: [Rarities.Common, Rarities.Rare, Rarities.Epic, Rarities.Legendary],
    upgrades: [
        UpgradesBuilder.createHealthUpgrade(),
        UpgradesBuilder.createHealtRecoverUpgrade(),
        UpgradesBuilder.createBombUpgrade(),
        UpgradesBuilder.createBombSizeUpgrade(),
        UpgradesBuilder.createBombDamageUpgrade(),
        UpgradesBuilder.createSatelliteUpgrade(),
        UpgradesBuilder.createGunDamageUpgrade(),
        UpgradesBuilder.createSatelliteNumberUpgrade(),
        UpgradesBuilder.createWeaponsSpeedUpgrade(),
        UpgradesBuilder.createLegendaryWeaponsSpeedUpgrade(),
        UpgradesBuilder.createEpicExperienceUpgrade(),
        UpgradesBuilder.createGunExplosionupgrade(),
        UpgradesBuilder.createRareExperienceUpgrade(),
        UpgradesBuilder.createLegendaryExperienceUpgrade(),
        UpgradesBuilder.createMovementSpeedUpgrade()
    ],

    DeleteUpgrade(upgrade) {
        this.upgrades = this.upgrades.filter(u => u != upgrade);
    },

    GetRandomUpgrade() {
        while (true){
            for (let i in this.rarities)
            {
                const rarity = this.rarities[i];
                let randomNumber = Math.random();
                
                if (randomNumber > rarity.chance)
                    continue;
                
                let upgrades = this.upgrades.filter(u => u.rarity == rarity);
                if (upgrades.length == 0)
                    continue;

                let upgrade = upgrades[Math.floor(Math.random() * upgrades.length)];

                if (!upgrade.Condition(game))
                    continue;

                return upgrade;
            }
        }
    },

    GetUpgradeCart(upgrade) {

        const cart = document.createElement('div');
        cart.classList.add('upgrade');
        cart.classList.add(upgrade.rarity.name);

        cart.innerHTML = `
            <div class="upgrade-title-wrapper">
                <div class="upgrade-title ${upgrade.name.length > 17 ? 'marquee' : ''}">
                    ${upgrade.name}
                </div>
            </div>
            <div class="upgrade-description">
                <p>${upgrade.description}</p>
            </div>
            <div class="upgrade-rarity">${upgrade.rarity.name}</div>
        `;

        return cart;

    },

    ChoseUpgrade(upgrade) {

        const upgradeWindow = document.getElementById('upgradeWindow');

        upgrade.Use();

        if (upgrade.useNumber)
            upgrade.useNumber--;

        if (upgrade.useNumber != null && upgrade.useNumber <= 0)
            this.DeleteUpgrade(upgrade);

        Game.HideWindow(upgradeWindow);
        Game.Continue();
        Game.blockPause = false;
    },

    UpgradeDialog() {

        const upgradeWindow = document.getElementById('upgradeWindow');
        const upgradesContainer = document.getElementById('upgradesContainer');

        upgradesContainer.innerHTML = '';

        let chosed = [];
        
        for (let i = 0; i < Math.min(3, this.upgrades.length); i++) 
        {   
            let upgrade;
            do{
                upgrade = this.GetRandomUpgrade();
            } while (chosed.find(u => u.name == upgrade.name));
            chosed.push(upgrade);


            const cart = this.GetUpgradeCart(upgrade);

            cart.addEventListener('click', () => { this.ChoseUpgrade(upgrade);});

            upgradesContainer.appendChild(cart);
        }

        Game.Pause();
        Game.ShowWindow(upgradeWindow);
        Game.blockPause = true;
    }
}