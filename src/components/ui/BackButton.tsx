'use client'
import { useRouter } from 'next/navigation'

interface Props {
  fallbackHref: string
  label: string
  className?: string
  rtl?: boolean
}

export default function BackButton({ fallbackHref, label, className = 'article-breadcrumb', rtl }: Props) {
  const router = useRouter()

  function handleClick() {
    const fromSameSite =
      document.referrer !== '' &&
      new URL(document.referrer).origin === window.location.origin
    if (fromSameSite) {
      router.back()
    } else {
      router.push(fallbackHref)
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5"
        style={rtl ? { transform: 'scaleX(-1)' } : undefined}
      >
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      {label}
    </button>
  )
}
