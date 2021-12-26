import { collection, getDocs, getFirestore } from "firebase/firestore";

// Problem with Firebase Admin, db not accessable
import {admin} from "@/lib/firebase-admin";

const db = getFirestore()
export default async (_, res) => {
    const querySnapshot = await getDocs(collection(db, 'sites'))
    const sites = []

    querySnapshot.forEach((doc) => {
      sites.push({id: doc.id, ...doc.data()})
    })

    res.status(200).json({sites})
}