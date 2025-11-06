import { NextRequest, NextResponse } from 'next/server';
import { sendMilestonePayment, sendVerificationFee } from '@/lib/cdpWalletService';
import { getMilestoneById, getOfficerByWallet } from '@/lib/supabaseService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { milestoneId, officerId } = body;

    if (!milestoneId) {
      return NextResponse.json(
        { error: 'Milestone ID is required' },
        { status: 400 }
      );
    }

    // Get milestone details
    const milestone = await getMilestoneById(milestoneId);
    
    if (!milestone) {
      return NextResponse.json(
        { error: 'Milestone not found' },
        { status: 404 }
      );
    }

    // Send milestone payment to farmer
    const paymentResult = await sendMilestonePayment({
      farmerWalletAddress: milestone.contract.farmer.wallet_address,
      amount: milestone.payment_amount,
      milestoneId: milestone.id,
      contractId: milestone.contract_id,
      farmerId: milestone.contract.farmer_id,
    });

    // Send verification fee to officer if provided
    let feeResult = null;
    if (officerId) {
      const officer = await getOfficerByWallet(officerId);
      if (officer) {
        feeResult = await sendVerificationFee({
          officerWalletAddress: officer.wallet_address,
          amount: 250, // K250 verification fee
          taskId: milestoneId,
          officerId: officer.id,
        });
      }
    }

    return NextResponse.json({
      success: true,
      payment: paymentResult,
      verificationFee: feeResult,
      message: 'Payment processed successfully',
    });
  } catch (error: any) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment processing failed' },
      { status: 500 }
    );
  }
}
