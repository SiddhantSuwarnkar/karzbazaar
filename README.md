# KarzBazaar 💳🏦

**KarzBazaar** is an intelligent, AI-driven loan comparison, recommendation, and interactive repayment management marketplace. Built with a premium, high-fidelity user interface, KarzBazaar guides borrowers from their initial financial calculations through comparison, application, and active optimization of their loan lifecycle.

---

## 🌟 Core Features

### 1. 🔍 AI-Driven Matching Engine & Recommendations
* **Custom Profile Processing**: Evaluates user profile details to match them with pre-qualified loans.
* **Risk Score Estimation**: Calculates and displays real-time rejection probability odds with explicit, hovering risk reasons.
* **Best Value Match**: Highlights top-recommended loan products matching the user's requirements.
* **Filterable Offers**: Supports toggle states to view both pre-approved eligible matches and rejected products.

### 2. ⚖️ Multi-Loan Comparison Matrix
* **Smart Comparison Grid**: Side-by-side comparison of principal, ROI (Interest Rate), processing fees, approval times, and insurance costs.
* **Horizontal Scrolling**: Enforces table responsiveness to support clear, readable columns on both mobile and desktop screen sizes.
* **Direct Selection**: Proceed directly from comparison to detailed loan structures.

### 3. 📈 Active Loan Dashboard & Repayment Optimizer
* **Paid-to-Date Visualization**: Animated radial SVG progress tracking for outstanding principal.
* **Repayment Schedule Timeline**: Clean visual cards tracking yearly payment milestones (Completed vs. Active vs. Upcoming).
* **Interactive Optimizer**: Double-slider controls to simulate savings by:
  * Adding **extra monthly EMI top-ups** to decrease tenure.
  * Adjusting **target remaining tenure** to see required EMI.
* **Closure Savings Summary**: Instantly details total interest saved and closure acceleration (in months).

### 4. 🧮 Dynamic EMI Calculator
* **Intuitive Controls**: Sliders to control Loan Amount, Interest Rate, and Tenure.
* **Doughnut Visualization**: Integrates Chart.js to show the ratio of Principal vs. Interest in real-time.
* **Clear Statistics**: Dynamic breakdown of monthly EMI, total interest, and total payable amount.

### 5. 🤖 AI Chatbot Assistant
* **Floating Assistant Widget**: Overlay support agent designed to guide users.
* **Predefined Trigger Queries**: Simulates online checking of interest rates, eligibility requirements, and documentation rules.

### 6. 🔒 Authentication & Page Protection
* **Session Persistency**: LocalStorage-backed state checks to maintain log-in sessions.
* **Protected Routes**: Navigation guards to prevent unauthenticated access to applying, comparing, or managing active loans.
* **Mock Profiles**: Test login system loaded with predefined user accounts.

---

## 🛠️ Tech Stack

* **Frontend Library**: React (v19) & TypeScript (v5.9)
* **Build Tool**: Vite (v7.2)
* **Routing Engine**: React Router Dom (v7.1)
* **Styling**: Tailwind CSS (v4.1) & Adaptive Responsive Inline styling
* **Chart Engines**: Chart.js & React-Chartjs-2
* **Animations**: Framer Motion
* **Iconography**: Lucide React

---

## 📂 Project Structure

```text
karzbazaar/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and videos (e.g., background video)
│   ├── components/
│   │   ├── Chatbot.tsx     # Floating assistant widget
│   │   └── Navbar.tsx      # Unified top header with profile management
│   ├── pages/
│   │   ├── ActiveLoan.tsx  # Dashboard & Repayment Optimizer
│   │   ├── Compare.tsx     # Side-by-side comparison matrix
│   │   ├── EMICalculator.tsx # Sliders & doughnut charts
│   │   ├── Home.tsx        # Video landing/dashboard portal
│   │   ├── LoanDetails.tsx # Detailed view of individual bank offers
│   │   ├── LoanForm.tsx    # Loan application fields
│   │   ├── Login.tsx       # Profile authentication page
│   │   ├── Signup.tsx      # Account creation page
│   │   ├── Profile.tsx     # User personal settings & details
│   │   └── Recommendations.tsx # Custom list showing matched loan offers
│   ├── mockData.ts         # User profiles & loan product specifications
│   ├── App.tsx             # Main routing configuration
│   ├── index.css           # Global custom classes & Tailwind directives
│   └── main.tsx            # React application entry point
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Vite configuration
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) along with `npm`.

### 💻 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SiddhantSuwarnkar/karzbazaar.git
   cd karzbazaar
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` (or the port specified in terminal outputs).

4. **Build for Production**
   ```bash
   npm run build
   ```
   The compiled assets will be bundled into the `/dist` directory.

---

## 🔑 Test Credentials

You can use the following mock accounts in the `/login` portal to inspect the protected pages:

| Username | Password | Full Name | Access Level |
| :--- | :--- | :--- | :--- |
| `admin` | `password123` | John Doe | Administrator |
| `user1` | `user123` | Jane Smith | Standard User |
