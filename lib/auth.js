import react, {useContext, useState, useEffect, createContext} from 'react';
import { GithubAuthProvider, signInWithPopup, signOut, getAuth, onAuthStateChanged } from "firebase/auth";

import './firebase'
import { createUser } from './db';

const authContext = createContext();


// At top level we wrap our application with this provider, so that all its children have access to its state
export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    const handleUser = (rawUser) => {
        if(rawUser) {
            const user = formatUser(rawUser)
            createUser(user.uid, user)

            setUser(user)
            return user
        }   else {
            setUser(false)
            return false
        }
    }

    console.log(user);
    const signinWithGithub = () => {
          return signInWithPopup(auth, provider)
                .then((result) => handleUser(result.user));
    };

    const signout = () => {
        return signOut(auth).then(() => handleUser(false))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => handleUser(user));

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signout
    };
}

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL
    }
}