import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import session from 'express-session'
import { RedisStore } from 'connect-redis'
import { createClient } from 'redis'

// Routes
import authRoutes from './modules/auth.js';
import userRoutes from './modules/users.js';
import venueRoutes from './modules/venues.js';
import programRoutes from './modules/programs.js';
import sessionRoutes from './modules/sessions.js';
import reservationRoutes from './modules/reservations.js';
import paymentRoutes from './modules/payments.js';
import aiRoutes from './modules/ai.js';
import adminRoutes from './modules/admin.js';

// Middleware
import { errorHandler } from './middleware/error.js';
import { requestLogger } from './middleware/logger.js';
import './config/passport.js';

const app = express();

// Redis 클라이언트 설정
const redisClient = createClient({
  url: process.env['REDIS_URL'] || 'redis://localhost:6379',
  password: process.env['REDIS_PASSWORD'] || undefined,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
await redisClient.connect();

// 보안 미들웨어
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: process.env['FRONTEND_URL'] || 'http://localhost:3000',
  credentials: true,
}));

// 요청 제한
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100 요청
  message: 'Too many requests from this IP',
});
app.use('/api/', limiter);

// 압축 및 로깅
app.use(compression());
app.use(morgan('combined'));
app.use(requestLogger);

// 파싱 미들웨어
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 세션 설정 (Redis)
app.use(session({
  store: new RedisStore({
    client: redisClient,
    prefix: 'connectwon:sess:',
  }),
  secret: process.env['SESSION_SECRET']!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env['NODE_ENV'] === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24시간
  },
}));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// API 라우트
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: process.env['npm_package_version'] || '1.0.0',
  });
});

// 404 핸들러
app.use('*', (_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 에러 핸들러
app.use(errorHandler);

const PORT = process.env['PORT'] || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env['NODE_ENV'] || 'development'}`);
});

export default app;
