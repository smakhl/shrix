import * as Shrix from "./index";

interface Store {
    count: number;
}

const countStore = new Shrix.Store<Store>({ count: 1 });

const countReducer: Shrix.Reducer = (prevState, action) => {
    switch (action.type) {
        case "INCREMENT_COUNT":
            console.log(`${prevState.count} + ${action.payload} = `); // tslint:disable-line
            return { ...prevState, count: prevState.count + action.payload };

        case "DECREMENT_COUNT":
            console.log(`${prevState.count} - ${action.payload} = `); // tslint:disable-line
            return { ...prevState, count: prevState.count - action.payload };

        default:
            return prevState;
    }
};

countStore.addReducer(countReducer);

const mySubscriber: Shrix.Subscriber = {
    updateState(state, action) {
        console.log(state.count, action.type); // tslint:disable-line
    },
};

countStore.subscribe(mySubscriber);

countStore.dispatch({ type: "INCREMENT_COUNT", payload: 3 });
countStore.dispatch({ type: "DECREMENT_COUNT", payload: 1 });
