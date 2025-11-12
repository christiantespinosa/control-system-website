# Christian Espinosa - Automation Engineer Portfolio

A modern, production-ready portfolio website built with Next.js 14, featuring server-side rendering, static export, comprehensive testing, and CI/CD automation.

## 🚀 **Features**

### **Modern Architecture**
- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** for modern, responsive styling
- **Server-Side Rendering (SSR)** and **Static Export** capabilities
- **Image Optimization** with Next.js Image component

### **Advanced Components**
- **Interactive 3D PID Controller** using Three.js
- **Canvas-based Visualizations** for real-time analytics
- **Responsive Navigation** with smooth scrolling
- **Form Validation** with spam protection (honeypot field)
- **Accessibility Features** (WCAG 2.1 AA compliant)

### **Testing & Quality Assurance**
- **Jest** for unit testing
- **React Testing Library** for component testing
- **Coverage reporting** with detailed metrics
- **TypeScript** for compile-time error checking

### **CI/CD Pipeline**
- **GitHub Actions** for automated workflows
- **ESLint** for code quality
- **Security scanning** with npm audit
- **Automated deployment** to Netlify
- **Lighthouse performance auditing**

## 🛠️ **Tech Stack**

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety and enhanced DX |
| **Tailwind CSS** | Utility-first CSS framework |
| **Three.js** | 3D graphics and interactive models |
| **Canvas API** | Real-time data visualizations |
| **Jest** | JavaScript testing framework |
| **React Testing Library** | Component testing utilities |
| **GitHub Actions** | CI/CD automation |
| **Netlify** | Hosting and deployment |

## 📋 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run tests in watch mode
npm run test:ci      # Run tests for CI/CD
npm run test:coverage # Generate coverage report

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🧪 **Testing Strategy**

### **Unit Tests**
- **PID Controller Logic**: Core algorithm testing
- **Form Validation**: Input validation and submission
- **Component Logic**: Business logic validation
- **Utility Functions**: Helper function testing

### **Component Tests**
- **Navigation**: Menu functionality and accessibility
- **Forms**: Validation and submission handling
- **Interactive Elements**: User interaction testing

### **Test Coverage**
- Target: >80% code coverage
- Reports: Available in `coverage/` directory
- Integration: CI/CD pipeline integration

### **Running Tests**
```bash
# Watch mode (development)
npm run test

# Single run with coverage
npm run test:coverage

# CI mode (no watch)
npm run test:ci
```

## 🚀 **Deployment**

### **Static Export**
The site is configured for static export, enabling deployment to any static hosting provider.

```bash
npm run build
# Output: out/ directory
```

### **Netlify Deployment**
Automated deployment via GitHub Actions:

1. **Connect repository** to Netlify
2. **Set environment variables**:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_PRODUCTION_SITE_ID`
   - `NETLIFY_STAGING_SITE_ID`

3. **Automatic deployment** on push to main/develop branches

### **Manual Deployment**
```bash
# Build and deploy
npm run build
# Upload 'out' directory to hosting provider
```

## 📞 **Contact**

**Christian Espinosa**
- Email: christian.t.espinosa@gmail.com
- LinkedIn: [Profile Link]
- GitHub: [Profile Link]

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
