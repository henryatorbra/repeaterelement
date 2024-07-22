import wixData from 'wix-data';

export async function putIntoCollection (collectionName,newItem){
    try {
        const someData =  await wixData.insert(collectionName, newItem)
        return "yes"
    } catch (error) {
        console.log(error);
        return error.message
    }
   
  
}