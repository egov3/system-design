export interface IPersonalIDUserData {
  firstName: string;
  lastName: string;
  middleName: string;
  IIN: string;
  gender: string;
  birthDate: string;
}

export interface IPersonalIDTemplateProps {
  userPhoto: string;
  userSign: string;
  userData: IPersonalIDUserData;
  width?: number | string;
}
