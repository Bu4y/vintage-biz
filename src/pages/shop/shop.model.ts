export class ShopModel {
    _id: string;
    name: string;
    name_eng: string;
    detail: string;
    isopen:boolean;
    address: AddressModel = new AddressModel();
    tel: string;
    email: string;
    facebook: string;
    line: string;
    promoteimage: Array<any>
    coverimage: string;
    isactiveshop: string;
    issendmail: string;
    importform: string;
    times: Array<TimeModel>;
    items: Array<ItemsModel>;
    categories: Array<CateModel>;

}
export class AddressModel {
    addressdetail: string;
    address: string;
    subdistinct: string;
    distinct: string;
    province: string;
    postcode: string;
    lat: string;
    lng: string;
}
export class ItemsModel {
    cate: CateModel = new CateModel();
    products: Array<ProductsModel>;
}
export class CateModel {
    _id: string;
    name: string;
    image: string;
}

export class ProductsModel {
    _id: string;
    name: string;
    image: string;
    price: Number;
}
export class TimeModel{
    description: string;
    timestart: string;
    timeend: string;
    days: Array<any>;
}