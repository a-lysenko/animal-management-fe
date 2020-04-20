import {Address, OwnerId} from '../_core/core.types';

export interface Owner {
  id: OwnerId;
  fullName: string;
  // address: Address;
  address: string;
}
