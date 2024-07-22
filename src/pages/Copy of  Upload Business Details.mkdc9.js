import wixData from 'wix-data';

import { getLoggedInMember } from 'public/getLoggedInMember'
import { putIntoCollection } from 'public/putIntoCollection'

function hideErrors(params) {
    for (let index = 76; index < 89; index++) {
        $w(`#text${index}`).hide();

    }
    // HIDE LOADING BAR ELEMENTS
    $w(`#columnStrip52`).hide();
    $w(`#text89`).hide();
    
}

$w.onReady(() => {
    // hide error messages
    hideErrors();

    console.log("yes");
    $w('#SubmitButton').onClick(submitOnClickx)

})

async function submitOnClickx(event) {
    let businessName = $w("#businessName").value;

    if (!businessName) {
        $w(`#text76`).show();
        return
    } else {
        $w(`#text76`).hide();
    }

    let email = $w("#email").value;

    if (!email) {
        $w(`#text77`).show();
        return
    } else {
        $w(`#text77`).hide();
    }

    let phone = $w("#phone").value;

    if (!phone) {
        $w(`#text78`).show();
        return
    } else {
        $w(`#text78`).hide();
    }

    let address = $w("#address").value;
     if (!address) {
        $w(`#text79`).show();
        return
    } else {
        $w(`#text79`).hide();
    }


    let businessIndustry = $w("#businessIndustry").value;

     if (!businessIndustry) {
        $w(`#text80`).show();
        return
    } else {
        $w(`#text80`).hide();
    }
    let detailedBusinessDescriptionRichTextBox = $w("#detailedBusinessDescriptionRichTextBox").value;

     if (!detailedBusinessDescriptionRichTextBox) {
        $w(`#text81`).show();
        return
    } else {
        $w(`#text81`).hide();
    }

    let businessDescription = $w("#businessDescription").value;

     if (!businessDescription) {
        $w(`#text82`).show();
        return
    } else {
        $w(`#text82`).hide();
    }

    let businessLogo = $w("#businessLogo")

    let businessLogoImages;
    if (businessLogo.value.length === 0) {
        $w(`#text83`).show();
        return
    } else {
         $w(`#text83`).hide();
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

    let businessImagesButton = $w("#businessImages")

    if (businessImagesButton.value.length === 0) {
         $w(`#text84`).show();
         return;
    } else {

        $w(`#text84`).hide();

        let businessImagesMeta = await businessImagesButton.uploadFiles();
        // businessImages = []
      businessImages =   businessImagesMeta.map((v, i) => {
            return {
                "src": v.fileUrl,
                "type": "image",
                "title": v.originalFileName,
                "slug": v.fileName

            }
        })

    }

    let facebookLink = $w("#facebookLink").value;
      if (!facebookLink) {
        $w(`#text85`).show();
        return
    } else {
        $w(`#text85`).hide();
    }
    let instagramLink = $w("#instagramLink").value;
      if (!instagramLink) {
        $w(`#text86`).show();
        return
    } else {
        $w(`#text86`).hide();
    }
    let twitterLink = $w("#twitterLink").value;
     if (!twitterLink) {
        $w(`#text87`).show();
        return
    } else {
        $w(`#text87`).hide();
    }
    let introductoryVideo = $w("#introductoryVideo").value;
  // remeber to add validation for the introductory video field;
    let allAvailable = businessName && email && phone && address && businessIndustry && detailedBusinessDescriptionRichTextBox && businessDescription && businessImages && facebookLink && instagramLink && twitterLink && introductoryVideo && businessLogo;

    // if (!allAvailable) {
    // 	// maybe we could put a way of alerting
    // 	// the person to populate other fields that are not populated

    // 	return;
    // } 

    //  check if the logged in user is in the MemberandSubscriptionPlans(by Id) collection
    let loggedInMember = await getLoggedInMember();

    let data = await wixData.query("MemberandSubscriptionPlans")
        .contains("memberId", loggedInMember.memberId).find()

    // console.log(data)

    let tester = data.items.length === 0

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
        "additionalImages":  businessImages ,
        "videoIntroduction": introductoryVideo,
        "membershipPlan": data.items[0].subscriptionPlans,
        "detailedBusinessDescription": detailedBusinessDescriptionRichTextBox,
        "userId": loggedInMember.memberId
    }
    $w(`#columnStrip52`).show();
    $w(`#text89`).show();

    let result = await putIntoCollection("EliteMembershipData", preparedData)
    // console.log( businessName + "as businessName",email + "as email",phone + "as phone",address + "as address",businessIndustry + "as businessIndustry",detailedBusinessDescriptionRichTextBox + "as detailedBusinessDescriptionRichTextBox",businessDescription + "as businessDescription",facebookLink + "as facebookLink",businessImages + "as businessImages",twitterLink + "as twitterLink",introductoryVideo + "as introductoryVideo",instagramLink)

    if (result == "yes") {
        // change the text of some element to show successful
        $w(`#text89`).text = "submitted business successfully"
        $w(`#columnStrip52`).hide("fade");
        $w(`#text89`).hide("fade");
        console.log("submitted business successfully")
    } else {
       $w(`#text89`).text = "error submitting business"
        $w(`#columnStrip52`).hide("fade");
        $w(`#text89`).hide("fade");
       // console.log("error submitting business")
    }

}