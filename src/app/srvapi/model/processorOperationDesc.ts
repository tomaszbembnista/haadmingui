/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ProcessorOperationArgumentDesc } from './processorOperationArgumentDesc';


export interface ProcessorOperationDesc { 
    arguments?: Array<ProcessorOperationArgumentDesc>;
    name?: string;
    result?: ProcessorOperationDesc.ResultEnum;
}
export namespace ProcessorOperationDesc {
    export type ResultEnum = 'FLOAT' | 'INT' | 'STRING' | 'DATE' | 'FLOAT_LIST' | 'INT_LIST' | 'STRING_LIST' | 'DATE_LIST' | 'VOID';
    export const ResultEnum = {
        FLOAT: 'FLOAT' as ResultEnum,
        INT: 'INT' as ResultEnum,
        STRING: 'STRING' as ResultEnum,
        DATE: 'DATE' as ResultEnum,
        FLOATLIST: 'FLOAT_LIST' as ResultEnum,
        INTLIST: 'INT_LIST' as ResultEnum,
        STRINGLIST: 'STRING_LIST' as ResultEnum,
        DATELIST: 'DATE_LIST' as ResultEnum,
        VOID: 'VOID' as ResultEnum
    };
}