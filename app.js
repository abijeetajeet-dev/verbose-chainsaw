// Investment Strategy Dashboard JavaScript

class InvestmentDashboard {
    constructor() {
        this.data = {
            "portfolio_overview": {
                "total_capital": 250,
                "strategy_name": "Aggressive Growth with Balanced Risk",
                "expected_return": "16-22% CAGR",
                "investment_horizon": "3-5 years",
                "risk_level": "Medium-High"
            },
            "asset_allocation": {
                "stocks": {"percentage": 45, "amount_eur": 112.50, "expected_return": "15-20%", "risk": "Medium-High"},
                "mutual_funds": {"percentage": 35, "amount_eur": 87.50, "expected_return": "12-15%", "risk": "Medium"},
                "cryptocurrency": {"percentage": 20, "amount_eur": 50.00, "expected_return": "20-30%", "risk": "High"}
            },
            "stock_positions": [
                {"company": "TCS", "sector": "Technology", "amount_eur": 18, "return": "15-20%", "risk": "Medium", "rationale": "AI leader, strong fundamentals"},
                {"company": "Apollo Hospitals", "sector": "Healthcare", "amount_eur": 15, "return": "18-22%", "risk": "Medium", "rationale": "Healthcare expansion story"},
                {"company": "HDFC Bank", "sector": "Banking", "amount_eur": 15, "return": "12-15%", "risk": "Low-Medium", "rationale": "Best-in-class private bank"},
                {"company": "Infosys", "sector": "Technology", "amount_eur": 12, "return": "12-18%", "risk": "Medium", "rationale": "Digital transformation leader"},
                {"company": "Tata Power", "sector": "Energy", "amount_eur": 12, "return": "20-25%", "risk": "Medium-High", "rationale": "Green energy transition"},
                {"company": "Sun Pharma", "sector": "Pharma", "amount_eur": 10, "return": "12-16%", "risk": "Medium", "rationale": "Largest pharma company"},
                {"company": "Axis Bank", "sector": "Banking", "amount_eur": 10, "return": "18-22%", "risk": "Medium-High", "rationale": "Turnaround story"},
                {"company": "HUL", "sector": "FMCG", "amount_eur": 10, "return": "10-12%", "risk": "Low", "rationale": "Defensive dividend play"},
                {"company": "JSW Energy", "sector": "Energy", "amount_eur": 10.5, "return": "25-30%", "risk": "High", "rationale": "54.96% 5yr CAGR leader"}
            ],
            "mutual_funds": [
                {"name": "JioBlackRock Flexi Cap", "amount_eur": 50, "monthly_sip": 25, "return": "12-15%", "risk": "High"},
                {"name": "Axis Bluechip Fund", "amount_eur": 25, "monthly_sip": 12.5, "return": "10-14%", "risk": "Medium"},
                {"name": "Mirae Asset Emerging Bluechip", "amount_eur": 12.5, "monthly_sip": 6.25, "return": "15-18%", "risk": "High"}
            ],
            "crypto_positions": [
                {"symbol": "BTC", "name": "Bitcoin", "amount_eur": 25, "percentage": 50, "strategy": "Weekly DCA 6.25 EUR", "return": "15-25%"},
                {"symbol": "ETH", "name": "Ethereum", "amount_eur": 15, "percentage": 30, "strategy": "Bi-weekly DCA 7.50 EUR", "return": "18-30%"},
                {"symbol": "SOL", "name": "Solana", "amount_eur": 10, "percentage": 20, "strategy": "5 EUR initial + 2.50 monthly", "return": "20-40%"}
            ],
            "implementation_timeline": [
                {"month": 1, "amount": 85, "actions": ["TCS (18)", "Apollo (15)", "HDFC (15)", "Start JioBlackRock SIP (25)", "Start BTC DCA (6.25/week)", "SOL initial (5)"]},
                {"month": 2, "amount": 83, "actions": ["Infosys (12)", "Tata Power (12)", "Start Axis SIP (12.5)", "Start ETH DCA (7.5 bi-weekly)", "Start Mirae SIP (6.25)"]},
                {"month": 3, "amount": 82, "actions": ["Sun Pharma (10)", "Axis Bank (10)", "HUL (10)", "JSW Energy (10.5)", "Complete all allocations"]}
            ],
            "growth_projections": [
                {"year": 0, "conservative": 250, "base_case": 250, "optimistic": 250},
                {"year": 1, "conservative": 280, "base_case": 295, "optimistic": 313},
                {"year": 2, "conservative": 314, "base_case": 348, "optimistic": 391},
                {"year": 3, "conservative": 351, "base_case": 414, "optimistic": 488},
                {"year": 4, "conservative": 393, "base_case": 488, "optimistic": 610},
                {"year": 5, "conservative": 441, "base_case": 572, "optimistic": 763}
            ]
        };

        this.allocationChart = null;
        this.growthChart = null;
        
        this.init();
    }

