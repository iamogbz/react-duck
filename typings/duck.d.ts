type Action<
    T extends string = string /* Action type */,
    P = unknown /* Payload type */
> = {
    type: T;
    payload?: P;
} & Record<string, unknown>;

interface ActionCreator<
    T extends string = string /* Action Type */,
    P = unknown /* Payload Type */,
    S = unknown /* State type */
> {
    (payload?: P): React.ReducerAction<Reducer<S, T, P>>;
    type: T;
}

type ActionCreatorMapping<
    CT extends Record<string, string> = Record<
        string,
        string
    > /* Action creator key to type mapping */,
    TP extends Record<string, unknown> = Record<
        string,
        unknown
    > /* Action type to payload mapping */,
    S = unknown /* State type */
> = { [K in keyof CT]: Nullable<ActionCreator<CT[K], TP[CT[K]], S>> };

type ActionDispatcher<P = unknown> = (...args: P[]) => void;

type ActionDispatcherMapping<
    T extends string = string,
    P = unknown,
    D extends string = T /* Action dispatcher mapping keys */
> = Record<D, ActionDispatcher<T, P>>;

type Reducer<
    S = unknown,
    T extends string = string,
    P = unknown
> = React.Reducer<S /* All possible state types */, Action<T, P>>;

type ActionReducerMapping<
    S = unknown,
    T extends string = string,
    P = unknown,
    C extends string = T
> = Record<C, Reducer<S, T, P>>;

type Selector<
    S = unknown,
    R = unknown /* All possible selector return types */,
    T extends string = string,
    P = unknown,
    E extends unknown[] = unknown[]
> = (state: React.ReducerState<Reducer<S, Action<T, P>>>, ...args: E) => R;

type SelectorMapping<
    S = unknown,
    R = unknown,
    T extends string = string,
    P = unknown,
    Q extends string = string /* All possible selector names*/
> = Record<Q, Selector<S, R, T, P>>;

type DuckSelectors<Q> = Q | "$";

type Duck<
    S = unknown,
    N extends string = string /* Duck name */,
    T extends string = string,
    P = unknown,
    R = unknown,
    Q extends string = string,
    U extends string = string
> = {
    actions: ActionCreatorMapping<Record<U, T>, Record<T, P>, S>;
    actionTypes: T[];
    initialState: S;
    name: N;
    reducer: Reducer<S, T, P>;
    selectors: SelectorMapping<Record<N, S>, R, T, P, DuckSelectors<Q>>;
};

type DuckReducerMapping<
    S = unknown,
    N extends string = string,
    T extends string = string,
    P = unknown
> = Record<N, Reducer<S, T, P>>;

type RootDuck<
    S = unknown,
    N extends string = string /* All possible duck names */,
    U extends string = string,
    V extends string = string,
    T extends U | V = string,
    P = unknown,
    R = unknown,
    Q extends string = string
> = {
    actions: Record<N, ActionCreatorMapping<Record<U, T>, Record<T, P>, S>>;
    initialState: Record<N, S>;
    names: Set<N>;
    reducer: Reducer<Record<N, S>, T, P>;
    selectors: Record<N, Nullable<SelectorMapping<Record<N, S>, R, T, P, Q>>>;
};
