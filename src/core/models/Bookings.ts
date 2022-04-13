
class Bookings{
    constructor(
        public id: string,
        public placeId: string,
        public placeTitle: string,
        public placeImage: string,
        public firstName: string,
        public lastName: string,
        public guestNumber: number,
        public placePrice: number,
        public placeRating: number,
        public placeDate: Date
    ){}
    
}


export default Bookings;