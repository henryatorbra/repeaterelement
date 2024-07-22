// Filename: public/convertPlanidtoMembershipPlanName.js
// @ts-ignore
import { getPlans } from 'public/getPlans.js';
// Code written in public files is shared by your site's
// Backend, page code, and site code environments.

// Use public files to hold utility functions that can
// be called from multiple locations in your site's code.
export function add(param1, param2) {
    return param1 + param2;
}

// The following code demonstrates how to call the add
// function from your site's page code or site code.
/*
import {add} from 'public/convertPlanidtoMembershipPlanName.js'
$w.onReady(function () {
    let sum = add(6,7);
    console.log(sum);
});
*/

export async function getPlansFromId(Id) {
    const plans = await getPlans()
    const membershipPlan = plans.filter((v) => {
        return v._id === Id
    })

    return membershipPlan[0].name;
}