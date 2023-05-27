import { Router } from 'express'
import { generateToken, authToken, passportCall, authorization } from '../utils.js'
import passport from 'passport'

const router = Router()
const users = [
    { email: 'admin@coder.com', password: 'secret' , role: 'admin' },
    { email: 'user@coder.com', password: 'secret' , role: 'user' },
]

router.post('/register', (req, res) => {
    const user = req.body
    if (users.find(item => item.email === user.email)) {
        return res.status(400).json({ status: 'error', error: 'User already exists' })
    }
    users.push(user)
    const access_token = generateToken(user)
    res.json({ status: 'success', access_token })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = users.find(item => item.email === email && item.password === password)
    if (!user) return res.status(400).json({ status: 'error', error: 'Invalid credentials' })
    const access_token = generateToken(user)
    // res.json({ status: 'success', access_token })
    res.cookie('quebonitosoy', access_token).json({ status: 'success' })
})

// router.get('/private', authToken, (req, res) => {
router.get('/private', passportCall('jwt'), authorization('admin'), (req, res) => {
    // res.json({ message: 'ok! estas dentro de la seccion privada.' })
    res.json({ status: 'success', payload: req.user })
})
router.get('/secret', passportCall('jwt'), authorization('admin'), (req, res) => {
    // res.json({ message: 'ok! estas dentro de la seccion privada.' })
    res.json({ status: 'success', payload: req.user, role: "ADMIN" })
})
export default router