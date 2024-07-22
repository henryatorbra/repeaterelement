// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';
import {session} from "wix-storage-frontend"
import wixLocationFrontend from "wix-location-frontend";

let membershipPlansArray = [{
        membershipPlan: "Basic Membership",
        repeaterIdConnected: "#BasicMembership",
        membershipPlanId: "653bc395-f634-47f2-b214-1de39a9711a7"
    },
    {
        membershipPlan: "Standard Membership",
        repeaterIdConnected: "#StandardMembership",
         membershipPlanId: "b61539c3-2940-4510-8936-897d18cada71"
    },
    {
        membershipPlan: "Premium Membership",
        repeaterIdConnected: "#PremiumMembership",
         membershipPlanId: "bb3947ac-5990-4bfc-b668-b5c9d9c47d52"
    },
    {
        membershipPlan: "Elite Membership",
        repeaterIdConnected: "#EliteMembership",
         membershipPlanId: "ab7ae40a-c2e2-4328-bf2a-c5e51862b80a"
    },
]
// populate Repeaters function definition
// main onready function is below.
// filters data coming from the elite membership collection according
// to the membership plan and the filter selected by the input radio button
async function populuateRepeater(membershipPlanId,membershipPlan, repeaterId, catFilter) {
    // don't mind the "EliteMembershipData" this is the collections of 
    // all the users irrespective of their membership plans.

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

                return item.membershipPlan === membershipPlanId// we do not filter by industry in this case
            } else {
                //console.log(item.membershipPlan, membershipPlan)
                return (item.membershipPlan === membershipPlanId) && (item.businessIndustry === catFilter);
            }

        }
    );

    // here we should get the particular repeater element
    // we want and populate it with the filtered array.

    let repeaterElement = $w(repeaterId);
    repeaterElement.data = [];

    repeaterElement.data = premiumMembershipUsers;

	
    

}
/// end of populateRepeater function.

// function  onchangeForRadioButton() {
// 	$w("#radioGroup1")
// }

