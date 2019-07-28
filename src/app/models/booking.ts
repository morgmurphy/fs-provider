export class Booking {
    date_from: string;
    date_to: string;
    user_id: string;
    listing_id: string;
    
    constructor(date_fromInput, date_toInput, user_idInput, listing_idInput){
        this.date_from = date_fromInput;
        this.date_to = date_toInput;
        this.user_id = user_idInput;
        this.listing_id = listing_idInput;
    }
}
