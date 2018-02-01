import { UserModel } from "./user.model";
import { ShopModel } from "./shop.model";
import { ProductDetailModel } from "./product-detail.model";

export class OrderDetailModel {
    _id: string;
    created: string;
    user: UserModel = new UserModel();
    shippingAddress: shippingAddressModel = new shippingAddressModel();
    location: locationModel = new locationModel();
    shop: ShopModel = new ShopModel();
    items:
}
export class OrderItems{
    qty: number;
    amount: number;
    product: ProductDetailModel = new ProductDetailModel();
}
export class locationModel {
    lat: string;
    lng: string;
}

export class shippingAddressModel {
    name: string;
    tel: string;
    address: string;
    addressDetail: string;

}