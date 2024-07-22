import wixData from 'wix-data';

export async function  getPlans(params) {
    const results = await wixData.query("PaidPlans/Plans").find();
    return results.items;
    
}

