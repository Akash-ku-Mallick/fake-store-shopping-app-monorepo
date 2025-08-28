
export interface IEmail {
  value?: string;
  verified: boolean;
}

export interface IPhoneNumber {
  value?: string;
  countryCode?: string;
  verified: boolean;
}


export interface IName {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

export interface UserType {
  _id: string;
  email: IEmail;
  phoneNumber: IPhoneNumber;
  password: string;
  name?: IName;
  dob?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  avatar?: string;
}