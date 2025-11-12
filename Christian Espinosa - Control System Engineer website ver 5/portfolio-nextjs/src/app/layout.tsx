import type { Metadata } from 'next'
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Christian Espinosa - Automation Engineer',
    default: 'Christian Espinosa - Automation & Control Systems Engineer | Professional Portfolio',
  },
  description: 'Professional Automation & Control Systems Engineer specializing in SCADA/DCS/HMI integration for mission-critical operations. Proven results in MTTR reduction and TCO optimization.',
  keywords: [
    'automation engineer',
    'control systems',
    'SCADA',
    'DCS', 
    'HMI',
    'Wonderware',
    'System Platform',
    'control systems integration',
    'industrial automation'
  ],
  openGraph: {
    type: 'website',
    title: 'Christian Espinosa - Automation & Control Systems Engineer Portfolio',
    description: 'Specializing in SCADA/DCS/HMI integration for mission-critical operations with proven quantifiable results.',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630/0A0A0A/007BFF?text=Automation+Engineer',
        width: 1200,
        height: 630,
        alt: 'Christian Espinosa - Automation Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christian Espinosa - Automation & Control Systems Engineer',
    description: 'Professional Automation & Control Systems Engineer specializing in SCADA/DCS/HMI integration.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body 
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} bg-background-page text-text-primary font-body antialiased`}
        style={{ background: '#0A0A0A', color: '#E4E4E7' }}
      >
        <div id="root">
          {children}
        </div>
        
        {/* NoScript fallback for accessibility */}
        <noscript>
          <title>Christian Espinosa - Automation Engineer</title>
        </noscript>
        
        {/* Three.js for 3D Model Viewer - loaded lazily */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
        
        {/* Load JavaScript modules */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Custom cursor functionality
              (function() {
                const cursor = document.createElement('div');
                cursor.className = 'custom-cursor';
                document.body.appendChild(cursor);
                
                document.addEventListener('mousemove', (e) => {
                  cursor.style.left = e.clientX + 'px';
                  cursor.style.top = e.clientY + 'px';
                });
                
                // Cursor hover effects
                const hoverElements = document.querySelectorAll('a, button, [role="button"]');
                hoverElements.forEach(el => {
                  el.addEventListener('mouseenter', () => cursor.classList.add('custom-cursor-hover'));
                  el.addEventListener('mouseleave', () => cursor.classList.remove('custom-cursor-hover'));
                });
              })();
              
              // Lazy load main script
              window.addEventListener('DOMContentLoaded', () => {
                const mainScript = document.createElement('script');
                mainScript.src = '/js/script-min.js';
                mainScript.defer = true;
                document.head.appendChild(mainScript);
              });
            `
          }}
        />
      </body>
    </html>
  )
}
