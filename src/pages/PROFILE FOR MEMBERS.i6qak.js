// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { getLoggedInMember } from 'public/getLoggedInMember';
import wixData from 'wix-data';
import { getPlansFromId } from 'public/convertPlanidtoMembershipPlanName'
import wixLocationFrontend from "wix-location-frontend";

// 1. the business tied to this member  at least the title of the business
// querying this collection; EliteMembershipData

// 2. the name of the user /
// we can get by calling the getLoggedInMember function

// 3. the plan of the user.
// query this collection; MemberandSubscriptionPlans by memberId and get the plan

// achieves no. 1.
async function getBusinessOfUser() {
    const member = await getLoggedInMember()
    const memberId = member.memberId
    const myCollection = "EliteMembershipData";
    let results = await wixData.query(myCollection).find();
    // get the business that the user has, will set it so that you can only have one later
    let memberArray = results.items.filter((v) => {
		//console.log(v.userId, memberId);
        return v.userId === memberId;
    })

    const memberBusinessGotten = memberArray[0];
	//console.log(memberArray)
    return memberBusinessGotten.title;

}

// achieves no. 2
async function getTheNameOfMember(){
	const member = await getLoggedInMember()
	
	return member.fullName;
}

// achieves no.3 
async function getMembershipPlanOfMember(params) {
	const member = await getLoggedInMember()
    const memberId = member.memberId

	 const myCollection = "MemberandSubscriptionPlans";
    let results = await wixData.query(myCollection).find();
    // get the business that the user has, will set it so that you can only have one later
    let memberArray = results.items.filter((v) => {
        return v.memberId === memberId;
    })

    const memberGotten = memberArray[0];

    return memberGotten.subscriptionPlans;

}
	


$w.onReady(async function () {
    // hide loading text indicator
    $w("#text71").hide()
   const businessNameOfMember = await getBusinessOfUser();

   $w("#text3").text = businessNameOfMember;

   const nameOfMember = await getTheNameOfMember();

    $w("#text7").text = nameOfMember;

	const membershipPlanId = await getMembershipPlanOfMember()
	const membershipPlanMain = await getPlansFromId(membershipPlanId)

	 $w("#Section1RegularLongtext1").text = membershipPlanMain;

	 $w("#button5").onClick(function(){
          $w("#text71").show()
          $w("#button5").disable()
          

		 let removedSpacesText = membershipPlanMain.split(" ").join("");
		console.log(removedSpacesText.toLowerCase())

        setTimeout(() => {
           wixLocationFrontend.to(`/${removedSpacesText.toLowerCase()}`);
        }, 10);
	
	 })

    // Write your Javascript code here using the Velo framework API

    // Print hello world:
    // console.log("Hello world!");

    // Call functions on page elements, e.g.:
    // $w("#button1").label = "Click me!";

    // Click "Run", or Preview your site, to execute your code

});