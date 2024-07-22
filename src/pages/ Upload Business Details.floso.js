import wixData from 'wix-data';

import { getLoggedInMember } from 'public/getLoggedInMember'
import { putIntoCollection } from 'public/putIntoCollection'

function hideErrors(params) {
    for (let index = 77; index < 87; index++) {
        $w(`#text${index}`).hide();

    }

    // hide loading Strip 
    $w(`#text87`).hide();
    $w(`#columnStrip52`).hide();
    
}

$w.onReady(() => {

    hideErrors();

    console.log("yes");
    // hide error message
    // $w('#text76').hide()
    // register onclick for submit
    $w('#button5').onClick(() => {
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
        $w("#text77").show()
        return;
    } else {
        $w("#text77").hide()
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
        $w("#text79").show()
        return;
    } else {
        $w("#text79").hide()
    }
    let address = $w("#input4").value;
    if (!address) {
        $w("#text80").show()
        return;
    } else {
        $w("#text80").hide()
    }
    let businessIndustry = $w("#input8").value;
     if (!businessIndustry) {
        $w("#text81").show()
        return;
    } else {
        $w("#text81").hide()
    }
    //  let detailedBusinessDescriptionRichTextBox = $w("#detailedBusinessDescriptionRichTextBox").value;
    let businessDescription = $w("#richTextBox1").value;
    if (!businessDescription) {
        $w("#text82").show()
        return;
    } else {
        $w("#text82").hide()
    }
    // let businessLogo = $w("#uploadButton1").value

     let businessLogo = $w("#uploadButton1")

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
    //let businessImages = $w("#uploadButton2").value;
    let facebookLink = $w("#input9").value;
    if (!facebookLink) {
        $w("#text84").show()
        return;
    } else {
        $w("#text84").hide()
    }
    let instagramLink = $w("#input10").value;
     if (!instagramLink) {
        $w("#text85").show()
        return;
    } else {
        $w("#text85").hide()
    }
    let twitterLink = $w("#input11").value;

     if (!twitterLink) {
        $w("#text86").show()
        return;
    } else {
        $w("#text86").hide()
    }
    //let introductoryVideo = $w("#introductoryVideo").value;

    let allAvailable = businessName && email && phone && address && businessIndustry && businessDescription && facebookLink && instagramLink && twitterLink && businessLogo;

    // if (!allAvailable) {
    //     // maybe we could put a way of alerting
    //     // the person to populate other fields that are not populated
    //     $w('#text76').show()
    //     $w('#text76').text = "Please provide input for all fields"

    //     return;
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
        // "additionalImages": businessImages,

        "membershipPlan": data.items[0].subscriptionPlans,
         "userId": loggedInMember.memberId

    }
    //console.log(data.items[0].subscriptionPlans)
    $w(`#text87`).show();
    $w(`#columnStrip52`).show();
    let result = await putIntoCollection("EliteMembershipData", preparedData)
    // console.log( businessName + "as businessName",email + "as email",phone + "as phone",address + "as address",businessIndustry + "as businessIndustry",detailedBusinessDescriptionRichTextBox + "as detailedBusinessDescriptionRichTextBox",businessDescription + "as businessDescription",facebookLink + "as facebookLink",businessImages + "as businessImages",twitterLink + "as twitterLink",introductoryVideo + "as introductoryVideo",instagramLink)

    if (result == "yes") {
        $w(`#text87`).text = "submitted business successfully";
        $w(`#columnStrip52`).hide("fade");
         $w(`#text87`).hide("fade");

        // change the text of some element to show successful
        console.log("submitted business successfully")
    } else {
        $w(`#text87`).text = "error submitting business";
        $w(`#columnStrip52`).hide("fade");
         $w(`#text87`).hide("fade");
        console.log("error submitting business")
    }

}