// test/product.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('ProductController (e2e)', () => {
    
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    await prisma.product.deleteMany({});
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/product (POST) - should create a product', () => {
    const createProductDto = { name: 'uniqueProduct101', price: 100, description: 'Test Product', Category: 'Category1' };

    return request(app.getHttpServer())
      .post('/product')
      .send(createProductDto)
      .expect(201)
      .expect(({ body }) => {
        expect(body.name).toEqual(createProductDto.name);
        expect(body.price).toEqual(createProductDto.price);
      });
  });

  it('/product (GET) - should return all products', () => {
    return request(app.getHttpServer())
      .get('/product')
      .expect(200)
      .expect(({ body }) => {
        expect(body.data).toBeDefined();
        expect(Array.isArray(body.data)).toBe(true);
      });
  });

  it('/product/:id (GET) - should return a single product by ID', async () => {
    const product = await prisma.product.create({
      data: { name: 'uniqueProduct102', price: 100, description: 'Test Product', Category: 'Category1' },
    });

    return request(app.getHttpServer())
      .get(`/product/${product.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toEqual(product.id);
        expect(body.name).toEqual(product.name);
      });
  });

  it('/product/:id (PATCH) - should update a product', async () => {
    const product = await prisma.product.create({
      data: { name: 'uniqueProduct103', price: 100, description: 'Test Product', Category: 'Category1' },
    });

    const updateProductDto = { name: 'Updated Product', price: 150 };

    return request(app.getHttpServer())
      .patch(`/product/${product.id}`)
      .send(updateProductDto)
      .expect(200)
      .expect(({ body }) => {
        expect(body.name).toEqual(updateProductDto.name);
        expect(body.price).toEqual(updateProductDto.price);
      });
  });

  it('/product/:id (DELETE) - should delete a product', async () => {
    const product = await prisma.product.create({
      data: { name: 'uniqueProduct104', price: 100, description: 'Test Product', Category: 'Category1' },
    });

    return request(app.getHttpServer())
      .delete(`/product/${product.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toEqual(product.id);
      });
  });

  it('/product/search?keyword=Product (GET) - should search for products', async () => {
    await prisma.product.create({
      data: { name: 'uniqueProduct105', price: 100, description: 'Test Product', Category: 'Category1' },
    });

    return request(app.getHttpServer())
      .get('/product/search?keyword=Product')
      .expect(200)
      .expect(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
      });
  });
});

