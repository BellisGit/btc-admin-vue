export interface TestData {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: number;
    createTime: string;
    updateTime: string;
}
export interface TestService {
    page: (params: any) => Promise<{
        list: TestData[];
        total: number;
    }>;
    add: (data: Partial<TestData>) => Promise<TestData>;
    update: (data: Partial<TestData>) => Promise<TestData>;
    delete: (ids: number[]) => Promise<void>;
    info: (id: number) => Promise<TestData>;
}
export declare const testService: TestService;
export default testService;
