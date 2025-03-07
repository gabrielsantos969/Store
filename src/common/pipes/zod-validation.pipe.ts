import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodObject } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform{
    constructor(private schema: ZodObject<any>){}

    transform(value: any) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            throw new BadRequestException('Validation failed');
        }
    }
}