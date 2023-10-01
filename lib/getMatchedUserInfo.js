const getMatchedUserInfo = (users, userLoggedIn) => {
    const newUsers = { ...users }; //para no tocar el vector bueno
    delete newUsers[userLoggedIn];

    const [id, user] = Object.entries(newUsers).flat();

    return { id, ...user }
};

export default getMatchedUserInfo;