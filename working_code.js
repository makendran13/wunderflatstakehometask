//Incoming data from webhook
const inpData = {
    "user_id": 1982375432,
    "user_name": "Max Mustermann",
    "Move_in": "2021-07-01T0:00:00+00:00",
    "city": "Hamburg",
    "zip_code": "20435",
    "country": "Germany",
    "adults": 2,
    "children": 1,
    "wants_visit": true,
    "pets": 0,
    "job_title": "Business Operations Manager",
    "option_to_extend": false,
    "budget": 1300,
    "verified_by_id": true
    };

const axios = require ('axios');
const salesAccountLink = 'https://domain.myfreshworks.com/crm/sales/api/sales_accounts/'
const dealLink = 'https://domain.myfreshworks.com/crm/sales/api/deals/';
const taskLink = 'https://domain.myfreshworks.com/crm/sales/api/tasks/';

async function asyncall()
    {
    const userName = inpData.user_name;
    const userid = inpData.user_id;
    const viewSalesAccount = salesAccountLink + userid + '?include=owner';
    try {
        const accountResponse = axios.get(viewSalesAccount); 
        const rop = await (accountResponse); 
        // Assumption: Each account has only one deal. But each deal can have several tasks.    
        // A task on the deal will be created, because we already have an account with the ID from the webhook (according to my assumption). 
        // But need to check if the task will be created on the account level or deal level.  
        const ascDeal = dealLink + userid + '?include=deals';
        const getDeal = axios.get(ascDeal);
        const dop = await(getDeal);
        const exDealID = dop.data.id;
            const obj = {
                "title": "New task for ${userName}",
                "due_date": inpData.Move_in,
                "targetable_id": exDealID,
                "targetable_type": "Deal",
                "owner_id": accountResponse.owner_id
            }
                axios.post(
                    taskLink,
                    [this.obj],
                )
            .then(response => {
                console.log(exDealID, response.data.id)
                })
            .catch(error => {
                console.log(error.code);
                });        
        } 
    catch {
        // There was no account with the id. Therefore a new account with a new deal has to be created.
        // The ID of the deal and ID of the account created is returned.
        var date = inpData.Move_in;
        var extDate = date.split("T");
        var formatDate  = new Date(extDate);
        var dealDate = formatDate.toLocaleDateString("de-DE");
        var agencyFee = 249;
        const obj = {
            "name": inpData.user_name + ' ' + dealDate,
            "amount": inpData.budget - agencyFee, // I don't how the amount is calculated. So I assumed that we reduce the agency fee from the overall budget.
            "sales_account": {"name":inpData.user_name},
            "custom_field":{
                "cf_job_title": inpData.job_title,
                "cf_budget": inpData.budget,
                "cf_city": inpData.city,
                "cf_zipcode": inpData.zip_code,
                "cf_country": inpData.country,
                "cf_number_of_tenants": inpData.adults + inpData.children,
                "cf_wants_visit": inpData.wants_visit, //Form has a boolean field but the response is Yes. Easy fix - Change the form input field to boolean.
                "cf_pets": inpData.pets,
                "cf_option_to_extend": inpData.option_to_extend,
                "cf_verified_by_id": inpData.verified_by_id
            }
        }
        axios.post(
            createTask,
            [this.obj],
        )
        .then(response => {
            console.log(response.data.customer_id, response.data.id)
          })
        .catch(error => {
            console.log(error.code);
          }); 
        }
    } 
asyncall()