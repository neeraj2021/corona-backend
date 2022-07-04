import "reflect-metadata";
export declare class UserController {
    getAll(): string;
    getOne(id: number): string;
    post(user: any): string;
    put(id: number, user: any): string;
    remove(id: number): string;
}
