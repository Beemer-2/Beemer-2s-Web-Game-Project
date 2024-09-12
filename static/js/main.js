"strict mode"
console.log("does this work");


//Initialises variables
let numberOfLumberjacks = 1;
let numberOfMines = 0;
let numberOfLogCabins = 1;
let numberOfSawmills = 0;
let housingSpace = 3;
let currentVillagers = 1;
let currentWorkers = 1;
let numberOfSmallPlankHouses = 0;

let logs = 0;
let stone = 0;
let gold = 0;
let coal = 0;
let iron = 0;
let planks = 0;

let boughtSturdierAxeUpgrade = false;
let boughtStrengthTrainingUpgrade = false;
let boughtLogCabinRearrangementUpgrade = false;
let boughtBiggerMinecartUpgrade = false;

let logMultiplier = 0;
//let workerMultiplier = 1; //Replaced with global multiplier temporarily
let globalMultiplier = 1;
let stoneMultiplier = 0;


//Prepares arrays for disabling and enabling of menus and their items
let shopElements = document.getElementById("shop").getElementsByTagName('*');
let upgradeMenuElements = document.getElementById("upgrades").getElementsByTagName('*');


//Shop
let shopEnabled = false;


//Disables menus so they don't appear when loading site.
document.getElementById("upgrades").style.opacity = 0;
document.getElementById("upgrades").style.display = "none";

document.getElementById("shop").style.opacity = 0;
document.getElementById("shop").style.display = "none";

for(var i = 0; i < shopElements.length; i++){
        shopElements[i].disabled = true;
}

for(var i = 0; i < upgradeMenuElements.length; i++){
        upgradeMenuElements[i].disabled = true;
}



//Button to open shop.
//The for loop disables every item
document.getElementById("enter-shop-button").addEventListener("click", function(){
    
    document.getElementById("shop").disabled = false;
    document.getElementById("shop").style.display = "grid";
    document.getElementById("shop").style.opacity = 1;                    
    console.log("opened!")
    
    for(var i = 0; i < shopElements.length; i++){
        shopElements[i].disabled = false;
    }
})

//Closes the shop.
//Display none stops the object from messing with other menu buttons by overlapping them
document.getElementById("close-shop-button").addEventListener("click", function(){
    console.log("clicked");
    document.getElementById("shop").style.opacity = 0;
    document.getElementById("shop").style.display = "none";
    
    for(var i = 0; i < shopElements.length; i++){
        shopElements[i].disabled = true;
    }

})


//Same as above but for upgrade menu
document.getElementById("enter-upgrade-menu-button").addEventListener("click", function(){
    
    document.getElementById("upgrades").disabled = false;
    document.getElementById("upgrades").style.display = "grid";
    document.getElementById("upgrades").style.opacity = 0.8;
    
    console.log("opened!")
    
    for(var i = 0; i < upgradeMenuElements.length; i++){
        upgradeMenuElements[i].disabled = false;
    }
})

document.getElementById("close-upgrade-menu-button").addEventListener("click", function(){
    console.log("clicked");
    document.getElementById("upgrades").style.opacity = 0;
    document.getElementById("upgrades").style.display = "none";
    
    for(var i = 0; i < upgradeMenuElements.length; i++){
        upgradeMenuElements[i].disabled = true;
    }

})



//old code
/*(Array.from(document.getElementsByClassName("purchase-buttons")).forEach(element => {
    element.addEventListener("click", function() {
        console.log("clicked");
    })
});*/

//worker cost for all purchases
document.getElementById("lumberjack-worker-cost").innerHTML = '<span class="current-worker-amount">0</span>' + " / " + 1;
document.getElementById("mine-worker-cost").innerHTML = '<span class="current-worker-amount">0</span>' + " / " + 1;
document.getElementById("sawmill-worker-cost").innerHTML = '<span class="current-worker-amount">0</span>' + " / " + 2;



