import { compareDesc, parseISO } from "date-fns"
import { db } from "./firebase-admin"

export async function getAllFeedback(siteId) {
    try {
        const querySnapshot = await db.collection('feedback').where('siteId', '==', siteId).get()

        const feedback = []
        
        querySnapshot.forEach((doc) => {
            feedback.push({ id: doc.id, ...doc.data() })
        })
    
        feedback.sort((a,b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)))
    
        return {feedback}
    } catch (error) {
        return {error}
    }
}

export async function getAllSites() {
    try {
        const querySnapshot = await db.collection('sites').get()
        const sites = []

        querySnapshot.forEach((doc) => {
          sites.push({id: doc.id, ...doc.data()})
        })

        return {sites}
    } catch(error) {
        return {error}
    }
}