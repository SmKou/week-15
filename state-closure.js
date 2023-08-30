const counter = (counter = 0) => () => ++counter

const incrementer = counter();
console.log(incrementer());
console.log(incrementer());
console.log(incrementer());

const incrementer2 = counter();
console.log(incrementer2());
console.log(incrementer2());
console.log(incrementer2());


const store = (currentState = {}) => (stateChangeFunction = state => state) => {
    currentState = stateChangeFunction(currentState);
    return currentState;
}
const stateControl = store();
const changeState = (prop) => (value) => (state) => ({
    ...state,
    [prop]: (state[prop] || 0) + value
});
const feed = changeState("soil");
const hydrate = changeState("water");
const feed_1 = changeState("soil")(1);
const hydrate_1 = changeState("water")(1);

// const state_1 = stateControl;
// state_1(feed_1);
// const state_2 = stateControl;
// state_2(hydrate_1);
// console.log("Are state 1 and 2 the same?", state_1 === state_2);
// console.log("state 1: ", state_1());
// console.log("state 2: ", state_2());

// const state_3 = stateControl();
// feed_1(state_3);
// const state_4 = hydrate_1(state_3);
// const state_5 = hydrate(5)(state_4);
// console.log("fed", state_3);
// console.log("hydrated", state_4);
// console.log("hydrated more", state_5);

const distance = changeState("distance");
const throwFar = distance(100);
const speed = changeState("speed");
const throwFast = speed(200);

const robot_A = stateControl();
const robot_modified_1 = distance(10)(robot_A);
const robot_modified_2 = throwFast(robot_modified_1);

const robot_B = stateControl(throwFar);
const robot_B_modified = speed(20)(robot_B);

console.log(robot_modified_2);
console.log(robot_B_modified);

const robot_C = store(robot_modified_2)(throwFar);
console.log(robot_C);