//purchases
document.getElementById("purchase-lumberjack-button").addEventListener("click", function(){
    //checks to see if the number of logs is greater than a certain amount and if there are enough available workers before making a new lumberjack.
    if (logs >= 50 * numberOfLumberjacks && currentVillagers - currentWorkers > 0) {
        
        console.log("added lumberjack");
        currentWorkers += 1
        logs -= 50 * numberOfLumberjacks;
        numberOfLumberjacks += 1;
        console.log(numberOfLumberjacks, "lumberjacks")
        let lumberImage = document.createElement("img");
        lumberImage.src = "../static/assets/LumberMan.gif";
        document.getElementById("city").appendChild(lumberImage);
        document.getElementById("lumberjack-log-cost").innerHTML = '<span class="current-log-amount">0</span>' + " / " + 50 * numberOfLumberjacks;
        document.getElementById("worker-count").innerHTML = "Current Workers: " + currentWorkers;
    }                    
});


document.getElementById("purchase-mine-button").addEventListener("click", function() {

    if (logs >= 80 * (numberOfMines + 1)) {
        if (currentVillagers - currentWorkers > 0) {
            console.log("added mine");
            currentWorkers += 1
            logs -= 80 * (numberOfMines + 1);
            numberOfMines += 1;
            console.log(numberOfMines, "mines");
            let mineImage = document.createElement("img");
            mineImage.src = "../static/assets/Mine-Large.png";
            document.getElementById("city").appendChild(mineImage);
            document.getElementById("mine-log-cost").innerHTML = '<span class="current-log-amount">0</span>' + " / " + 80 * (numberOfMines + 1);
            document.getElementById("worker-count").innerHTML = "Current Workers: " + currentWorkers;
            //Adds planks to resources display at top. This is done to show what is unlocked next.
            if (numberOfMines == 1) {
                console.log(numberOfMines);
                let planksImg = document.createElement("img");
                planksImg.src = "../static/assets/Plank.png";
                document.getElementById("resource-stats").appendChild(planksImg);
                let planksP = document.createElement("p");
                planksP.classList.add("stat");
                planksP.id = "planks";
                planksP.innerText = "Planks: 0";
                document.getElementById("resource-stats").appendChild(planksP);
            }

        } else {
            //Display "not enough available villagers" text in red above buy button when no villagers available to work.
        }

    }
});


document.getElementById("purchase-sawmill-button").addEventListener("click", function() {
    if (logs >= 1000 * (numberOfSawmills + 1) && stone >= 100 * (numberOfSawmills + 1) && iron >= 20 * (numberOfSawmills + 1)) {
        if (currentVillagers - currentWorkers >= 2) {
            console.log("added sawmill");
            currentWorkers += 2
            logs -= 1000 * (numberOfSawmills + 1);
            stone -= 100 * (numberOfSawmills + 1);
            iron -= 20 * (numberOfSawmills + 1);
            numberOfSawmills += 1;
            console.log(numberOfSawmills, "sawmills");
            let sawmillImage = document.createElement("img");
            sawmillImage.src = "../static/assets/Sawmill.png";
            document.getElementById("city").appendChild(sawmillImage);
            document.getElementById("sawmill-log-cost").innerHTML = '<span class="current-log-amount">0</span>' + " / " + 1000 * (numberOfSawmills + 1);
            document.getElementById("sawmill-stone-cost").innerHTML = '<span class="current-stone-amount">0</span>' + " / " + 100 * (numberOfSawmills + 1);
            document.getElementById("sawmill-iron-cost").innerHTML = '<span class="current-iron-amount">0</span>' + " / " + 20 * (numberOfSawmills + 1) ;
            document.getElementById("worker-count").innerHTML = "Current Workers: " + currentWorkers;
            
            /* ADD NEXT RESOURCE TEASER
            if (numberOfMines == 1) {
                console.log(numberOfMines)
                let  = document.createElement("p");
                .textContent = "Planks: 0";
                document.getElementById("display").appendChild(planksP);
            }*/

        } else {
            //Display "not enough available villagers" text in red above buy button when no villagers available to work.
        }
    }
});


//Houses


document.getElementById("purchase-log-cabin-button").addEventListener("click", function() {
    if (logs >= 200 * numberOfLogCabins) {
        logs -= 200 * numberOfLogCabins;
        numberOfLogCabins += 1;
        housingSpace += (3 + (boughtLogCabinRearrangementUpgrade ? 1 : 0));
        document.getElementById("housing-space").innerHTML = "Housing Space: " + housingSpace;

        let houseImage = document.createElement("img");
        houseImage.src = "../static/assets/log-cabin.png";
        document.getElementById("city").appendChild(houseImage);
        document.getElementById("log-cabin-log-cost").innerHTML = '<span class="current-log-amount">0</span>' + " / " + 200 * numberOfLogCabins;
    }   
});



