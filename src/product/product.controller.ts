import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productService.create(createProductDto);
    } catch (error) {
      throw new BadRequestException('Failed to create product');
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number, @Req() req: any) {
    try {
      const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?').shift()}`;
      return this.productService.findAll(page, limit, baseUrl);
    } catch (error) {
      throw new BadRequestException('Failed to fetch products');
    }
  }

  @Get('search')
  search(@Query('keyword') keyword: string) {
    try {
      return this.productService.searchProduct(keyword);
    } catch (error) {
      throw new BadRequestException('Failed to search products');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.productService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to fetch product');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productService.update(id, updateProductDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to update product');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.productService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw new BadRequestException('Failed to delete product');
    }
  }
}