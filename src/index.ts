export type Subscriber<State> = (state: State, action: Action) => void;

export type Reducer<State> = (previousState: State, action: Action) => {};

export interface Action {
    type: string;
    payload?: any;
}

export class Store<State> {
    private state: State;
    private reducers: Array<Reducer<State>>;
    private subscribers: Array<Subscriber<State>>;
    constructor(initialStore: State) {
        this.state = initialStore;
        this.reducers = [];
        this.subscribers = [];
    }

    public addReducer(reducer: Reducer<State>) {
        this.reducers.push(reducer);
    }

    public subscribe(subscriber: Subscriber<State>) {
        this.subscribers.push(subscriber);
    }

    public dispatch(action: Action) {
        this.state = this.runReducers(this.state, action);
        this.subscribers.forEach((subscriber) => {
            if (subscriber && typeof subscriber === "function") {
                subscriber(this.state, action);
            }
        });
    }

    public getState() {
        return this.state;
    }

    private runReducers(initialState: any, action: Action) {
        return this.reducers.reduce(this.reduceState(action), initialState);
    }

    private reduceState(action: Action) {
        return (currentState: any, reducer: Reducer<State>) => {
            if (typeof reducer === "function") {
                return reducer(currentState, action);
            }

            return currentState;
        };
    }
}
