export class StatusModel {
    status: string;
    items: Array<ItemStatusModel>;
}
export class ItemStatusModel {
    itemid: string;
    orderid: string;
    name: string;
    image: string;
    price: number;
    qty: number;
    shippingtype: string;
    shippingprice: number;
    amount: number;
    sentdate: string;
    refid: string;
    receivedate: string;
    canceldate: string;
    isrefund: boolean;
    status: string;
    rejectreason: string;
}