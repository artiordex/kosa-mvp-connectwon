import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import session from 'express-session'
import RedisStore from 'connect-redis'
import passport from 'passport'
import { createClient } from 'redis'

// Routes
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import venueRoutes from './routes/venues'
import programRoutes from './routes/programs'
import sessionRoutes from './routes/sessions'
import reservationRoutes from './routes/reservations'
import paymentRoutes from './routes/payments'
import aiRoutes from './routes/ai'
import adminRoutes from './routes/admin'

// Middleware
import { errorHandler } from './middleware/error'
import { requestLogger } from './middleware/logger'
import './config/passport'

const app = express()

// Redis 클라이언트 설정
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD,
})

redisClient.on('error', (err) => console.error('Redis Client Error', err))
redisClient.connect()

// 보안 미들웨어
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}))

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// 요청 제한
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100 요청
  message: 'Too many requests from this IP',
})
app.use('/api/', limiter)

// 압축 및 로깅
app.use(compression())
app.use(morgan('combined'))
app.use(requestLogger)

// 파싱 미들웨어
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 세션 설정 (Redis)
app.use(session({
  store: new RedisStore({
    client: redisClient,
    prefix: 'connectwon:sess:',
  }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24시간
  },
}))

// Passport 초기화
app.use(passport.initialize())
app.use(passport.session())

// API 라우트
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/venues', venueRoutes)
app.use('/api/programs', programRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  })
})

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// 에러 핸들러
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app

// apps/api/src/config/passport.ts
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcryptjs'
import { prisma } from './database'

// Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await prisma.user.findUnique({
      where: { email: profile.emails?.[0].value }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: profile.emails?.[0].value || '',
          name: profile.displayName,
          provider: 'GOOGLE',
          providerId: profile.id,
          avatar: profile.photos?.[0].value,
        }
      })
    }

    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
}))

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
}, async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    })

    if (user) {
      return done(null, user)
    }
    return done(null, false)
  } catch (error) {
    return done(error, false)
  }
}))

// 세션 직렬화
passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})
