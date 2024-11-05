import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import dotenv from 'dotenv'
import { checkAuth } from './middleware/auth'

dotenv.config()

// Create server
const app = express()

interface User {
  username: string,
  password: string
}

// In-memory database
const users: User[] = [
  { username: 'admin', password: '12345' }
]

// Middleware
app.use(cookieParser(process.env.COOKIE_KEY))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'))

// // Routes
app.get('/', (req: Request, res: Response) => {
  res.render('home')
})
app.get('/login', (req: Request, res: Response) => {
  res.render("login")
})

app.post('/login',(req: Request<{}, {}, User>, res: Response)=>{
  const found = users.find(user => user.username === req.body.username && user.password === req.body.password)
  if (found) {
    res.cookie('authToken', 'authenticated', {
      maxAge: 2 * 60 * 1000,
      httpOnly: true,
      signed: true
    })
    res.redirect('/profile')
  } else {
    res.send('User not found')
  }
})



app.get('/profile',checkAuth, (req: Request, res: Response) => {
  res.status(200).send('<h1>profile</h1>')
})

app.use((req: Request, res: Response) => {
  res.status(404).send('Page not found')
})
// Start server
const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})

