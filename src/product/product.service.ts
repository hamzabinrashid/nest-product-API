import { Body, Injectable, Post, NotFoundException} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService){}
  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const data = await this.prisma.product.findMany({ skip, take: limit });
    const total = await this.prisma.product.count();
    return { data, total };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {id},
      data: updateProductDto,
    });
  }

  async remove(id: string) {
      return await this.prisma.product.delete({
        where: { id },});
  }
  async searchProduct(keyword: string){
      return this.prisma.product.findMany({
        where: {
          name: {
            contains: keyword,
            mode: 'insensitive',

            }
          }
        }
      )
  }
}
// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'; // Highlighted: Added BadRequestException
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class ProductService {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(createProductDto: CreateProductDto) {
//     try {
//       return this.prisma.product.create({
//         data: createProductDto,
//       });
//     } catch (error) {
//       throw new BadRequestException('Failed to create product'); // Highlighted: Exception handling
//     }
//   }

//   async findAll() {
//     try {
//       return this.prisma.product.findMany();
//     } catch (error) {
//       throw new BadRequestException('Failed to fetch products'); // Highlighted: Exception handling
//     }
//   }

//   async findOne(id: string) {
//     const product = await this.prisma.product.findUnique({ where: { id } });
//     if (!product) {
//       throw new NotFoundException(`Product with ID ${id} not found`);
//     }
//     return product;
//   }

//   async update(id: string, updateProductDto: UpdateProductDto) {
//     try {
//       const product = await this.prisma.product.findUnique({ where: { id } });
//       if (!product) {
//         throw new NotFoundException(`Product with ID ${id} not found`); // Highlighted: NotFoundException added
//       }
//       return this.prisma.product.update({
//         where: { id },
//         data: updateProductDto,
//       });
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw new NotFoundException(`Product with ID ${id} not found`); // Highlighted: NotFoundException handling
//       }
//       throw new BadRequestException('Failed to update product'); // Highlighted: Exception handling
//     }
//   }

//   async remove(id: string) {
//     try {
//       const product = await this.prisma.product.findUnique({ where: { id } });
//       if (!product) {
//         throw new NotFoundException(`Product with ID ${id} not found`); // Highlighted: NotFoundException added
//       }
//       return await this.prisma.product.delete({
//         where: { id },
//       });
//     } catch (error) {
//       throw new BadRequestException('Failed to delete product'); // Highlighted: Exception handling
//     }
//   }

//   async searchProduct(keyword: string) {
//     try {
//       return this.prisma.product.findMany({
//         where: {
//           name: {
//             contains: keyword,
//             mode: 'insensitive',
//           },
//         },
//       });
//     } catch (error) {
//       throw new BadRequestException('Failed to search products'); // Highlighted: Exception handling
//     }
//   }
// }
