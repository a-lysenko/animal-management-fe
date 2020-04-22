
export interface Address {
  addressid: AddressId;
  street: string;
  city: string;
  country: string;
  zipCode: string;
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

export interface Owner extends Address {
  id: OwnerId;
  fullname: string;
}
