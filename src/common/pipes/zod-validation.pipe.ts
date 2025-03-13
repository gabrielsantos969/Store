import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodObject, ZodIssue, ZodInvalidTypeIssue } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: any) {    
    try {
      this.schema.parse(value);
      return value;
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        const issues = (error as any).issues as ZodIssue[];
        const formattedIssues = issues.map((issue) => {
          const formattedIssue: any = {
            path: issue.path.join('.'),
            message: issue.message,
            code: issue.code,
          };

          if (issue.code === 'invalid_type') {
            const invalidTypeIssue = issue as ZodInvalidTypeIssue;
            formattedIssue.expected = invalidTypeIssue.expected;
            formattedIssue.received = invalidTypeIssue.received;
          }

          return formattedIssue;
        });
        throw new BadRequestException(formattedIssues);
      } else {
        throw new BadRequestException('Validation failed');
      }
    }
  }
}