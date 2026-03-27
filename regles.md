# Events partagés

## Events
- cart:add
- cart:updated
- cart:clear

## Payloads

### cart:add
{
  id: string,
  title: string,
  price: number,
  image?: string,
  platform?: string
}

### cart:updated
{
  items: Array<{
    id: string,
    title: string,
    price: number,
    image?: string,
    platform?: string,
    quantity: number
  }>,
  count: number,
  total: number
}

### cart:clear
{}