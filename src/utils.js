import jwt from 'jsonwebtoken'
const PRIVATE_KEY = 'c0d3r'

export const generateToken = user => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

export const authToken = (req, res, next) => {
    const token = req.cookies["quebonitosoy"]
    if (!token) return res.status(401).json({ error: 'Not auth' })
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).json({ error: 'Not authorized' })
        req.user = credentials.user
        next()
    })
}