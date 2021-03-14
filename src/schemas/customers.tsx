//Customer Databaseobject
export interface ICustomer {
    _id: string,
    date_created: string,
    user_id: string,
    lastname: string,
    firstname: string,
    address_street_name: string,
    address_street_number: string,
    address_city: string,
    address_zipcode: string,
    gender: string
}

export default ICustomer;