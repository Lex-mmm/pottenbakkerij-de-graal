import { describe, it, expect } from 'vitest'
import { formatPrice, calculateShipping, getStockBadge, slugify, truncate, formatDate, getShippingMethodName, getOrderStatusName } from '../lib/format'

describe('format helpers', () => {
  it('formats price in EUR NL locale', () => {
    expect(formatPrice(0)).toMatch(/€\s?0,00/)
    expect(formatPrice(1850)).toMatch(/€\s?18,50/)
  })

  it('calculates shipping tiers', () => {
    expect(calculateShipping(1000)).toEqual({ method: 'postnl-0-2kg', cost: 695 })
    expect(calculateShipping(3000)).toEqual({ method: 'postnl-2-5kg', cost: 895 })
    expect(calculateShipping(8000)).toEqual({ method: 'postnl-5-10kg', cost: 1295 })
    expect(calculateShipping(15000)).toEqual({ method: 'custom', cost: 0 })
  })

  it('returns proper stock badges', () => {
    expect(getStockBadge(0)).toEqual({ text: 'Uitverkocht', variant: 'destructive' })
    expect(getStockBadge(1)).toEqual({ text: 'Nog 1 op voorraad', variant: 'secondary' })
    expect(getStockBadge(4)).toEqual({ text: 'Beperkte voorraad', variant: 'outline' })
    expect(getStockBadge(10)).toEqual({ text: 'Op voorraad', variant: 'default' })
  })

  it('slugifies text', () => {
    expect(slugify('Grote Kan — Blauw')).toBe('grote-kan-blauw')
    expect(slugify('  Café au Lait  ')).toBe('cafe-au-lait')
  })

  it('truncates long text', () => {
    expect(truncate('klei', 10)).toBe('klei')
    expect(truncate('potten en pannen', 8)).toBe('potten e...')
  })

  it('formats dates and lookups names', () => {
    const date = new Date('2024-01-05')
    expect(formatDate(date)).toContain('2024')
    expect(getShippingMethodName('postnl-2-5kg')).toContain('PostNL')
    expect(getOrderStatusName('paid')).toBe('Betaald')
  })
})
