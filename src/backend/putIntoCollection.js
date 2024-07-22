import wixData from 'wix-data';

export async function putIntoCollection (collectionName,newItem){
   const someData =  await wixData.insert(collectionName, newItem)
   //console.log(someData);
}