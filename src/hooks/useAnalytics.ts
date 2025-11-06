import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as gtag from '../utils/gtag'

export const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      gtag.pageview(location.pathname + location.search)
    }
  }, [location])
}
