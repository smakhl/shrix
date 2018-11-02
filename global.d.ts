declare interface Subscriber {
    updateState(state: any, action: Action): void;
}

declare type Reducer = (previousState: any, action: Action) => {};

declare interface Action {
    type: string;
    payload?: any;
}
