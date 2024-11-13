/**
 * 
 * @param {*} userData Full list of user data
 * @param {*} tarUser A target user to get followers from
 * @returns A List of users that follow tarUser
 */
export function filterFollowers(userData, tarUser){
    const filterFollowers = userData.filter(aUser => tarUser.followers.indexOf(aUser.userId) != -1)
    
    return filterFollowers;
}

/**
 * 
 * @param {*} userData Full list of user data
 * @param {*} tarUser A target user to get following from
 * @returns A List of users that tarUser follows
 */
export function filterFollowing(userData, tarUser){
    const filterFollowing = userData.filter(aUser => tarUser.following.indexOf(aUser.userId) != -1)

    return filterFollowing
}

export function userById(userData, tarID){
    const filteredUsers = userData.filter(aUser => aUser.userId == tarID)

    return filteredUsers[0];
}