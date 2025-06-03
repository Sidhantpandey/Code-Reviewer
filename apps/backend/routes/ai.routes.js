import {Router} from "express"
import * as aiController from "../controllers/ai.controllers.js"


const router=Router()


/**
 * Route to get response from the ai service
 */
router.route('/get-review').post(aiController.getReview);

export default router