document.getElementById("purchase-small-plank-house-button").addEventListener("click", function() {
    if (logs >= 2000 * (numberOfSmallPlankHouses + 1) && planks >= 100 * (numberOfSmallPlankHouses + 1)) {
        logs -= 2000 * (numberOfSmallPlankHouses + 1);
        planks -= 100 * (numberOfSmallPlankHouses + 1);
        housingSpace += 6;
        document.getElementById("housing-space").innerHTML = "Housing Space: "  + housingSpace;

        let planksHouseImage = document.createElement("img");
        planksHouseImage.src = "../static/assets/PlankHouse.png";
        document.getElementById("city").appendChild(planksHouseImage);
        document.getElementById("small-plank-house-log-cost").innerHTML = '<span class="current-log-amount">0</span>' + " / " + 2000 * (numberOfSmallPlankHouses + 1);
        document.getElementById("small-plank-house-plank-cost").innerHTML = '<span class="current-plank-amount">0</span>' + " / " + 100 * (numberOfSmallPlankHouses + 1);
    }


});




//Upgrades

document.getElementById("sturdier-axe-upgrade").addEventListener("click", function() {
    if (logs >= 300 && !boughtSturdierAxeUpgrade) {
        logs -= 300;
        logMultiplier += 0.2;
        boughtSturdierAxeUpgrade = true;
        document.getElementById("sturdier-axe-upgrade").classList.add("green-border");
        document.getElementById("sturdier-axe-upgrade").classList.remove("upgrade-button-class-border");
        document.getElementById("sturdier-axe-upgrade-cost-container").style.visibility = "hidden";
        document.getElementById("strength-training-upgrade").classList.remove("upgrade-button-class-locked");
        document.getElementById("strength-training-upgrade").classList.add("upgrade-button-class-border");
        document.getElementById("log-cabin-rearrangement-upgrade").classList.remove("upgrade-button-class-locked");
        document.getElementById("log-cabin-rearrangement-upgrade").classList.add("upgrade-button-class-border");
        document.getElementById("bigger-minecart-upgrade").classList.remove("upgrade-button-class-locked");
        document.getElementById("bigger-minecart-upgrade").classList.add("upgrade-button-class-border");
    }
});


document.getElementById("strength-training-upgrade").addEventListener("click", function() {
    if (logs >= 3000 && stone >= 400 && !boughtStrengthTrainingUpgrade && boughtSturdierAxeUpgrade) {
        logs -= 3000;
        stone -= 400;
        globalMultiplier += 0.2;
        boughtStrengthTrainingUpgrade = true;
        document.getElementById("strength-training-upgrade").classList.add("green-border");
        document.getElementById("strength-training-upgrade").classList.remove("upgrade-button-class-border");
        document.getElementById("strength-training-upgrade-cost-container").style.visibility = "hidden";
    }
});


document.getElementById("log-cabin-rearrangement-upgrade").addEventListener("click", function() {
    if (logs >= 12000 && !boughtLogCabinRearrangementUpgrade && boughtSturdierAxeUpgrade) {
        logs -= 12000;
        globalMultiplier += 0.2;
        console.log("ran")
        housingSpace += 1 * numberOfLogCabins;
        document.getElementById("housing-space").innerHTML = "Housing Space: " + housingSpace;
        boughtLogCabinRearrangementUpgrade = true;
        document.getElementById("log-cabin-rearrangement-upgrade").classList.add("green-border");
        document.getElementById("log-cabin-rearrangement-upgrade").classList.remove("upgrade-button-class-border");
        document.getElementById("log-cabin-rearrangement-upgrade-cost-container").style.visibility = "hidden";
    }
});


document.getElementById("bigger-minecart-upgrade").addEventListener("click", function() {
    if (logs >= 4000 && stone >= 2000 && iron >= 300 && !boughtBiggerMinecartUpgrade && boughtSturdierAxeUpgrade) {
        logs -= 4000;
        stone -= 2000;
        iron -= 300
        boughtBiggerMinecartUpgrade = true;
        stoneMultiplier += 0.2;
        document.getElementById("bigger-minecart-upgrade").classList.add("green-border");
        document.getElementById("bigger-minecart-upgrade").classList.remove("upgrade-button-class-border");
        document.getElementById("bigger-minecart-upgrade-cost-container").style.visibility = "hidden";
        
    }

});


