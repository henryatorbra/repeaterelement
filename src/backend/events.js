/*****************
 backend/events.js
 *****************

 'backend/events.js' is a reserved Velo file that enables you to handle backend events.

 Many of the Velo backend modules, like 'wix-stores-backend' or 'wix-media-backend', include events that are triggered when 
 specific actions occur on your site. You can write code that runs when these actions occur.

 For example, you can write code that sends a custom email to a customer when they pay for a store order.

 Example: Use the function below to capture the event of a file being uploaded to the Media Manager:

   export function wixMediaManager_onFileUploaded(event) {
       console.log('The file "' + event.fileInfo.fileName + '" was uploaded to the Media Manager');
   }

 ---
 More about Velo Backend Events: 
 https://support.wix.com/en/article/velo-backend-events

*******************/

import {getPlans} from 'backend/getPlans.js';
import {getLoggedInMember} from 'backend/getLoggedInMember.js'
import { collections } from "wix-data.v2";
import {putIntoCollection} from 'backend/putIntoCollection.js';
//import wixLocationFrontend from "wix-location-frontend";

// MemberandSubscriptionPlans
async function getPlansIds (){
  var plansArray = await getPlans();

  var arrayOfIds = plansArray.map((plan)=> {
    return plan._id;
  })
  return arrayOfIds;
}



export async function wixPricingPlans_onOrderMarkedAsPaid(event) {
  // const orderId = event.entity._id;
  // const paidDate = event.metadata.eventTime;
  // const planId = event.data.planId;
  // const buyerContactId = event.entity.buyer.contactId;

  // console.log(
  //   `Order ID ${event.orderId} to purchase plan ID ${planId} was paid on ${paidDate} by the buyer contact ID ${buyerContactId}. The full event object:`,
  //   event,
  // );
  // console.log(event);
  var arrayOfPlanIds = await getPlansIds();
  var planId = event.data.order.planId;
  console.log(`this is the plan Id ${planId}`)

  if (planId === null || planId === undefined) {
    return "This is not a subscription plan. Because there is no plan Id or because planId is null of undefined."
  }

  var thePlanIdBeingPurchased = arrayOfPlanIds.find((testPlanId) => {
      //console.log(testPlanId)


      return testPlanId === planId && planId !== null;
  })

   if (thePlanIdBeingPurchased === null || thePlanIdBeingPurchased === undefined) {
    return "This is not a subscription plan. Because the plans don't match ."
  }


// get logged in member
const loggedInMember = await getLoggedInMember()

const preparedData = {"title": loggedInMember.fullName, "memberId": loggedInMember.memberId, "subscriptionPlans": thePlanIdBeingPurchased}

console.log(preparedData);
// put the data into the appropriate collection

// remember to add the functionality that will check if the logged in 
// member is already in this collection before creating it anew
await putIntoCollection("MemberandSubscriptionPlans", preparedData)




// ...

//wixLocationFrontend.to("/about-me");


}
