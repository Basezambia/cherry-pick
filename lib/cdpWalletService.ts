import { CdpClient } from "@coinbase/cdp-sdk";
import { createPayment, updateMilestone } from "./supabaseService";

// Initialize CDP Client for server-side wallet operations
const cdp = new CdpClient();

/**
 * Send milestone payment to farmer automatically
 */
export async function sendMilestonePayment(params: {
  farmerWalletAddress: string;
  amount: number;
  milestoneId: string;
  contractId: string;
  farmerId: string;
}) {
  try {
    // Send transaction using CDP Server Wallet
    const result = await cdp.evm.sendTransaction({
      address: process.env.PLATFORM_WALLET_ADDRESS! as `0x${string}`,
      transaction: {
        to: params.farmerWalletAddress as `0x${string}`,
        value: BigInt(params.amount * 1e18), // Convert to wei
      },
      network: "base-sepolia", // Change to "base" for mainnet
    });

    // Record payment in Supabase
    await createPayment({
      contract_id: params.contractId,
      milestone_id: params.milestoneId,
      recipient_id: params.farmerId,
      recipient_type: "farmer",
      amount: params.amount,
      transaction_hash: result.transactionHash,
      status: "completed",
      completed_at: new Date().toISOString(),
    });

    // Update milestone payment status
    await updateMilestone(params.milestoneId, {
      payment_status: "completed",
    });

    return {
      success: true,
      transactionHash: result.transactionHash,
      explorerUrl: `https://sepolia.basescan.org/tx/${result.transactionHash}`,
    };
  } catch (error: any) {
    console.error("Milestone payment failed:", error);
    throw new Error(`Payment failed: ${error.message}`);
  }
}

/**
 * Send verification fee to extension officer
 */
export async function sendVerificationFee(params: {
  officerWalletAddress: string;
  amount: number;
  taskId: string;
  officerId: string;
}) {
  try {
    const result = await cdp.evm.sendTransaction({
      address: process.env.PLATFORM_WALLET_ADDRESS! as `0x${string}`,
      transaction: {
        to: params.officerWalletAddress as `0x${string}`,
        value: BigInt(params.amount * 1e18),
      },
      network: "base-sepolia",
    });

    // Record payment in Supabase
    await createPayment({
      contract_id: "", // No contract for verification fees
      milestone_id: null,
      recipient_id: params.officerId,
      recipient_type: "officer",
      amount: params.amount,
      transaction_hash: result.transactionHash,
      status: "completed",
      completed_at: new Date().toISOString(),
    });

    return {
      success: true,
      transactionHash: result.transactionHash,
      explorerUrl: `https://sepolia.basescan.org/tx/${result.transactionHash}`,
    };
  } catch (error: any) {
    console.error("Verification fee payment failed:", error);
    throw new Error(`Payment failed: ${error.message}`);
  }
}

/**
 * Process bulk payments to multiple farmers
 */
export async function sendBulkPayments(
  payments: Array<{
    farmerWalletAddress: string;
    amount: number;
    milestoneId: string;
    contractId: string;
    farmerId: string;
  }>
) {
  const results = [];
  const errors = [];

  for (const payment of payments) {
    try {
      const result = await sendMilestonePayment(payment);
      results.push({ ...payment, ...result });
    } catch (error: any) {
      errors.push({ ...payment, error: error.message });
    }
  }

  return {
    successful: results.length,
    failed: errors.length,
    results,
    errors,
  };
}

/**
 * Get platform wallet balance
 */
export async function getPlatformWalletBalance() {
  try {
    // This would require additional CDP SDK methods
    // For now, return placeholder
    return {
      balance: "0",
      network: "base-sepolia",
    };
  } catch (error: any) {
    console.error("Failed to get wallet balance:", error);
    throw error;
  }
}

/**
 * Get transaction status
 */
export async function getTransactionStatus(transactionHash: string) {
  try {
    // Use viem or web3 to check transaction status
    return {
      hash: transactionHash,
      status: "completed",
      explorerUrl: `https://sepolia.basescan.org/tx/${transactionHash}`,
    };
  } catch (error: any) {
    console.error("Failed to get transaction status:", error);
    throw error;
  }
}
