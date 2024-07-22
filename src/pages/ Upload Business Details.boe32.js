import wixData from 'wix-data';

import { getLoggedInMember } from 'public/getLoggedInMember'
import { putIntoCollection } from 'public/putIntoCollection'



function hideErrors(params) {
    for (let index = 78; index < 89; index++) {
        $w(`#text${index}`).hide();

    }
}

$w.onReady(()=>{
// hide loading screen
  $w("#columnStrip52").hide();
    $w("#text89").hide();

console.log("yes");
$w('#button5').onClick(submitOnClickx)   

})

async function submitOnClickx(event) {
    let businessName = $w("#input5").value;
 if (!businessName) {
        $w(`#text78`).show();
        return
    } else {
        $w(`#text78`).hide();
    }

    let email = $w("#input6").value;
     if (!email) {
        $w(`#text79`).show();
        return
    } else {
        $w(`#text79`).hide();
    }
    let phone = $w("#input7").value;
     if (!phone) {
        $w(`#text80`).show();
        return
    } else {
        $w(`#text80`).hide();
    }
    let address = $w("#input4").value;
     if (!address) {
        $w(`#text81`).show();
        return
    } else {
        $w(`#text81`).hide();
    }
    let businessIndustry = $w("#input8").value;

     if (!businessIndustry) {
        $w(`#text82`).show();
        return
    } else {
        $w(`#text82`).hide();
    }
  //  let detailedBusinessDescriptionRichTextBox = $w("#detailedBusinessDescriptionRichTextBox").value;
    let businessDescription = $w("#richTextBox1").value;
     if (!businessDescription) {
        $w(`#text83`).show();
        return
    } else {
        $w(`#text83`).hide();
    }
     let businessLogo = $w("#uploadButton1")

    let businessLogoImages;
    if (businessLogo.value.length === 0) {
        $w(`#text84`).show();
        return
    } else {
         $w(`#text84`).hide();
        let businessLogoMeta = await businessLogo.uploadFiles();
        businessLogoImages = businessLogoMeta.map((v, i) => {
            return {
                "src": v.fileUrl,
                "type": "image",
                "title": v.originalFileName,
                "slug": v.fileName

            }
        })
    }

    let businessImages;

    let businessImagesButton = $w("#uploadButton2")

    if (businessImagesButton.value.length === 0) {
         $w(`#text85`).show();
         return;
    } else {

        $w(`#text85`).hide();

        let businessImagesMeta = await businessImagesButton.uploadFiles();
        // 
       businessImages =  businessImagesMeta.map((v, i) => {
            return {
                "src": v.fileUrl,
                "type": "image",
                "title": v.originalFileName,
                "slug": v.fileName

            }
        })

    }
    let facebookLink = $w("#input9").value;
     if (!facebookLink) {
        $w(`#text86`).show();
        return
    } else {
        $w(`#text86`).hide();
    }
    let instagramLink = $w("#input10").value;

     if (!instagramLink) {
        $w(`#text87`).show();
        return
    } else {
        $w(`#text87`).hide();
    }
    let twitterLink = $w("#input11").value;

     if (!twitterLink) {
        $w(`#text88`).show();
        return
    } else {
        $w(`#text88`).hide();
    }
    //let introductoryVideo = $w("#introductoryVideo").value;

    let allAvailable = businessName && email && phone && address && businessIndustry && businessDescription && businessImages && facebookLink && instagramLink && twitterLink &&  businessLogo;
   
    // if (!allAvailable) {
    // 	// maybe we could put a way of alerting
    // 	// the person to populate other fields that are not populated

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
      "businessDescription": businessDescription,
      "logo": businessLogoImages,
      "facebookLink": facebookLink,
      "instagramLink": instagramLink,
      "twitterLink": twitterLink,
      "additionalImages": businessImages,
      
      "membershipPlan": data.items[0].subscriptionPlans,
      "userId": loggedInMember.memberId
      
    }
//console.log(data.items[0].subscriptionPlans)
$w("#columnStrip52").show();
    $w("#text89").show();
 let result  =  await putIntoCollection("EliteMembershipData", preparedData)
   // console.log( businessName + "as businessName",email + "as email",phone + "as phone",address + "as address",businessIndustry + "as businessIndustry",detailedBusinessDescriptionRichTextBox + "as detailedBusinessDescriptionRichTextBox",businessDescription + "as businessDescription",facebookLink + "as facebookLink",businessImages + "as businessImages",twitterLink + "as twitterLink",introductoryVideo + "as introductoryVideo",instagramLink)

if (result == "yes"){
  
    $w("#text89").text = "submitted business successfully";

    $w("#columnStrip52").hide("fade");
    $w("#text89").hide("fade");
  // change the text of some element to show successful
  console.log("submitted business successfully")
}else {
  $w("#text89").text = "error submitting business";

    $w("#columnStrip52").hide("fade");
    $w("#text89").hide("fade");
  console.log("error submitting business")
}


}



 
