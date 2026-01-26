// Mock data for the expense tracker
export const mockExpenses = [
  { id: 1, title: "Lunch at Restaurant", amount: 450, category: "Food", date: "2026-01-20" },
  { id: 2, title: "Bus Fare", amount: 120, category: "Travel", date: "2026-01-20" },
  { id: 3, title: "Grocery Shopping", amount: 2500, category: "Food", date: "2026-01-21" },
  { id: 4, title: "Movie Tickets", amount: 800, category: "Entertainment", date: "2026-01-21" },
  { id: 5, title: "Electricity Bill", amount: 3500, category: "Bills", date: "2026-01-22" },
  { id: 6, title: "Dinner", amount: 650, category: "Food", date: "2026-01-22" },
  { id: 7, title: "Uber Ride", amount: 350, category: "Travel", date: "2026-01-23" },
  { id: 8, title: "Coffee", amount: 200, category: "Food", date: "2026-01-23" },
  { id: 9, title: "Internet Bill", amount: 1500, category: "Bills", date: "2026-01-24" },
  { id: 10, title: "Gym Membership", amount: 2000, category: "Health", date: "2026-01-24" },
  { id: 11, title: "Lunch", amount: 380, category: "Food", date: "2026-01-25" },
  { id: 12, title: "Book Purchase", amount: 450, category: "Education", date: "2026-01-25" },
  { id: 13, title: "Snacks", amount: 150, category: "Food", date: "2026-01-26" },
  { id: 14, title: "Taxi", amount: 200, category: "Travel", date: "2026-01-26" }
]

// Weekly data aggregated from expenses
export const weeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Daily Expenses',
      data: [570, 3300, 4150, 550, 3500, 830, 350],
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 2,
      tension: 0.4
    }
  ]
}

// Category breakdown
export const categoryData = {
  labels: ['Food', 'Travel', 'Bills', 'Entertainment', 'Health', 'Education'],
  datasets: [
    {
      label: 'Expenses by Category',
      data: [4330, 670, 5000, 800, 2000, 450],
      backgroundColor: [
        'rgba(79, 70, 229, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(59, 130, 246, 0.8)'
      ],
      borderWidth: 0
    }
  ]
}

// Monthly comparison
export const monthlyComparison = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'This Month',
      data: [3200, 4500, 5800, 6750],
      backgroundColor: 'rgba(79, 70, 229, 0.6)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 2
    },
    {
      label: 'Last Month',
      data: [2800, 3900, 5200, 6100],
      backgroundColor: 'rgba(100, 116, 139, 0.6)',
      borderColor: 'rgba(100, 116, 139, 1)',
      borderWidth: 2
    }
  ]
}

// Summary statistics
export const summaryStats = {
  totalExpenses: 13250,
  thisMonth: 13250,
  avgDaily: 945,
  topCategory: { name: 'Bills', amount: 5000 },
  recentExpenses: mockExpenses.slice(-5).reverse()
}
