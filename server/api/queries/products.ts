import type { Product } from '#graphql/resolver'

/**
 * Fetch products from Salesforce Commerce Cloud.
 *
 * Uses the following environment variables:
 * - `SFCC_SHORT_CODE`
 * - `SFCC_ORGANIZATION_ID`
 */
export default async (): Promise<Product[]> => {
  const { SFCC_SHORT_CODE, SFCC_ORGANIZATION_ID } = process.env

  if (!SFCC_SHORT_CODE || !SFCC_ORGANIZATION_ID) {
    console.warn('SFCC environment variables are missing')
    return []
  }

  const queryString = new URLSearchParams({ limit: '5' }).toString()

  const url = `https://${SFCC_SHORT_CODE}.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/${SFCC_ORGANIZATION_ID}/products?${queryString}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`SFCC request failed: ${response.status} ${response.statusText}`)
  }

  const data = await response.json().catch(() => ({ data: [] }))

  return (data.data ?? []) as Product[]
}
