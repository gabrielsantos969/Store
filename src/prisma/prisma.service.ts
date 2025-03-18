import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    
    async onModuleInit() {
        await this.$connect();
        
        this.$use(async (params, next) => {
            
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
