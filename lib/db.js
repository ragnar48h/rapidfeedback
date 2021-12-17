import { getFirestore, doc, setDoc } from 'firebase/firestore'
import './firebase'

const db = getFirestore();
export function createUser(uid, data) {
    return setDoc(doc(db, 'users', uid), {uid, ...data})
}


