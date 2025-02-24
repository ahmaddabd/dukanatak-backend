
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../domain/entities/cart.entity';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { Product } from '../../domain/entities/product.entity';
import { Customer } from '../../domain/entities/customer.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
  ) {}

  
async addToCart(customerId: string, productId: string, storeId: string, quantity: number): Promise<void> {
  const product = await this.productRepository.findOne({ where: { id: productId, storeId } });
  if (!product) {
    throw new NotFoundException('Product not found or does not belong to this store.');
  }

  if (product.quantityAvailable < quantity) {
    throw new BadRequestException('Insufficient product quantity available.');
  }

  let cart = await this.cartRepository.findOne({ where: { customerId, storeId }, relations: ['items'] });
  if (!cart) {
    cart = this.cartRepository.create({ customerId, storeId, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await this.cartRepository.save(cart);
}

    const product = await this.productRepository.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    const cartItem = this.cartItemRepository.create({ product, quantity: dto.quantity, cart });
    cart.items.push(cartItem);
    return this.cartRepository.save(cart);
  }
}


async removeFromCart(customerId: string, productId: string): Promise<void> {
  const cart = await this.cartRepository.findOne({ where: { customerId }, relations: ['items'] });
  if (!cart) throw new NotFoundException('Cart not found');

  cart.items = cart.items.filter(item => item.productId !== productId);
  await this.cartRepository.save(cart);
}

async updateCartItemQuantity(customerId: string, productId: string, quantity: number): Promise<void> {
  const cart = await this.cartRepository.findOne({ where: { customerId }, relations: ['items'] });
  if (!cart) throw new NotFoundException('Cart not found');

  const item = cart.items.find(item => item.productId === productId);
  if (!item) throw new NotFoundException('Product not found in cart');

  item.quantity = quantity;
  await this.cartRepository.save(cart);
}

async getCart(customerId: string): Promise<Cart> {
  return this.cartRepository.findOne({ where: { customerId }, relations: ['items', 'items.product'] });
}
