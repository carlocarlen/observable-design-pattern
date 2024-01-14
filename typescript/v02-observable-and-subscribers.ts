interface Customer<DataType> {
    onNotification(data: DataType): void
}

interface ObservableStore<DataType> {
    subscribe(subscriber: Customer<DataType>): void
}

const notInterested: Customer<string> = {onNotification: data => console.log(`Got message ${data}, who cares`)}
const willNotBuy: Customer<string> = {onNotification: data => console.log(`Got message ${data}, will not buy`)}
const wow: Customer<string> = {onNotification: data => console.log(`Got message ${data}, preparing my card`)}

const storeWithNewTelephone: ObservableStore<string> = {subscribe: subscriber => subscriber.onNotification("New telephone is here")}

storeWithNewTelephone.subscribe(notInterested)
// Got message New telephone is here!, who cares
storeWithNewTelephone.subscribe(willNotBuy)
// Got message New telephone is here!, will not buy

const storeWithDiscounts: ObservableStore<string> = {subscribe: subscriber => subscriber.onNotification("Discounts on microwaves!")}

storeWithDiscounts.subscribe(notInterested)
// Got message Discounts on microwaves!, who cares
storeWithDiscounts.subscribe(willNotBuy)
// Got message Discounts on microwaves!, will not buy
storeWithDiscounts.subscribe(wow)
// Got message Discounts on microwaves!, preparing my card