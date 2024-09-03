import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number, @Req() req: any) {
    const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?').shift()}`;
    return this.productService.findAll(page, limit, baseUrl);
  }

  @Get('search')
  async search(@Query('keyword') keyword: string) {
    return this.productService.searchProduct(keyword);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }

}
  
// import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, BadRequestException } from '@nestjs/common'; // Highlighted: Added NotFoundException and BadRequestException imports
// import { ProductService } from './product.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

// @Controller('product')
// export class ProductController {
//   constructor(private readonly productService: ProductService) {}

//   @Post()
//   create(@Body() createProductDto: CreateProductDto) {
//     try {
//       return this.productService.create(createProductDto);
//     } catch (error) {
//       throw new BadRequestException('Failed to create product'); // Highlighted: Exception handling
//     }
//   }

//   @Get()
//   async findAll() {
//     try {
//       return await this.productService.findAll();
//     } catch (error) {
//       throw new BadRequestException('Failed to fetch products'); // Highlighted: Exception handling
//     }
//   }

//   @Get('search')
//   async search(@Query('keyword') keyword: string) {
//     try {
//       return this.productService.searchProduct(keyword);
//     } catch (error) {
//       throw new BadRequestException('Failed to search products'); // Highlighted: Exception handling
//     }
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     try {
//       return await this.productService.findOne(id);
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw new NotFoundException(`Product with ID ${id} not found`); // Highlighted: NotFoundException handling
//       }
//       throw new BadRequestException('Failed to fetch product'); // Highlighted: Exception handling
//     }
//   }

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
//     try {
//       return await this.productService.update(id, updateProductDto);
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw new NotFoundException(`Product with ID ${id} not found`); // Highlighted: NotFoundException handling
//       }
//       console.log(error)
//       throw new BadRequestException('Failed to update product'); // Highlighted: Exception handling
//     }
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     try {
//       return await this.productService.remove(id);
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw new NotFoundException(`Product with ID ${id} not found`); // Highlighted: NotFoundException handling
//       }
//       throw new BadRequestException('Failed to delete product'); // Highlighted: Exception handling
//     }
//   }
// }
