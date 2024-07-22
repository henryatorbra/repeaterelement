import { currentMember } from "wix-members-backend";

export async function getLoggedInMember (){
     const member = await currentMember.getMember({fieldsets: [ 'FULL' ]});
      const memberId = member._id;
      const fullName = `${member.contactDetails.firstName} ${member.contactDetails.lastName}`;
      //const memberProfilePage = `https://yoursite.com/profile/${member.profile.slug}/profile`;

      const memberObject = {
          "memberId": memberId,
          "fullName": fullName
      }
      return memberObject;
}

