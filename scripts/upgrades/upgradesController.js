
function createUpgradesController() {

    return {
        rarities: [Rarities.Common, Rarities.Epic, Rarities.Legendary],
        upgrades: [
            createHealthUpgrade(),
            createBombUpgrade(),
            createHealtRecoverUpgrade(),
            createBombSizeUpgrade(),
            createBombDamageUpgrade(),
        ],

        DeleteUpgrade(upgrade) {
            this.upgrades = this.upgrades.filter(u => u != upgrade);
        },

        GetRandomUpgrade() {
            while (true){
                for (let i in this.rarities)
                {
                    const rarity = this.rarities[i];
                    if (Math.random() > rarity.chance)
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

            cart.innerHTML = `
                <h2>${upgrade.name}</h2>
                <b>${upgrade.rarity.name}</b>
                <p>${upgrade.description}</p>
            `;

            return cart;

        },

        ChoseUpgrade(upgrade, game) {

            const upgradeWindow = document.getElementById('upgradeWindow');

            upgrade.Use(game);

            if (upgrade.useNumber)
                upgrade.useNumber--;

            if (upgrade.useNumber != null && upgrade.useNumber <= 0)
                this.DeleteUpgrade(upgrade);

            upgradeWindow.style.display = 'none';
            game.Continue();
        },

        UpgradeDialog(game) {

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

                cart.addEventListener('click', () => { this.ChoseUpgrade(upgrade, game);});

                upgradesContainer.appendChild(cart);
            }

            game.Pause();
            upgradeWindow.style.display = 'block';
        }
    }
}