$w.onReady(async function () {

   // console.log($w('#gallery1').items)
    // get the repeaters and set their fields 

    $w("#EliteMembership").onItemReady(($item, itemData, index) => {

         // This runs each time a new repeater item is created
        // You initialize a repeater item here.

        $item('#text133').text = itemData.title;
        $item('#text140').text = itemData.phone;

        //remember to add email later and website
        // $item('#text128').text = itemData.email;
        // $item('#text126').text = itemData.website;
        $item('#collapsibleText1').text = itemData.businessDescription;

        if (!itemData.logo){
            // remember to connect image source from collection to this element in the
            // appropriate condition.
            $item('#image50').hide();
        }

        $item('#button7').onClick(()=>{
            let state = {
                title: itemData.title
            }
            
            // set the name of the item in the collection
            // so that another page can read this state,
            // search for the item in the collection and
            // collect the necessary information.
            session.setItem("title", JSON.stringify(itemData.title));
            
            wixLocationFrontend.to("/about-1");
           
        });

        //

        // static fields 

        // connect these fields to the static ttext boxex if available
        // $item('#text130').text = "Phone Number: ";
        // $item('#text127').text = "Email: ";
        // $item('#text125').text = "Website: ";

	// put images into the multiple images section of the items with premium memberships
	// we willl log the itemdata and see how wix gives us those images  in the item data
	// before we can continue adding the images from the collection into the slider gallery.
		$item("#gallery3").items = itemData.additionalImages
		//console.log(itemData.additionalImages)3

    });
    $w("#PremiumMembership").onItemReady(($item, itemData, index) => {
        // This runs each time a new repeater item is created
        // You initialize a repeater item here.

        $item('#text136').text = itemData.title;
        // remeber to create a way for these
        // to be represented

         $item('#text141').text = itemData.phone;
        // $item('#text120').text = itemData.email;
        // $item('#text118').text = itemData.website;
        $item('#collapsibleText2').text = itemData.businessDescription;

        // static fields; give them representation if possible.

        // $item('#text122').text = "Phone Number: ";
        // $item('#text119').text = "Email: ";
        // $item('#text117').text = "Website: ";

        if (!itemData.logo){
            // remember to connect image source from collection to this element in the
            // appropriate condition.
            $item('#image97').hide();
        }

	// put images into the multiple images section of the items with premium memberships
	// we willl log the itemdata and see how wix gives us those images  in the item data
	// before we can continue adding the images from the collection into the slider gallery.
		$item("#gallery8").items = itemData.additionalImages
		//console.log(itemData.additionalImages)3

    });
    // Standard Membership Repeater;
    $w("#StandardMembership").onItemReady(($item, itemData, index) => {
        // This runs each time a new repeater item is created
        // You initialize a repeater item here.

        $item('#text138').text = itemData.title;
        $item('#text142').text = itemData.phone;
        // attach these to the icons somehow
        // $item('#text109').text = itemData.email;
        // $item('#text107').text = itemData.website;
        $item('#collapsibleText4').text = itemData.businessDescription;

        // give Icons representation
        // $item('#image42').clickAction = "link";
        // $item('#image43').clickAction = "link";
        // $item('#image42').link = itemData.instagramLink;
        // $item('#image43').link = itemData.facebookLink;

        if (!itemData.logo){
            // remember to connect image source from collection to this element in the
            // appropriate condition.
            $item('#image97').hide();
        }

        // static fields 

        // here too
        // $item('#text111').text = "Phone Number: ";
        // $item('#text108').text = "Email: ";
        // $item('#text106').text = "Website: ";
    });

    //Basic Membership Repeater;
    $w("#BasicMembership").onItemReady(($item, itemData, index) => {
        // This runs each time a new repeater item is created
        // You initialize a repeater item here.
        $item('#text139').text = itemData.title;
        $item('#text142').text = itemData.phone;

        // $item('#text85').text = itemData.email;
        // $item('#text114').text = itemData.website;

        // static fields 
        // $item('#text80').text = "Phone Number: ";
        // $item('#text81').text = "Email: ";
        // $item('#text115').text = "Website: ";

    });

    $w("#dropdown1").onChange(async (event) => {

        membershipPlansArray.map(async (e, i, array) => {
            await populuateRepeater(e.membershipPlanId,e.membershipPlan, e.repeaterIdConnected, event.target.value);
        });
        // await populuateRepeater("Elite Membership","#EliteMembership",event.target.value)
        // await populuateRepeater("Premium Membership","#PremiumMembership",event.target.value)
        // await populuateRepeater("Standard Membership","#StandardMembership",event.target.value)
        // await populuateRepeater("Basic Membership","#BasicMembership",event.target.value)

    });

    // when the page is ready, we want to cycle through our membership plans array
    // and call the populateRepeater function for each of the membership plans there
    // they will also be called again when the radio button detects a change in the option selected
    // the onchange function will be called, we will also map through the membership plans array and call the 
    // populateRepeater functions again.
    membershipPlansArray.map(async (e, i, array) => {
        await populuateRepeater(e.membershipPlanId,e.membershipPlan, e.repeaterIdConnected, "RESET_ALL");
    });

    // await populuateRepeater("Elite Membership", "#EliteMembership", "RESET_ALL")
    // await populuateRepeater("Premium Membership","#PremiumMembership","RESET_ALL")
    // await populuateRepeater("Standard Membership","#StandardMembership","RESET_ALL")
    // await populuateRepeater("Basic Membership","#BasicMembership","RESET_ALL")

});

/**
*	Adds an event handler that runs when an input element's value
 is changed.
	[Read more](https://www.wix.com/corvid/reference/$w.ValueMixin.html#onChange)
*	 @param {$w.Event} event
*/
// export function radioGroup1_change(event) {
// 	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
// 	// Add your code for this event here: 
// }