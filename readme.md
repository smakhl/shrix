# shrix - фреймворк, реализующий flux-подход

## Установка
``` sh
npm i smakhl/shrix
```
---
## О фреймворке

- Написан на Typescript
  - Полностью типизирован
  - Имеет возможность подключать свой интерфейс стора через generics
- Подготовлен к установке через npm
- Имеет API для подключения в любой проект на JS/TS

---

## Использование
``` typescript
import * as Shrix from "shrix";


interface MyStore { 
    count: number;
}

// создание единого хранилища. При использовании typescript, можно передать свой интерфейс хранилища
const countStore: Shrix.Store<MyStore> = new Shrix.Store<MyStore>({ count: 1 });

// создание редьюсера
const countReducer: Shrix.Reducer<MyStore> = (prevState: MyStore, action: Shrix.Action) => {
    switch (action.type) {
        case "INCREMENT_COUNT":
            return { ...prevState, count: prevState.count + action.payload };

        case "DECREMENT_COUNT":
            return { ...prevState, count: prevState.count - action.payload };

        default:
            return prevState;
    }
};

// подключение редьюсера к хранилищу
countStore.addReducer(countReducer);

// создание обработчика
const mySubscriber: Shrix.Subscriber<MyStore> = (newState: MyStore, action: Shrix.Action) => {
    console.log(`'${action.type}', payload: ${newState.count}`);
};

// подключение обработчика к хранилищу
countStore.subscribe(mySubscriber);

// вызов действия
countStore.dispatch({ type: "INCREMENT_COUNT", payload: 3 }); // 'INCREMENT_COUNT', payload: 4
countStore.dispatch({ type: "DECREMENT_COUNT", payload: 1 }); // 'DECREMENT_COUNT', payload: 3

```
