import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { paymentService } from '../services/payment.js';
import { prisma } from '../database.js';

const router = Router();

// 결제 인텐트 생성
router.post('/create-intent', authenticateJWT, async (req, res) => {
  try {
    const { reservationId } = req.body;
    const userId = (req.user as any).id;

    const reservation = await prisma.reservation.findFirst({
      where: { id: reservationId, userId }
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    const paymentIntent = await paymentService.createPaymentIntent(
      reservation.totalPrice
    );

    res.json(paymentIntent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
});

// 결제 확인
router.post('/confirm', authenticateJWT, async (req, res) => {
  try {
    const { paymentIntentId, reservationId } = req.body;
    const userId = (req.user as any).id;

    const paymentIntent = await paymentService.confirmPayment(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      await prisma.reservation.update({
        where: { id: reservationId },
        data: { status: 'CONFIRMED' }
      });

      await prisma.payment.create({
        data: {
          reservationId,
          amount: paymentIntent.amount,
          paymentIntentId,
          status: 'COMPLETED'
        }
      });
    }

    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ message: 'Payment confirmation failed' });
  }
});

export default router;
