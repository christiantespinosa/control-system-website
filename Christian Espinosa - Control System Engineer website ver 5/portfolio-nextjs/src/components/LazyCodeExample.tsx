'use client'

import { lazy, Suspense } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeExample {
  id: string
  title: string
  language: string
  code: string
  description: string
}

interface CodeTabProps {
  example: CodeExample
}

const CodeTab: React.FC<CodeTabProps> = ({ example }) => {
  return (
    <SyntaxHighlighter
      language={example.language}
      style={vscDarkPlus}
      customStyle={{
        backgroundColor: 'rgba(17, 24, 39, 0.5)',
        border: '1px solid rgba(55, 65, 81, 0.5)',
        borderRadius: '0.5rem',
        padding: '1rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        overflow: 'auto',
        margin: 0
      }}
      showLineNumbers={true}
      lineNumberStyle={{
        color: '#6B7280',
        paddingRight: '1rem',
        borderRight: '1px solid #374151'
      }}
      wrapLines={true}
    >
      {example.code}
    </SyntaxHighlighter>
  )
}

export default function LazyCodeExample({ example }: { example: CodeExample }) {
  return (
    <Suspense 
      fallback={
        <div className="bg-background-surface rounded-lg p-4 animate-pulse">
          <div className="h-40 bg-background-border rounded"></div>
        </div>
      }
    >
      <CodeTab example={example} />
    </Suspense>
  )
}