//Market


document.getElementById("open-market-button").addEventListener("click", function() {
    console.log(shopEnabled)
    if (shopEnabled) {
        document.getElementById("market-menu").style.display = "none";
        document.getElementById("resource-stats").style.zIndex = 5;
        shopEnabled = false;
    } else {
        document.getElementById("market-menu").style.display = "flex";
        document.getElementById("resource-stats").style.zIndex = 50;
        shopEnabled = true;
    }
});

//Initialize prices
//Sets prices high to prevent race conditions that might happen
let item1Price = 1000000;
let item2Price = 1000000;
let item3Price = 1000000;
let item1Type = "";
let item2Type = "";
let item3Type = "";
let item1Amount = "";
let item2Amount = "";
let item3Amount = "";

document.getElementById("purchase-shop-item-1").addEventListener("click", function() {
    console.log("clocked")
    if (gold >= item1Price) {
        gold -= item1Price;
        if (item1Type == " logs") {
            logs += item1Amount
        } else if (item1Type == " stone") {
            stone += item1Amount
        } else if (item1Type == " iron") {
            iron += item1Amount
        } else {
            planks += item1Amount
        }
    }
});

document.getElementById("purchase-shop-item-2").addEventListener("click", function() {
    if (gold >= item2Price) {
        gold -= item2Price;
        if (item2Type == " logs") {
            logs += item2Amount
        } else if (item2Type == " stone") {
            stone += item2Amount
        } else if (item2Type == " iron") {
            iron += item2Amount
        } else {
            planks += item2Amount
        }
    }
});

document.getElementById("purchase-shop-item-3").addEventListener("click", function() {
    if (gold >= item3Price) {
        gold -= item3Price;
        if (item3Type == " logs") {
            logs += item3Amount
        } else if (item3Type == " stone") {
            stone += item3Amount
        } else if (item3Type == " iron") {
            iron += item3Amount
        } else {
            planks += item3Amount
        }
    }
});


console.log(Math.round((1.2 % 1) * 100) / 100)


//Adds resources recursively every x milliseconds
function addResources() {
    
    logs += 1 * numberOfLumberjacks * (logMultiplier + globalMultiplier);
    document.getElementById("logs").innerHTML = "Logs: " + (Math.round(logs * 100)) / 100; 


    if (numberOfMines >= 1) {
        gold += 0.08 * numberOfMines * (stoneMultiplier + globalMultiplier);
        document.getElementById("gold").innerHTML = "Gold: " + (Math.round(gold * 100)) / 100; 

        stone += 0.2 * numberOfMines * (globalMultiplier + stoneMultiplier);
        document.getElementById("stone").innerHTML = "Stone: " + (Math.round(stone * 100)) / 100; 

        iron += 0.02 * numberOfMines * globalMultiplier;
        document.getElementById("iron").innerHTML = "Iron: " + (Math.round(iron * 100)) / 100; 

        /*coal += 0.04 * numberOfMines * globalMultiplier;
        document.getElementById("coal").innerHTML = "Coal: " + (Math.round(coal * 100)) / 100;*/
    }

    if (numberOfSawmills >= 1) {
        planks += 0.02 * numberOfSawmills * globalMultiplier;
        document.getElementById("planks").innerHTML = "Planks: " + (Math.round(planks * 100)) / 100; 
    }


    //Display current amount of resources in shop
    Array.from(document.getElementsByClassName("current-log-amount")).forEach(element => {
        element.innerHTML = (Math.round(logs * 100)) / 100;
    });

    Array.from(document.getElementsByClassName("current-stone-amount")).forEach(element => {
        element.innerHTML = (Math.round(stone * 100)) / 100;
    });

    Array.from(document.getElementsByClassName("current-gold-amount")).forEach(element => {
        element.innerHTML = (Math.round(gold * 100)) / 100;
    });

    Array.from(document.getElementsByClassName("current-iron-amount")).forEach(element => {
        element.innerHTML = (Math.round(iron * 100)) / 100;
    });

    Array.from(document.getElementsByClassName("current-plank-amount")).forEach(element => {
        element.innerHTML = (Math.round(planks * 100)) / 100;
    });

    Array.from(document.getElementsByClassName("current-worker-amount")).forEach(element => {
        element.innerHTML = currentVillagers - currentWorkers;
    });

    
    setTimeout(() => {addResources()}, 400);
}


