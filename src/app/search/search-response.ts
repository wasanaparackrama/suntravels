import { AvailableRoom } from './AvailableRoom';

export interface SearchResponse {
  isAvailable: Boolean;
  availableRoomList: AvailableRoom[];
}
