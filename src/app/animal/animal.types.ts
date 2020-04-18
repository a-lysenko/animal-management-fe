type Species = string;

export interface Animal {
  id: number;
  birthday: Date;
  species: Species;
  vaccinated: boolean;
}
