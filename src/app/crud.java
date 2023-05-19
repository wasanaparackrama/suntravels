@PostMapping( "/search" )
public ResponseEntity<Object> getAvailableRooms( @Valid @RequestBody RoomInfoSearchRequest roomInfoSearchRequest )
{
    System.out.println( roomInfoSearchRequest.getCheckIn() + " - " + roomInfoSearchRequest.getNightsCount() + " - " +
                                roomInfoSearchRequest.getRoomsCount() + " - " + roomInfoSearchRequest.getAdultsCount() + " - " );
    List<AllRoomInfoDto> ret = roomInfoService.findAvailableRoomInfo( roomInfoSearchRequest );
    System.out.println( "hi --> " + ret );
    return new ResponseEntity<>( ret, HttpStatus.OK );
}
----------------------------------
@Data
public class RoomInfoSearchRequest
{
    @NotNull(message = "check-in is required")
    private String checkIn;

    @Positive
    private int nightsCount;

    @Positive
    private int roomsCount;

    @Positive
    private int adultsCount;
}
-----------------------------------------------
public List<AllRoomInfoDto> findAvailableRoomInfo( RoomInfoSearchRequest roomInfoSearchRequest ) throws InvalidArgumentsException
    {
        int perRoomCount = ( int ) Math.ceil( roomInfoSearchRequest.getAdultsCount() / ( double ) roomInfoSearchRequest.getRoomsCount() );
        SimpleDateFormat dateFormat = new SimpleDateFormat( "yyyy-MM-dd hh:mm:ss.SSS" );
        Date parsedDate = null;
        try
        {
            parsedDate = dateFormat.parse( roomInfoSearchRequest.getCheckIn() );
            Timestamp fromDate = new java.sql.Timestamp( parsedDate.getTime() );

            System.out.println( fromDate );
            Calendar calendar = Calendar.getInstance();
            calendar.setTime( fromDate );
            calendar.add( Calendar.DAY_OF_WEEK, roomInfoSearchRequest.getNightsCount() );

            System.out.println( calendar.getTime().toString() );

            Timestamp toDate = new Timestamp( calendar.getTime().getTime() );

            System.out.println( fromDate + "  -  " + toDate );

            List<RoomInfo> roomInfoList = roomInfoRepository.findAvailableRoomInfo( perRoomCount, roomInfoSearchRequest.getRoomsCount() );
            List<AllRoomInfoDto> returnList = new ArrayList<>();
            for( RoomInfo roomInfo : roomInfoList )
            {
                if( !roomInfo.getContract().getValidFrom().after( fromDate )
                            && !roomInfo.getContract().getValidTo().before( toDate ) )
                {
//                    RoomInfoDto temp = roomInfoUtil.mapIn( roomInfo );
//                    temp.setPrice( temp.getPrice() * roomInfoSearchRequestBody.getNightsCount() );
//                    returnList.add( temp );
                }
            }
            return returnList;
        }
        catch( ParseException e )
        {
            throw new InvalidArgumentsException( "check-in date format is incorrect(should be yyyy-MM-dd hh:mm:ss.SSS)" );
        }
    }
----------------------------------------
@Query( value = "select * from room_info r where r.max_adults_per_room>=:perRoomCount and r.number_of_rooms>=:roomsCount", nativeQuery = true )
public List<RoomInfo> findAvailableRoomInfo( @Param( "perRoomCount" ) int perRoomCount, @Param( "roomsCount" ) int roomsCount );
