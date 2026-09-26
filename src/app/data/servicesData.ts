import { 
  Wrench, 
  Code, 
  Smartphone, 
  Database, 
  Palette, 
  Package, 
  Settings, 
  Layers, 
  Cpu, 
  Printer, 
  ShieldCheck, 
  Cloud, 
  Link, 
  BarChart, 
  Rocket, 
  FileText,
  RotateCcw,
  Boxes,
  Maximize,
  Gauge,
  ShoppingCart
} from "lucide-react";

export const mechanicalServices = [
  {
    category: "Core Design Services",
    icon: Wrench,
    items: [
      "2D to 3D CAD Conversion",
      "3D to 2D Manufacturing Drawings",
      "STL to CAD Conversion (Reverse modeling)",
      "Unit Conversion & Design Scaling (mm ↔ inch, etc.)",
      "CAD Drafting & Detailing"
    ]
  },
  {
    category: "Product Development",
    icon: Rocket,
    items: [
      "New Product Development (Concept to Prototype)",
      "Design for Manufacturing (DFM)",
      "Design Optimization & Cost Reduction",
      "Concept Design & Industrial Design Support",
      "Prototype Development"
    ]
  },
  {
    category: "Reverse Engineering",
    icon: RotateCcw,
    items: [
      "Physical Part to CAD Modeling",
      "CAD Creation from Photos / Measurements",
      "Legacy Drawing Reconstruction",
      "Redesign & Improvement of Existing Products"
    ]
  },
  {
    category: "Assembly & Mechanical Design",
    icon: Boxes,
    items: [
      "Assembly Design & Modeling",
      "Exploded Views & Bill of Materials (BOM)",
      "Mechanism Design (linkages, motion systems)",
      "Special Purpose Machine (SPM) Design",
      "Jig & Fixture Design"
    ]
  },
  {
    category: "3D Printing & Prototyping",
    icon: Printer,
    items: [
      "3D Printing Design (FDM / SLA ready files)",
      "STL File Repair & Optimization",
      "Rapid Prototyping Support",
      "Lightweight & Functional Part Design"
    ]
  },
  {
    category: "Advanced CAD Services",
    icon: Maximize,
    items: [
      "Parametric Modeling",
      "Sheet Metal Design",
      "Surface Modeling",
      "Weldment Design",
      "GD&T (Geometric Dimensioning & Tolerancing)"
    ]
  },
  {
    category: "Engineering Support Services",
    icon: FileText,
    items: [
      "Technical Documentation",
      "Manufacturing Drawings & Shop Drawings",
      "Design Validation Support",
      "Vendor / Production Support Drawings"
    ]
  },
  {
    category: "Specialized Services (High Value)",
    icon: Cpu,
    items: [
      "E-Vehicle Component Design",
      "Industrial Equipment Design",
      "Portable Structures (like Gantry Crane, Trolley, etc.)",
      "Automation & Custom Machine Design"
    ]
  }
];

export const itServices = [
  {
    category: "Core Web Development Services",
    icon: Code,
    items: [
      "Website Design & Development",
      "Custom Web Application Development",
      "Frontend Development (Modern UI)",
      "Backend Development (APIs & Logic)",
      "Full Stack Development"
    ]
  },
  {
    category: "E-Commerce Solutions",
    icon: ShoppingCart,
    items: [
      "Custom E-Commerce Website Development",
      "Shopping Cart & Checkout Systems",
      "Payment Gateway Integration",
      "Multi-Vendor Marketplace Development",
      "Product Management Systems"
    ]
  },
  {
    category: "UI/UX & Design Services",
    icon: Palette,
    items: [
      "User Interface (UI) Design",
      "User Experience (UX) Optimization",
      "Responsive Design (Mobile / Tablet / Desktop)",
      "Wireframing & Prototyping",
      "Website Redesign & Revamp"
    ]
  },
  {
    category: "Performance & Optimization",
    icon: Gauge,
    items: [
      "Website Speed Optimization",
      "SEO-Friendly Development",
      "Core Web Vitals Optimization",
      "Code Optimization & Refactoring",
      "Image & Asset Optimization"
    ]
  },
  {
    category: "Security & Maintenance",
    icon: ShieldCheck,
    items: [
      "Website Maintenance & Support",
      "Security Updates & Monitoring",
      "Bug Fixing & Issue Resolution",
      "Backup & Recovery Solutions",
      "SSL & Data Protection Setup"
    ]
  },
  {
    category: "Deployment & Cloud Services",
    icon: Cloud,
    items: [
      "Hosting Setup & Configuration",
      "Cloud Deployment (AWS / Vercel / etc.)",
      "Domain & DNS Management",
      "CI/CD Pipeline Setup",
      "Server Management"
    ]
  },
  {
    category: "Integration Services",
    icon: Link,
    items: [
      "API Development & Integration",
      "Third-Party Service Integration",
      "Payment & SMS/Email Integration",
      "CRM & ERP Integration",
      "Social Media Integration"
    ]
  },
  {
    category: "Admin & Business Tools",
    icon: BarChart,
    items: [
      "Admin Dashboard Development",
      "Analytics & Reporting Systems",
      "Role-Based Access Systems",
      "CMS Development (WordPress / Custom)",
      "Data Management Systems"
    ]
  },
  {
    category: "Modern Web Solutions",
    icon: Smartphone,
    items: [
      "Progressive Web Apps (PWA)",
      "SaaS Product Development",
      "Real-Time Applications (Chat, Live Updates)",
      "Single Page Applications (SPA)",
      "Microservices Architecture"
    ]
  },
  {
    category: "Specialized High-Value Services",
    icon: Layers,
    items: [
      "Startup MVP Development",
      "Scalable System Architecture Design",
      "AI/Chatbot Integration",
      "Automation Tools & Workflow Systems",
      "Custom Business Platforms"
    ]
  }
];
