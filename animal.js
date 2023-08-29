const animalFactory = creature => ({
    eat: food => `The ${creature} eats the ${food}.`
});

const animalFactory2 = creature => ({
    eat: function (food) {
        return `The ${creature} eats the ${food}.`
    }
});

const animalFactory3 = creature => ({
    eat: food => `The ${creature} eats the ${food}.`,
    sleep: () => `The ${creature} sleeps.`
});

const cat = animalFactory("cat");
console.log(cat.eat("a salmon"));

const cat2 = animalFactory2("cat");
console.log(cat2.eat("two salmon"));

// More modular

const creatureCanEat = creature => ({
    eat: food => `The ${creature.name} eats the ${food}.`
});

const creatureCanSleep = creature => ({
    sleep: () => `The ${creature.name} sleeps.`
});

const creatures = name => {
    let state = { name };
    return {
        ...state,
        ...creatureCanEat(state),
        ...creatureCanSleep(state)
    }
};

const creatures2 = name => (state = { name }) => ({ ...state, ...creatureCanEat(state), ...creatureCanSleep(state) })

const duck = creatures("duck");
console.log(duck.eat("bread"));
console.log(duck.sleep());

const duck2 = creatures2("duck")();
console.log(duck2.eat("fish"));
console.log(duck2.sleep());

// Every variation works