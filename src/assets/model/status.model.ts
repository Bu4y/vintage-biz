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
    product: productModel = new productModel();
    shipping: shippingModel = new shippingModel();
    amount: number;
    sentdate: string;
    refid: string;
    receivedate: string;
    confirmdate: string;
    canceldate: string;
    isrefund: boolean;
    paymenttype: string;
    status: string;
    refunddate: string;
    rejectreason: string;
    transferdate: string;
    shop: shopModel = new shopModel();
}
export class productModel {
    image: string;
    name: string;
    price: number;
    qty: number;
    shippingprice: number;
    shippingtrack: string;
    shippingtype: string;
}
export class shippingModel {
    address: string;
    district: string;
    name: string;
    postcode: string;
    province: string;
    subdistrict: string;
    tel: string;
}
export class shopModel {
    name: string;
}