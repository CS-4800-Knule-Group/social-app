/**
 * To export these functions, they need to be in a
 * useEffect and within an async function. for example:
 * 
 * useEffect(() =>{
 *  const fetchUser = async() =>{
 *      const test =  await getUsers();
 *  };
 * });
 */

const apiPosts = 'https://knule.duckdns.org/posts';
const apiUsers = 'https://knule.duckdns.org/users';

export const getUsers = async() => {
    try{
        const response = await fetch(apiUsers, {
            method: 'GET',
        });

        if (!response.ok){
            throw new Error('Could not reach /users');
        }

        return await response.json();
    } catch(err){
        console.error('Error fetching users', error);
    }
}

export const getPosts = async() => {
    try{
        const response = await fetch(apiPosts, {
            method: 'GET',
        });

        if (!response.ok){
            throw new Error('Could not reach /posts');
        }
        return await response.json();
    } catch(err){
        console.error('Error fetching posts', err);
    }    
}



