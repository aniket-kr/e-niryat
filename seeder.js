require('dotenv').config();

const { faker } = require('@faker-js/faker');
require('./models/database');

const ProductModel = require('./models/product.model');
const TagModel = require('./models/tag.model');
const BuyerModel = require('./models/buyer.model');
const SellerModel = require('./models/seller.model');

async function getTag() {
    return TagModel.create({
        label: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
    });
}

async function getProduct(seller, tags) {
    const selectedTags = faker.helpers.uniqueArray(tags, faker.number.int({ min: 0, max: 4 }));

    const product = await ProductModel.create({
        name: faker.commerce.productName(),
        images: faker.helpers.multiple(() => faker.image.url({ width: 640, height: 640 }), {
            count: { min: 1, max: 3 },
        }),
        priceInInr: faker.commerce.price({ min: 1000, max: 15000 }),
        description: faker.commerce.productDescription(),
        specs: {
            weight: faker.number.float({ min: 100, max: 500 }),
            width: faker.number.float({ min: 100, max: 500 }),
            height: faker.number.float({ min: 100, max: 500 }),
            quantity: faker.number.int({ min: 1, max: 10 }),
        },
        hsCode: faker.string.alphanumeric({ casing: 'mixed', length: { min: 2, max: 7 } }),
        tags: selectedTags,
        seller,
    });

    for (const selectedTag of selectedTags) {
        selectedTag.products.push(product._id);
    }

    return product;
}

async function getDefaultBuyer() {
    const email = 'buyer@sample.com';
    const passwordHash = '$2b$12$iyvdWZ7BQqUZDQ1F5dCfGuFrP2BIgu2Vl.fbdv7aWcKOjCLDqV26W'; // Password@123

    const buyer = await BuyerModel.findOne({ email });
    return buyer
        ? buyer
        : BuyerModel.create({
              email,
              password: passwordHash,
              firstName: 'John',
              lastName: 'Buyer',
              address: faker.location.streetAddress({ useFullAddress: true }),
              pinCode: faker.location.zipCode('######'),
          });
}

async function getDefaultSeller() {
    const email = 'seller@sample.com';
    const passwordHash = '$2b$12$iyvdWZ7BQqUZDQ1F5dCfGuFrP2BIgu2Vl.fbdv7aWcKOjCLDqV26W'; // Password@123

    const seller = await SellerModel.findOne({ email });
    return seller
        ? seller
        : SellerModel.create({
              email,
              password: passwordHash,
              firstName: 'Saxon',
              lastName: 'Seller',
              address: faker.location.streetAddress({ useFullAddress: true }),
              pinCode: faker.location.zipCode('######'),
              codeIec: 'BUYERIEC001',
              codeAd: 'BUYERAD001',
              gstin: 'GSTIN1234567890',
          });
}

async function main() {
    // create a buyer and a seller
    const buyer = await getDefaultBuyer();
    const seller = await getDefaultSeller();
    console.log('Created default buyer and seller');

    // tags
    const tags = await Promise.all(Array.from({ length: 10 }, getTag));
    console.log(`Created ${tags.length} tags`);

    // products
    const products = await Promise.all(Array.from({ length: 25 }, () => getProduct(seller, tags)));
    console.log(`Created ${products.length} products`);

    // update all tags
    await Promise.all(tags.map((tag) => tag.save()));
    console.log('Updated all tags with appropirate products');
}
main()
    .then(() => {
        console.log('Sucess!');
    })
    .catch((err) => {
        console.error('Error!', err);
    })
    .finally(() => {
        console.log('Completed Execution');
        process.exit(0);
    });
