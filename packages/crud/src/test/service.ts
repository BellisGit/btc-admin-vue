// BTC CRUD 测试服务
// 用于开发和测试环境的模拟数据服务

export interface TestData {
  id: number
  name: string
  email: string
  phone: string
  status: number
  createTime: string
  updateTime: string
}

export interface TestService {
  page: (params: any) => Promise<{ list: TestData[], total: number }>
  add: (data: Partial<TestData>) => Promise<TestData>
  update: (data: Partial<TestData>) => Promise<TestData>
  delete: (ids: number[]) => Promise<void>
  info: (id: number) => Promise<TestData>
}

// 模拟数据
const mockData: TestData[] = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    status: 1,
    createTime: '2024-01-01 10:00:00',
    updateTime: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    phone: '13800138002',
    status: 1,
    createTime: '2024-01-02 10:00:00',
    updateTime: '2024-01-02 10:00:00'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13800138003',
    status: 0,
    createTime: '2024-01-03 10:00:00',
    updateTime: '2024-01-03 10:00:00'
  }
]

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 生成新的 ID
let nextId = mockData.length + 1

// 测试服务实现
export const testService: TestService = {
  // 分页查询
  async page(params: any) {
    await delay(500) // 模拟网络延迟
    
    const { page = 1, size = 20, name, status } = params
    
    let filteredData = [...mockData]
    
    // 模拟搜索过滤
    if (name) {
      filteredData = filteredData.filter(item => 
        item.name.includes(name) || item.email.includes(name)
      )
    }
    
    if (status !== undefined && status !== '') {
      filteredData = filteredData.filter(item => item.status === status)
    }
    
    // 模拟分页
    const start = (page - 1) * size
    const end = start + size
    const list = filteredData.slice(start, end)
    
    return {
      list,
      total: filteredData.length
    }
  },
  
  // 新增
  async add(data: Partial<TestData>) {
    await delay(300)
    
    const newItem: TestData = {
      id: nextId++,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      status: data.status ?? 1,
      createTime: new Date().toLocaleString(),
      updateTime: new Date().toLocaleString()
    }
    
    mockData.push(newItem)
    return newItem
  },
  
  // 更新
  async update(data: Partial<TestData>) {
    await delay(300)
    
    const index = mockData.findIndex(item => item.id === data.id)
    if (index === -1) {
      throw new Error('数据不存在')
    }
    
    const updatedItem = {
      ...mockData[index],
      ...data,
      updateTime: new Date().toLocaleString()
    }
    
    mockData[index] = updatedItem
    return updatedItem
  },
  
  // 删除
  async delete(ids: number[]) {
    await delay(300)
    
    ids.forEach(id => {
      const index = mockData.findIndex(item => item.id === id)
      if (index > -1) {
        mockData.splice(index, 1)
      }
    })
  },
  
  // 详情
  async info(id: number) {
    await delay(200)
    
    const item = mockData.find(item => item.id === id)
    if (!item) {
      throw new Error('数据不存在')
    }
    
    return item
  }
}

// 导出默认服务
export default testService
