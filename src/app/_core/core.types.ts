
export interface Address {
  addressid: AddressId;
  street: string;
  city: string;
  country: string;
  zipcode: string;
}

export type AddressId = number;
export type AnimalId = number;
export type OwnerId = number;
type Species = string;

export interface Animal {
  id: AnimalId;
  birthday: Date;
  species: Species;
  vaccinated: boolean;
}

export interface AnimalFlagged extends Animal {
  ispet: boolean;
  iswild: boolean;
}

export interface Owner extends Address {
  id: OwnerId;
  fullname: string;
}
