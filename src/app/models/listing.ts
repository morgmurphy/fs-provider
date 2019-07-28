export class Listing {
    serviceProviderId: string;
    name: string;
    location: string;
    price: number;
    description: string;
    imgUrl: string
    
    constructor(serviceProviderIdInput, nameInput, locationInput, priceInput, descriptionInput, imgURLInput){
        this.serviceProviderId = serviceProviderIdInput;
        this.name = nameInput;
        this.location = locationInput;
        this.price = priceInput;
        this.description = descriptionInput;
        this.imgUrl = imgURLInput;
    }

}
