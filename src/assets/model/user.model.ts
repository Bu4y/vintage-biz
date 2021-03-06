export class UserModel {
    _id: string;
    username: string;
    password: string;
    displayName: string;
    fisrtName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    citizenid: string;
    email: string;
    mobile: string;
    profileImageURL: string
    coin: number;
    notificationids: Array<string>;
}

export class ChangePasswordModel {
    newPassword: string;
    verifyPassword: string;
    currentPassword: string;
}