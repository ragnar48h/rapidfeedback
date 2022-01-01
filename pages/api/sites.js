import {auth} from '@/lib/firebase-admin'
import { getAllSites } from "@/lib/db-admin";

export default async (req, res) => {
    try {
        const {uid} = await auth.verifyIdToken(req.headers.token)
        const sites = await getAllSites(uid)
        
        res.status(200).json(sites)
    } catch(error) {
        res.status(200).json({error})
    }
}