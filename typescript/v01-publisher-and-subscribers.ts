interface Customer<DataType> {
    onNotification(data: DataType): void
}

class Store<DataType> {
    private subscribers: Customer<DataType>[] = []
    subscribe(subscriber: Customer<DataType>): void {
        this.subscribers.push(subscriber)
    }
    notifySubscribers(data: DataType): void {
        this.subscribers.forEach(subscriber => subscriber.onNotification(data))
    }
}

const notInterested: Customer<string> = {onNotification: data => console.log(`Got message ${data}, who cares`)}
const willNotBuy: Customer<string> = {onNotification: data => console.log(`Got message ${data}, will not buy`)}
const wow: Customer<string> = {onNotification: data => console.log(`Got message ${data}, preparing my card`)}

const electronicStore = new Store<string>()

console.log("Hello world");
// Hello world

electronicStore.subscribe(notInterested);
electronicStore.subscribe(willNotBuy);

electronicStore.notifySubscribers("New telephone is here!");
// Got message New telephone is here!, who cares
// Got message New telephone is here!, will not buy

electronicStore.subscribe(wow);

electronicStore.notifySubscribers("Discounts on microwaves!");
// Got message Discounts on microwaves!, who cares
// Got message Discounts on microwaves!, will not buy
// Got message Discounts on microwaves!, preparing my card