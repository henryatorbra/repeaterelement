import wixData from 'wix-data';

import { getLoggedInMember } from 'public/getLoggedInMember'
import { putIntoCollection } from 'public/putIntoCollection'

function hideErrors(params) {
    for (let index = 78; index < 83; index++) {
        $w(`#text${index}`).hide();

    }
    $w("#text83").hide()
    $w("#columnStrip52").hide()
}

$w.onReady(()=>{
  hideErrors();
   
console.log("yes");
// hide error message
$w('#text76').hide()
$w('#text77').hide()
// register onclick for submit
$w('#button5').onClick(()=>{
	try {
		submitOnClickx()
	} catch (error) {
		console.log(error)
	}
})   

})

async function submitOnClickx(event) {
    let businessName = $w("#input5").value;
    
    if (!businessName) {
        $w("#text78").show()
        return;
    } else {
        $w("#text78").hide()
    }
    let email = $w("#input6").value;
    if (!email) {
        $w("#text78").show()
        return;
    } else {
        $w("#text78").hide()
    }
    let phone = $w("#input7").value;
    if (!phone) {
        $w("#text78").show()
        return;
    } else {
        $w("#text78").hide()
    }
    let address = $w("#input4").value;
     if (!address) {
        $w("#text78").show()
        return;
    } else {
        $w("#text78").hide()
    }
    let businessIndustry = $w("#input8").value;
     if (!businessIndustry) {
        $w("#text78").show()
        return;
    } else {
        $w("#text78").hide()
    }
  //  let detailedBusinessDescriptionRichTextBox = $w("#detailedBusinessDescriptionRichTextBox").value;
    // let businessDescription = $w("#richTextBox1").value;
    // let businessLogo = $w("#uploadButton1").value
    // //let businessImages = $w("#uploadButton2").value;
    // let facebookLink = $w("#input9").value;
    // let instagramLink = $w("#input10").value;
    // let twitterLink = $w("#input11").value;
    //let introductoryVideo = $w("#introductoryVideo").value;

    let allAvailable = businessName && email && phone && address && businessIndustry ;
   
    // if (!allAvailable) {
    // 	// maybe we could put a way of alerting
    // 	// the person to populate other fields that are not populated
		// $w('#text77').show()
		

    // 	return;
    // } 

  //  check if the logged in user is in the MemberandSubscriptionPlans(by Id) collection
    let loggedInMember = await getLoggedInMember();

   let data = await  wixData.query("MemberandSubscriptionPlans")
    .contains("memberId", loggedInMember.memberId).find()


  // console.log(data)
    
   
  
     let  tester = data.items.length === 0 

   if (tester) {

     return "You are not a subscribed member. Purchase a subscription plan"
 }

   // input the details into the businesses collection 

    let preparedData = {
      "title": businessName,
      "email": email,
      "phone": phone,
      "address": address,
      "businessIndustry": businessIndustry,
    //   "businessDescription": businessDescription,
    //   "logo": businessLogo,
    //   "facebookLink": facebookLink,
    //   "instagramLink": instagramLink,
    //   "twitterLink": twitterLink,
     // "additionalImages": businessImages,
      
      "membershipPlan": data.items[0].subscriptionPlans,
       "userId": loggedInMember.memberId
      
    }
//console.log(data.items[0].subscriptionPlans)
 $w("#text83").show()
  $w("#columnStrip52").show()

 let result  =  await putIntoCollection("EliteMembershipData", preparedData)
   // console.log( businessName + "as businessName",email + "as email",phone + "as phone",address + "as address",businessIndustry + "as businessIndustry",detailedBusinessDescriptionRichTextBox + "as detailedBusinessDescriptionRichTextBox",businessDescription + "as businessDescription",facebookLink + "as facebookLink",businessImages + "as businessImages",twitterLink + "as twitterLink",introductoryVideo + "as introductoryVideo",instagramLink)

if (result == "yes"){
  // change the text of some element to show successful
  console.log("submitted business successfully")
  $w('#text76').show()
  $w('#text77').hide()

   $w("#text83").text = "submitted business successfully";
  $w("#columnStrip52").hide("fade")
  $w("#text83").hide("fade")
}else {
   $w("#text83").text = "error submitting business";
  $w("#columnStrip52").hide("fade")
  $w("#text83").hide("fade")
  console.log("error submitting business")
}

 
}



 
