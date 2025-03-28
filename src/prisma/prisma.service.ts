import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    
    async onModuleInit() {
        await this.$connect();
        
        this.$use(async (params, next) => {
            if(params.model === 'Product' && params.action === 'update'){
                const updatedProduct = params.args.data;

                if(updatedProduct !== undefined){
                    const productId = params.args.where.id;

                    const oldProduct = await this.product.findUnique({
                        where: { id: productId },
                        select: { price: true },
                    });

                    if (!oldProduct || updatedProduct.price === undefined) {
                        return next(params);
                    }

                    if (oldProduct.price === updatedProduct.price) {
                        return next(params);
                    }

                    const cartItems = await this.cartItem.findMany({
                        where: { productId },
                        select: { id: true, quantity: true }
                    });
                    
                    for(const item of cartItems){
                        await this.cartItem.update({
                            where: { id: item.id },
                            data: {
                                total: updatedProduct.price * item.quantity,
                            }
                        });
                    }
                }
            }

            if (params.model === 'Address' && (params.action === 'create' || params.action === 'update')) {
                const data = params.args.data;
        
                if (data.isDefault === true) {
                    let customerId = data.customerId || data.Customer?.connect?.id;
        
                    if (!customerId && params.action === 'update' && params.args.where?.id) {
        
                        const address = await this.address.findUnique({
                            where: { id: params.args.where.id },
                            select: { customerId: true }
                        });
        
                        customerId = address?.customerId;
                    }
        
                    if (customerId) {
                        await this.address.updateMany({
                            where: { customerId },
                            data: { isDefault: false }
                        });
                    }
                }
            }
            
            return next(params);
        });
        
    }
    
    async onModuleDestroy() {
        await this.$disconnect();
    }
}
