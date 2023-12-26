# Session State
```typescript
type RequestSession = {

    // auth info set while logging in, cleared while log out.
    isAuthenticated?: boolean,
    role?: 'BUYER' | 'SELLER',
    buyer?: Buyer,
    seller?: Seller,
}
```

# Data Models (Mongo DB)

### Buyer
```typescript
type Buyer = {
    _id: DocID,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    pinCode: string,

    fullName: string,  // DERIVED [get]
}
```

### Seller
```typescript
type Seller = {
    _id: DocID,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    pinCode: string,
    codeIec: string,
    codeAd: string,
    gstin: string,
    lutDocument: string, // s3 object url

    fullName: string, // DERIVED [get]
}
```
### Product
```typescript
type Product = {
    _id: DocID,
    slug: string,
    name: string,
    images: string[], // s3 object urls
    priceInInr: number,
    description: string,
    specs: {
        weight: number,
        width: number,
        height: number,
        quantity: number,
    },
    hsCode: string,

    tags: Tag[],  // RELATIONAL
    seller: Seller,  // RELATIONAL
}
```

### Tag
```typescript
type Tag = {
    _id: DocID,
    label: string,
    slug: string,

    products: Product[], // RELATIONAL
}
```

### CartProduct
```typescript
type CartProduct = {
    _id: DocID,
    quantity: number,

    product: Product,  // RELATIONAL
}
```

### Review
```typescript
type Review = {
    _id: DocID,
    content: string,
    stars: 1 | 2 | 3 | 4 | 5,


    product: Product,  // RELATIONAL
    buyer: Buyer,  // RELATIONAL
}
```

# URL Routes
```yaml
/
    - GET [Done]

/auth/login
    - GET [Done]
    - POST [Done]

/auth/register/buyer
    - GET [Done]
    - POST [Done]

/auth/register/seller
    - GET [Done]
    - POST [Done]

/auth/logout
    - GET [Done]

/products?limit=12&page=1
    - GET [Done]

/products/:productId
    - GET [Done]
    - PUT

/tags?limit=12&page=1
    - GET

/tags/create/new
    - GET
    - POST

/tags/:tagSlug/products?limit=12&page=1
    - GET

/cart
    - GET
    - POST

/cart/:productSlug
    - DELETE
```
