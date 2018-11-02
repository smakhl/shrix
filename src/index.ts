export default class Shrix<Store> {
    private state: Store;
    private reducers: Reducer[];
    private subscribers: Subscriber[];
    constructor(initialStore: Store) {
        this.state = initialStore;
        this.reducers = [];
        this.subscribers = [];
    }

    public addReducer(reducer: Reducer) {
        this.reducers.push(reducer);
    }

    public subscribe(subscriber: Subscriber) {
        this.subscribers.push(subscriber);
    }

    public dispatch(action: Action) {
        this.state = this.runReducers(this.state, action);
        this.subscribers.forEach((subscriber) => {
            if (subscriber && typeof subscriber.updateState === "function") {
                subscriber.updateState(this.state, action);
            }
        });
    }

    private runReducers(initialState: any, action: Action) {
        return this.reducers.reduce(this.reduceState(action), initialState);
    }

    private reduceState(action: Action) {
        return (currentState: any, reducer: Reducer) => {
            if (typeof reducer === "function") {
                return reducer(currentState, action);
            }

            return currentState;
        };
    }
}
