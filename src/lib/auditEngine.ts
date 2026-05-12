/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ToolSubscription {
  id: string;
  name: string;
  plan: string;
  monthlyRate: number; // Price per user
  teamSize: number;
  useCase: string;
}

export interface AuditResult {
  id: string;
  timestamp: number;
  subscriptions: ToolSubscription[];
  summary: {
    totalMonthlySpend: number;
    benchmarkMonthlySpend: number;
    monthlyOverspend: number;
    annualSavings: number;
    percentOverBenchmark: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  };
  insights: string[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  toolName: string;
  currentPlan: string;
  alternative: string;
  savings: number;
  reason: string;
}

const BENCHMARKS: Record<string, number> = {
  'ChatGPT Enterprise': 25,
  'ChatGPT Team': 25,
  'Claude Pro': 20,
  'Claude Team': 20,
  'Cursor Pro': 20,
  'GitHub Copilot': 10,
  'Perplexity Pro': 20,
  'Gemini Advanced': 20,
  'Midjourney': 30, // Custom addition
};

const USE_CASE_MULTIPLIERS: Record<string, number> = {
  'Content Creation': 1.0,
  'Coding': 1.1,
  'Research': 0.9,
  'Customer Support': 0.8,
  'Marketing': 1.0,
  'Operations': 1.0,
  'Engineering': 1.1,
};

export const SUPPORTED_TOOLS = Object.keys(BENCHMARKS);

export function calculateAudit(subscriptions: ToolSubscription[]): AuditResult {
  let totalMonthlySpend = 0;
  let benchmarkMonthlySpend = 0;
  const recommendations: Recommendation[] = [];
  const insights: string[] = [];

  subscriptions.forEach(sub => {
    const currentSubTotal = sub.monthlyRate * sub.teamSize;
    totalMonthlySpend += currentSubTotal;

    // Get benchmark for tool (case insensitive search)
    const benchmarkKey = Object.keys(BENCHMARKS).find(k => 
      sub.name.toLowerCase().includes(k.toLowerCase())
    ) || 'ChatGPT Team'; // default benchmark
    
    const baseBenchmark = BENCHMARKS[benchmarkKey];
    const multiplier = USE_CASE_MULTIPLIERS[sub.useCase] || 1.0;
    const subBenchmarkRate = baseBenchmark * multiplier;
    const subBenchmarkTotal = subBenchmarkRate * sub.teamSize;
    
    benchmarkMonthlySpend += subBenchmarkTotal;

    // Recommendation logic
    if (sub.monthlyRate > subBenchmarkRate) {
      const toolSavings = (sub.monthlyRate - subBenchmarkRate) * sub.teamSize;
      let alternative = 'Negotiated enterprise credits';
      if (sub.name.toLowerCase().includes('chatgpt')) alternative = 'Credex negotiated enterprise credits';
      if (sub.name.toLowerCase().includes('claude')) alternative = 'Discounted Claude enterprise plan';
      if (sub.name.toLowerCase().includes('cursor')) alternative = 'GitHub Copilot or bulk Cursor pricing';

      recommendations.push({
        toolName: sub.name,
        currentPlan: sub.plan,
        alternative,
        savings: toolSavings,
        reason: `${sub.teamSize} users are paying ${((sub.monthlyRate/subBenchmarkRate - 1) * 100).toFixed(0)}% above market benchmarks.`
      });
    }
  });

  const monthlyOverspend = Math.max(0, totalMonthlySpend - benchmarkMonthlySpend);
  const annualSavings = monthlyOverspend * 12;
  const percentOverBenchmark = benchmarkMonthlySpend > 0 ? (monthlyOverspend / benchmarkMonthlySpend) * 100 : 0;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (percentOverBenchmark > 30) riskLevel = 'High';
  else if (percentOverBenchmark > 10) riskLevel = 'Medium';

  // Generate Insights
  if (percentOverBenchmark > 0) {
    insights.push(`Your team is spending ${percentOverBenchmark.toFixed(0)}% above regional benchmarks.`);
  }
  if (annualSavings > 0) {
    insights.push(`Consolidating tools could save you $${annualSavings.toLocaleString()} annually.`);
  }
  if (subscriptions.length > 2) {
    insights.push(`We detected potential overlap between ${subscriptions.length} similar AI tools.`);
  }
  if (riskLevel === 'High') {
    insights.push(`Most similar startups in ${subscriptions[0]?.useCase || 'your industry'} use more efficient enterprise billing.`);
  }

  return {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: Date.now(),
    subscriptions,
    summary: {
      totalMonthlySpend,
      benchmarkMonthlySpend,
      monthlyOverspend,
      annualSavings,
      percentOverBenchmark,
      riskLevel,
    },
    insights,
    recommendations,
  };
}
