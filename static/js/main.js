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

let logs = 0;
let stone = 0;
let gold = 0;
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
    document.getElementById("shop").style.display = "flex";
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
        document.getElementById("lumberjack-log-cost").innerHTML = 50 * numberOfLumberjacks + " / " + '<span class="current-log-amount">0</span>';
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
            document.getElementById("mine-log-cost").innerHTML = 80 * (numberOfMines + 1) + " / " + '<span class="current-log-amount">0</span>';
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
            document.getElementById("sawmill-log-cost").innerHTML = 1000 * (numberOfSawmills + 1) + " / " + '<span class="current-log-amount">0</span>';
            document.getElementById("sawmill-stone-cost").innerHTML = 100 * (numberOfSawmills + 1) + " / " + '<span class="current-log-amount">0</span>';
            document.getElementById("sawmill-iron-cost").innerHTML = 20 * (numberOfSawmills + 1) + " / " + '<span class="current-log-amount">0</span>';
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





document.getElementById("purchase-log-cabin-button").addEventListener("click", function() {
    if (logs >= 200 * numberOfLogCabins) {
        logs -= 200 * numberOfLogCabins;
        numberOfLogCabins += 1;
        housingSpace += (3 + (boughtLogCabinRearrangementUpgrade ? 1 : 0));
        document.getElementById("housing-space").innerHTML = "Housing Space: " + housingSpace;

        let houseImage = document.createElement("img");
        houseImage.src = "../static/assets/log-cabin.png";
        document.getElementById("city").appendChild(houseImage);
        document.getElementById("log-cabin-log-cost").innerHTML = 200 * numberOfLogCabins + " / " + '<span class="current-log-amount">0</span>';
    }   
})


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



    
    setTimeout(() => {addResources()}, 1);
}














addResources();


function addVillagers() {
    
    if (housingSpace - currentVillagers > 0) {

        currentVillagers += 1;
        console.log("current villagers", currentVillagers);
        document.getElementById("villager-count").innerHTML = "Villagers: " + currentVillagers;
    }

    setTimeout(() => {addVillagers()}, 300 / numberOfLogCabins);
}
    
    
addVillagers();

