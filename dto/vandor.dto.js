const CreateVandorInput = {
    name: '',
    ownerName: '',
    foodtype: [],
    pincode: '',
    address: '',
    phone: '',
    email: '',
    password: ''
};

const VandorLoginInputs = {
    email: '',
    password: ''
};

const VandorPayload = {
    _id: '',
    email: '',
    name: '',
    foodtype: []
};

const EditVandorInputs = {
    name: '',
    address: '',
    phone: '',
    foodtype: []
};

module.exports = {
    CreateVandorInput,
    VandorLoginInputs,
    VandorPayload,
    EditVandorInputs
};
