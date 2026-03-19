const sampleTasks = [
  { 
    title: "Finish project proposal", 
    description: "Write executive summary", 
    status: "Pending", 
    priority: "High", 
    dueDate: new Date("2025-04-05"), 
    imageUrl: "https://loremflickr.com/400/300/business,office?lock=1" 
  },
  { 
    title: "Review pull requests", 
    description: "Check code quality", 
    status: "In Progress", 
    priority: "Medium", 
    dueDate: new Date("2025-04-02"), 
    imageUrl: "https://loremflickr.com/400/300/coding,technology?lock=2"
  },
  { 
    title: "Weekly team meeting", 
    description: "Prepare agenda", 
    status: "Pending", 
    priority: "High", 
    dueDate: new Date("2025-04-03"), 
    imageUrl: "https://loremflickr.com/400/300/meeting,team?lock=3"
  },
  { 
    title: "Update resume", 
    description: "Add latest experience", 
    status: "Pending", 
    priority: "Medium", 
    dueDate: new Date("2025-04-10"), 
    imageUrl: "https://loremflickr.com/400/300/resume,paper?lock=4"
  },
  { 
    title: "Pay electricity bill", 
    description: "Online payment", 
    status: "Pending", 
    priority: "High", 
    dueDate: new Date("2025-04-01"), 
    imageUrl: "https://loremflickr.com/400/300/money,invoice?lock=5"
  },
  { 
    title: "Read 2 chapters", 
    description: "Clean Code book", 
    status: "Completed", 
    priority: "Low", 
    dueDate: new Date("2025-03-30"), 
    imageUrl: "https://loremflickr.com/400/300/book,library?lock=6"
  },
  { 
    title: "Fix login bug", 
    description: "Token refresh issue", 
    status: "In Progress", 
    priority: "High", 
    dueDate: new Date("2025-04-04"), 
    imageUrl: "https://loremflickr.com/400/300/hacker,computer?lock=7"
  },
  { 
    title: "Grocery shopping", 
    description: "Milk, eggs, vegetables", 
    status: "Pending", 
    priority: "Low", 
    imageUrl: "https://loremflickr.com/400/300/food,grocery?lock=8"
  },
  { 
    title: "Call mom", 
    description: "Weekly check-in", 
    status: "Completed", 
    priority: "Medium", 
    dueDate: new Date("2025-03-28"), 
    imageUrl: "https://loremflickr.com/400/300/phone,family?lock=9"
  },
  { 
    title: "Deploy to staging", 
    description: "Feature flag", 
    status: "Pending", 
    priority: "High", 
    dueDate: new Date("2025-04-06"), 
    imageUrl: "https://loremflickr.com/400/300/server,cloud?lock=10"
  },
  { 
    title: "Morning workout", 
    description: "30 min run", 
    status: "Completed", 
    priority: "Low", 
    imageUrl: "https://loremflickr.com/400/300/fitness,run?lock=11"
  },
  { 
    title: "Reply to emails", 
    description: "10 pending messages", 
    status: "In Progress", 
    priority: "Medium", 
    dueDate: new Date("2025-04-02"), 
    imageUrl: "https://loremflickr.com/400/300/email,laptop?lock=12"
  },
  { 
    title: "Backup files", 
    description: "To drive & cloud", 
    status: "Pending", 
    priority: "High", 
    dueDate: new Date("2025-04-07"), 
    imageUrl: "https://loremflickr.com/400/300/harddrive,storage?lock=13"
  },
  { 
    title: "Learn 10 words", 
    description: "English vocabulary", 
    status: "Completed", 
    priority: "Low", 
    imageUrl: "https://loremflickr.com/400/300/study,dictionary?lock=14"
  },
  { 
    title: "Dentist appointment", 
    description: "Checkup overdue", 
    status: "Pending", 
    priority: "Medium", 
    dueDate: new Date("2025-04-15"), 
    imageUrl: "https://loremflickr.com/400/300/dentist,medical?lock=15"
  },
  { 
    title: "Organize desk", 
    description: "Clean cables", 
    status: "Pending", 
    priority: "Low", 
    imageUrl: "https://loremflickr.com/400/300/desk,interior?lock=16"
  },
  { 
    title: "Prepare tax docs", 
    description: "Gather receipts", 
    status: "Pending", 
    priority: "High", 
    dueDate: new Date("2025-04-20"), 
    imageUrl: "https://loremflickr.com/400/300/tax,calculator?lock=17"
  },
  { 
    title: "Water plants", 
    description: "All indoor", 
    status: "Completed", 
    priority: "Low", 
    imageUrl: "https://loremflickr.com/400/300/plant,flower?lock=18"
  },
  { 
    title: "Update npm packages", 
    description: "Run npm audit", 
    status: "In Progress", 
    priority: "Medium", 
    dueDate: new Date("2025-04-03"), 
    imageUrl: "https://loremflickr.com/400/300/software,logic?lock=19"
  },
  { 
    title: "Plan weekend trip", 
    description: "Book tickets", 
    status: "Pending", 
    priority: "Medium", 
    dueDate: new Date("2025-04-12"), 
    imageUrl: "https://loremflickr.com/400/300/travel,map?lock=20"
  },
];


module.exports = sampleTasks;