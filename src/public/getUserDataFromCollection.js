// Filename: public/getDataFromCollection.js
import wixData from 'wix-data';
// Code written in public files is shared by your site's
// Backend, page code, and site code environments.

// Use public files to hold utility functions that can
// be called from multiple locations in your site's code.
export function add(param1, param2) {
	return param1 + param2;
}

export async function getUserDataFromCollection (membershipPlan, repeaterId, catFilter){
    const myCollection = "EliteMembershipData";

    let results = await wixData.query(myCollection).find();

    if (results.items.length == 0) {
        return;
    }
    // get premium membership users
    let premiumMembershipUsers = results.items.filter(
        (item) => {

            if (catFilter === "RESET_ALL") {
                //console.log(item.membershipPlan, membershipPlan)

                return item.membershipPlan === membershipPlan // we do not filter by industry in this case
            } else {
                //console.log(item.membershipPlan, membershipPlan)
                return (item.membershipPlan === membershipPlan) && (item.businessIndustry === catFilter);
            }

        }

       
    );

   

  
 return premiumMembershipUsers;
	
    

}


// The following code demonstrates how to call the add
// function from your site's page code or site code.
/*
import {add} from 'public/getDataFromCollection.js'
$w.onReady(function () {
    let sum = add(6,7);
    console.log(sum);
});
*/