// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { session } from "wix-storage-frontend"
import wixData from 'wix-data';
function supplyBusinessName (){
	$w('#Section1RegularSubtitle1').text = JSON.parse(  session.getItem("title"))
   // console.log(session.getItem("title"));
	return  JSON.parse(session.getItem("title"))
	
}

async function getUserData(membershipPlan, repeaterId, catFilter) {
    // don't mind the "EliteMembershipData" this is the collections of 
    // all the users irrespective of their membership plans.

    const myCollection = "EliteMembershipData";

    let dataOfUser = await wixData.query(myCollection)
        .contains("title", supplyBusinessName())
        .find()

   // console.log(dataOfUser.items[0].website);

  

    return dataOfUser.items
  
}

async function populateUserDetails(detailsArray) {
    let mainDetails = detailsArray[0];
     console.log(mainDetails);
    $w("#Section1RegularLongtext1").text = mainDetails.businessDescription;
    $w("#gallery1").items = mainDetails.additionalImages;

    // hide the repeater that we arent using for now.

    $w("#Section3Repeater").hide();
}




$w.onReady(async function () {
	supplyBusinessName()
   let  userData = await getUserData();
    populateUserDetails(userData);
	// Write your Javascript code here using the Velo framework API

	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	// Click "Run", or Preview your site, to execute your code

});