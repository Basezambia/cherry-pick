import { NextRequest, NextResponse } from 'next/server';
import {
  getYieldForecast,
  getMarketPriceTrends,
  getRiskAssessment,
  getWeatherForecast,
  getAIInsights,
} from '@/lib/analyticsAgent';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, params } = body;

    let result;

    switch (type) {
      case 'yield':
        result = await getYieldForecast(params);
        break;
      case 'price':
        result = await getMarketPriceTrends(params);
        break;
      case 'risk':
        result = await getRiskAssessment(params);
        break;
      case 'weather':
        result = await getWeatherForecast(params);
        break;
      case 'insights':
        result = await getAIInsights(params);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid analytics type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: error.message || 'Analytics request failed' },
      { status: 500 }
    );
  }
}