addResources();


function addVillagers() {
    
    if (housingSpace - currentVillagers > 0) {

        currentVillagers += 1;
        console.log("current villagers", currentVillagers);
        document.getElementById("villager-count").innerHTML = "Villagers: " + currentVillagers;
    }

    setTimeout(() => {addVillagers()}, 3000 / numberOfLogCabins);
}
    
    
addVillagers();


function shopItemAmountDecider(randomNum) {
    while (true) {
        if (randomNum == 1) { // logs
            return [" logs", Math.round((Math.floor(Math.random() * (100 - 50 + 50)) + 50) * (numberOfLumberjacks - (0.2 * numberOfLumberjacks)) * 100) / 1000, (Math.floor(Math.random() * (200 - 100 + 100)) + 100) * numberOfLumberjacks, "../static/assets/Log-small.png"]; //random amount from 2000 to 1000
        } else if (randomNum == 2 && numberOfMines >= 1) { // stone
            return [" stone", Math.round((Math.floor(Math.random() * (200 - 100 + 100)) + 100) * (numberOfMines - (0.2 * numberOfMines)) * 100) / 1000, (Math.floor(Math.random() * (20 - 10 + 10)) + 20) * numberOfMines, "../static/assets/Stone-Redone.png"]; 
        } else if (randomNum == 3 && numberOfMines >= 1) { // iron
            return [" iron", Math.round((Math.floor(Math.random() * (20 - 10 + 10)) + 10) * (numberOfMines - (0.2 * numberOfMines)) * 100) / 1000, (Math.floor(Math.random() * (2 - 1 + 1)) + 1) * numberOfMines, "../static/assets/Iron-ore.png"];
        } else if (randomNum == 4 && numberOfSawmills >= 1)  { // planks
            return [" planks", Math.round((Math.floor(Math.random() * (20 - 10 + 10)) + 10) * (numberOfSawmills - (0.2 * numberOfSawmills)) * 100) / 1000, (Math.floor(Math.random() * (2 - 1 + 1)) + 1) * numberOfSawmills, "../static/assets/Plank.png"];
        } else {
            randomNum = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        }
    }
}

function shopReset() {
    console.log("reset shop!");
    let randomNum = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    let costAndAmountArray = [];
    
    costAndAmountArray = shopItemAmountDecider(randomNum);
    item1Price = costAndAmountArray[1];
    item1Type = costAndAmountArray[0];
    item1Amount = costAndAmountArray[2];
    document.getElementById("shop-item-1-item-amount").innerHTML = "You get: " + costAndAmountArray[2] + costAndAmountArray[0];
    document.getElementById("shop-item-1-image").src = costAndAmountArray[3];
    document.getElementById("shop-item-1-cost").innerHTML = "You give: " + costAndAmountArray[1];
    
    randomNum = Math.floor(Math.random() * (4 - 1 + 1)) + 1
    costAndAmountArray = shopItemAmountDecider(randomNum);
    item2Price = costAndAmountArray[1];
    item2Type = costAndAmountArray[0];
    item2Amount = costAndAmountArray[2];
    document.getElementById("shop-item-2-item-amount").innerHTML = "You get: " + costAndAmountArray[2] + costAndAmountArray[0];
    document.getElementById("shop-item-2-image").src = costAndAmountArray[3];
    document.getElementById("shop-item-2-cost").innerHTML = "You give: " + costAndAmountArray[1];
    
    randomNum = Math.floor(Math.random() * (4 - 1 + 1)) + 1
    costAndAmountArray = shopItemAmountDecider(randomNum);
    item3Price = costAndAmountArray[1];
    item3Type = costAndAmountArray[0];
    item3Amount = costAndAmountArray[2];
    document.getElementById("shop-item-3-item-amount").innerHTML = "You get: " + costAndAmountArray[2] + costAndAmountArray[0];
    document.getElementById("shop-item-3-image").src = costAndAmountArray[3];
    document.getElementById("shop-item-3-cost").innerHTML = "You give: " + costAndAmountArray[1];

    setTimeout(() => {shopReset()}, 120000);
}

shopReset()


