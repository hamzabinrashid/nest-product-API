import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();
//dummy data
async function main() {
    // create two dummy recipes
    const prod1 = await prisma.product.upsert({
      where: { name: 'pencil' },
      update: {},
      create: {
        name: "pencil",
        description:"Experience smooth, consistent writing with our premium pencil. Featuring a high-quality graphite core and durable, eco-friendly wood casing, it’s perfect for writing, drawing, and sketching.",
        price: 1,
        Category:"stationery"
    }
      })
      const prod2 = await prisma.product.upsert({
        where: { name: 'M-tshirt' },
        update: {},
        create: {
          name: "M-tshirt",
          description:"Experience ultimate comfort and style with our Classic Men’s T-Shirt. Made from 100% premium cotton.",
          price: 5,
          Category:"men-clothing"
      }
        })
        const prod3 = await prisma.product.upsert({
            where: { name: 'nachos' },
            update: {},
            create: {
              name: "nachos",
              description:"crispy curly tasty munchy",
              price: 3,
              Category:"snacks"
          }
        })
        const prod4 = await prisma.product.upsert({
            where: { name: 'marshmellows' },
            update: {},
            create: {
              name: "marshmellows",
              description:"soft squishy and sweet",
              price: 3,
              Category:"snacks"
          }
        })
        console.log({ prod1, prod2, prod3, prod4 });

    }
main()
    .catch(e=>{
        console.error(e);
        process.exit(1);
    })
    .finally(async()=>
    {
        await prisma.$disconnect();
    });