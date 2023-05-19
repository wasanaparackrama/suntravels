import { RoomRequestCriteria } from './room-request-criteria';

export interface SearchRequest {
  checkInDate: Date;
  noOfNights: number;
  roomRequests: RoomRequestCriteria[];
}
