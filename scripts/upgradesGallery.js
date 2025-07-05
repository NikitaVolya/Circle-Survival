
function loadRarities() {
    const selector = document.getElementById('rarityFilter');

    selector.innerHTML = '';
    selector.innerHTML += '<option value="">All Rarities</option>';

    for (let i in UpgradesController.rarities)
    {
        let raritie = UpgradesController.rarities[i];
        let title = raritie.name;
        title = title[0].toUpperCase() + title.substring(1, title.length);
        selector.innerHTML += `<option value="${raritie.name}">${title}</option>`;
    }
}

function getRarityValue(u) {
    let value = UpgradesController.rarities.indexOf(u.rarity);
    return value;
}

function compareUpgradesByName(u1, u2) {
    if (u1.name < u2.name)
        return -1;
    else if (u2.name < u1.name)
        return 1;
    return 0;
}

function compareUpgradesByRarities(u1, u2) {
    if (getRarityValue(u1) < getRarityValue(u2))
        return -1;
    else if (getRarityValue(u2) < getRarityValue(u1))
        return 1;
    return 0;
}

function renderCarts() {
    
    const rarityFilter = document.getElementById('rarityFilter');
    const sortingSelector = document.getElementById('sort');
    const container = document.getElementById('galleryContainer');
    container.innerHTML = '';

    let upgrades = UpgradesController.upgrades.filter(u => {
        return rarityFilter.value == '' || rarityFilter.value == u.rarity.name;
    });

    switch (sortingSelector.value) {
        case 'asc':
            upgrades = upgrades.sort(compareUpgradesByName);
            break;
        case 'desc':
            upgrades = upgrades.sort((u1, u2) => compareUpgradesByName(u2, u1));
            break;
        case 'rarity-asc':
            upgrades = upgrades.sort(compareUpgradesByRarities);
            break;
        case 'rarity-desc':
            upgrades = upgrades.sort((u1, u2) => compareUpgradesByRarities(u2, u1));
            break;
    }

    for (let i in upgrades) {
        let upgrade = upgrades[i];

        container.appendChild(UpgradesController.GetUpgradeCart(upgrade));
    }
}

document.addEventListener('DOMContentLoaded', () => {

    loadRarities();
    
    const rarityFilter = document.getElementById('rarityFilter');
    rarityFilter.value = "";

    const sortingSelector = document.getElementById('sort');
    sortingSelector.value = "";

    rarityFilter.addEventListener('change', renderCarts);
    sortingSelector.addEventListener('change', renderCarts);
    document.getElementById('backButton').addEventListener('click', () =>  window.location.href = 'index.html');

    renderCarts();
});