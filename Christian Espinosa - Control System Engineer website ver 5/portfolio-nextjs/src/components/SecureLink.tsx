'use client'

import React from 'react'

interface SecureLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  external?: boolean
}

export default function SecureLink({ 
  href, 
  children, 
  external = false, 
  ...props 
}: SecureLinkProps) {
  const isExternal = external || href.startsWith('http')
  
  if (isExternal) {
    return (
      <a
        href={href}
        {...props}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    )
  }
  
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}