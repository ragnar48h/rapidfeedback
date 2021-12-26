import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore'
import './firebase'

const db = getFirestore();
export function createUser(uid, data) {
    return setDoc(doc(db, 'users', uid), {uid, ...data})
}

export function createSite(data) {
    return addDoc(collection(db, 'sites'), data)
}
