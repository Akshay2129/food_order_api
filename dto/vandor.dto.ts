export interface CreateVandorInput {
    name: String;
    ownerName: String;
    foodtype: [String];
    pincode: String;
    address: String;
    phone: String;
    email: String;
    password: String;
}


export interface VandorLoginInputs {
    email: String;
    password: String;
}

export interface VandorPayload {
    _id: String;
    email: String;
    name: String;
    foodtype: string[]
    //
}

export interface EditVandorInputs {

    name: String;
    address: String;
    phone: String;
    foodtype: string[]
    //
}