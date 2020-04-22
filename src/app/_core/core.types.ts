
export interface Address {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export type AnimalId = number;
export type OwnerId = number;
type Species = string;

export interface Animal {
  id: AnimalId;
  birthday: Date;
  species: Species;
  vaccinated: boolean;
}
