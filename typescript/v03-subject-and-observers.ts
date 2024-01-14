interface ObserverCustomer<DataType> {
    next(data: DataType): void
}

class SubjectStore<DataType> {
    private observers: ObserverCustomer<DataType>[] = []
    subscribe(observer: ObserverCustomer<DataType>): void {
        this.observers.push(observer)
    }
    next(data: DataType): void {
        this.observers.forEach(observer => observer.next(data))
    }
}

const notInterested: ObserverCustomer<string> = {next: data => console.log(`Got message ${data}, who cares`)}
const willNotBuy: ObserverCustomer<string> = {next: data => console.log(`Got message ${data}, will not buy`)}
const wow: ObserverCustomer<string> = {next: data => console.log(`Got message ${data}, preparing my card`)}

const electronicStore = new SubjectStore<string>()

console.log("Hello world")
// Hello world

electronicStore.subscribe(notInterested);
electronicStore.subscribe(willNotBuy);

electronicStore.next("New telephone is here!");
// Got message New telephone is here!, who cares
// Got message New telephone is here!, will not buy

electronicStore.subscribe(wow);

electronicStore.next("Discounts on microwaves!");
// Got message Discounts on microwaves!, who cares
// Got message Discounts on microwaves!, will not buy
// Got message Discounts on microwaves!, preparing my card