    init() {
        this.createAllocationChart();
        this.renderStockPositions();
        this.renderMutualFunds();
        this.renderCryptoStrategy();
        this.renderImplementationTimeline();
        this.createGrowthChart();
    }

    createAllocationChart() {
        const ctx = document.getElementById('allocation-chart').getContext('2d');
        
        this.allocationChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Indian Stocks (45%)', 'Mutual Funds (35%)', 'Cryptocurrency (20%)'],
                datasets: [{
                    data: [112.50, 87.50, 50.00],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderColor: 'var(--color-background)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'var(--color-text)',
                            font: {
                                size: 12
                            },
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw;
                                return label + ': €' + value.toFixed(2);
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }

    renderStockPositions() {
        const stocksGrid = document.getElementById('stocks-grid');
        stocksGrid.innerHTML = '';

        this.data.stock_positions.forEach(stock => {
            const stockCard = document.createElement('div');
            stockCard.className = 'stock-card';
            
            const riskClass = this.getRiskClass(stock.risk);
            
            stockCard.innerHTML = `
                <div class="stock-header">
                    <div>
                        <div class="stock-company">${stock.company}</div>
                        <div class="stock-sector">${stock.sector}</div>
                    </div>
                    <div class="stock-amount">€${stock.amount_eur}</div>
                </div>
                <div class="stock-meta">
                    <div class="risk-badge ${riskClass}">${stock.risk} Risk</div>
                    <div class="detail-item">
                        <span class="label">Expected Return</span>
                        <span class="value">${stock.return}</span>
                    </div>
                </div>
                <div class="rationale">${stock.rationale}</div>
            `;
            
            stocksGrid.appendChild(stockCard);
        });
    }

    renderMutualFunds() {
        const mutualFundsContainer = document.getElementById('mutual-funds-container');
        mutualFundsContainer.innerHTML = '';

        this.data.mutual_funds.forEach(fund => {
            const fundCard = document.createElement('div');
            fundCard.className = 'fund-card';
            
            const riskClass = this.getRiskClass(fund.risk);
            
            fundCard.innerHTML = `
                <div class="fund-header">
                    <div class="fund-name">${fund.name}</div>
                    <div class="risk-badge ${riskClass}">${fund.risk} Risk</div>
                </div>
                <div class="fund-amounts">
                    <div class="detail-item">
                        <span class="label">Total Allocation</span>
                        <span class="value">€${fund.amount_eur}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Monthly SIP</span>
                        <span class="value">€${fund.monthly_sip}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <span class="label">Expected Return</span>
                    <span class="value">${fund.return}</span>
                </div>
                <div class="fund-note">Professional management with diversified portfolio across market segments</div>
            `;
            
            mutualFundsContainer.appendChild(fundCard);
        });
    }

    renderCryptoStrategy() {
        const cryptoStrategy = document.getElementById('crypto-strategy');
        cryptoStrategy.innerHTML = '';

        this.data.crypto_positions.forEach(crypto => {
            const cryptoCard = document.createElement('div');
            cryptoCard.className = 'crypto-card';
            
            cryptoCard.innerHTML = `
                <div class="crypto-header">
                    <div>
                        <div class="crypto-name">${crypto.name} (${crypto.symbol})</div>
                        <div class="crypto-alloc">${crypto.percentage}% of crypto allocation</div>
                    </div>
                    <div class="stock-amount">€${crypto.amount_eur}</div>
                </div>
                <div class="detail-item">
                    <span class="label">DCA Strategy</span>
                    <span class="value">${crypto.strategy}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Expected Return</span>
                    <span class="value">${crypto.return}</span>
                </div>
                <div class="rationale">Dollar-cost averaging to reduce volatility impact and maximize long-term growth potential</div>
            `;
            
            cryptoStrategy.appendChild(cryptoCard);
        });
    }

    renderImplementationTimeline() {
        const timelineContainer = document.getElementById('implementation-timeline');
        timelineContainer.innerHTML = '';

        let cumulativeAmount = 0;

        this.data.implementation_timeline.forEach((month, index) => {
            cumulativeAmount += month.amount;
            const progressPercentage = (cumulativeAmount / 250) * 100;
            
            const timelineCard = document.createElement('div');
            timelineCard.className = 'timeline-card';
            
            timelineCard.innerHTML = `
                <div class="timeline-header">
                    <h3>Month ${month.month}</h3>
                    <div class="timeline-amount">€${month.amount}</div>
                </div>
                <div class="progress-track">
                    <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                </div>
                <div style="margin-top: 8px;">
                    <div class="detail-item">
                        <span class="label">Cumulative Investment</span>
                        <span class="value">€${cumulativeAmount} (${progressPercentage.toFixed(1)}%)</span>
                    </div>
                </div>
                <h4 style="margin: 12px 0 8px 0; font-size: 14px;">Action Items:</h4>
                <ul class="action-list">
                    ${month.actions.map(action => `<li>${action}</li>`).join('')}
                </ul>
            `;
            
            timelineContainer.appendChild(timelineCard);
        });
    }

    createGrowthChart() {
        const ctx = document.getElementById('growth-chart').getContext('2d');
        
        const years = this.data.growth_projections.map(p => `Year ${p.year}`);
        const conservative = this.data.growth_projections.map(p => p.conservative);
        const baseCase = this.data.growth_projections.map(p => p.base_case);
        const optimistic = this.data.growth_projections.map(p => p.optimistic);

        this.growthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Conservative (12% CAGR)',
                        data: conservative,
                        borderColor: '#ECEBD5',
                        backgroundColor: '#ECEBD5',
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Base Case (18% CAGR)',
                        data: baseCase,
                        borderColor: '#1FB8CD',
                        backgroundColor: '#1FB8CD',
                        fill: false,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'Optimistic (25% CAGR)',
                        data: optimistic,
                        borderColor: '#5D878F',
                        backgroundColor: '#5D878F',
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'var(--color-text)',
                            font: {
                                size: 12
                            },
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': €' + context.raw.toFixed(0);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Investment Timeline',
                            color: 'var(--color-text-secondary)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Portfolio Value (€)',
                            color: 'var(--color-text-secondary)'
                        },
                        ticks: {
                            color: 'var(--color-text-secondary)',
                            callback: function(value) {
                                return '€' + value;
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    getRiskClass(riskLevel) {
        switch(riskLevel.toLowerCase()) {
            case 'low':
            case 'low-medium':
                return 'risk-badge--low';
            case 'medium':
            case 'medium-high':
                return 'risk-badge--medium';
            case 'high':
                return 'risk-badge--high';
            default:
                return 'risk-badge--medium';
        }
    }

    destroy() {
        if (this.allocationChart) {
            this.allocationChart.destroy();
        }
        if (this.growthChart) {
            this.growthChart.destroy();
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new InvestmentDashboard();
    
    // Handle window resize for responsive charts
    window.addEventListener('resize', () => {
        if (dashboard.allocationChart) {
            dashboard.allocationChart.resize();
        }
        if (dashboard.growthChart) {
            dashboard.growthChart.resize();
        }
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause any animations or updates when page is hidden
        } else {
            // Resume when page becomes visible
        }
    });
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';