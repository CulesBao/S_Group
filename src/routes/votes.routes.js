import express from 'express'
import votesMiddleware from '../middleware/votes.middleware.js'
import votesController from '../controller/votes.controller.js'

const router = express.Router()

router.post('/create-poll', votesMiddleware.createPoll, votesController.createPoll)
router.delete('/delete-poll/:id', votesMiddleware.deletePoll, votesController.deletePoll)
router.post('/create-option', votesMiddleware.createOption, votesController.createOption)
router.post('/vote',votesMiddleware.vote, votesController.vote)
router.delete('/unvote', votesMiddleware.unVote, votesController.unVote)
router.get('/get-votes/:id', votesMiddleware.getVote, votesController.getVote)
router.put('/isLock', votesMiddleware.isLock, votesController.isLock)

export default router