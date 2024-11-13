/**
 * 
 * @param {*} userData Full list of user data
 * @param {*} tarUser A target user to get followers from
 * @returns A List of users that follow tarUser
 */
export function filterFollowers(userData, tarUser){
    try{
        const filterFollowers = userData.filter(aUser => tarUser.followers.indexOf(aUser.userId) != -1)
    
        return filterFollowers;
    }catch(err){
        console.log("Failed to filter followers", err)
        return undefined
    }
}

/**
 * 
 * @param {*} userData Full list of user data
 * @param {*} tarUser A target user to get following from
 * @returns A List of users that tarUser follows
 */
export function filterFollowing(userData, tarUser){
    try{
        const filterFollowing = userData.filter(aUser => tarUser.following.indexOf(aUser.userId) != -1)

        return filterFollowing
    }catch(err){
        console.log("Failed to filter following", err);
        return undefined;
    }
}

export function userById(userData, tarID){
    const filteredUsers = userData.filter(aUser => aUser.userId == tarID)

    return filteredUsers[0];
}