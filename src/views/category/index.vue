<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type { FormInstance } from 'element-plus'

  // 分类数据接口
  interface Category {
    id: number
    name: string
    description: string
    sort: number
    status: number
    createTime: string
    updateTime: string
  }

  // 查询参数
  const queryParams = reactive({
    name: '',
    status: '',
    pageNum: 1,
    pageSize: 10
  })

  // 表格数据
  const tableData = ref<Category[]>([])
  const total = ref(0)
  const loading = ref(false)

  // 对话框相关
  const dialogVisible = ref(false)
  const dialogTitle = ref('')
  const isEdit = ref(false)

  // 表单数据
  const formData = reactive({
    id: 0,
    name: '',
    description: '',
    sort: 0,
    status: 1
  })

  const formRef = ref<FormInstance>()

  // 表单验证规则
  const rules = {
    name: [
      { required: true, message: '请输入分类名称', trigger: 'blur' },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ],
    sort: [
      { required: true, message: '请输入排序值', trigger: 'blur' },
      { type: 'number', message: '排序值必须为数字', trigger: 'blur' }
    ]
  }

  // 获取分类列表
  const getList = async () => {
    loading.value = true
    try {
      // 这里应该调用实际的API
      // const response = await categoryApi.getList(queryParams)
      // tableData.value = response.data.list
      // total.value = response.data.total

      // 模拟数据
      tableData.value = [
        {
          id: 1,
          name: '电子产品',
          description: '各类电子设备和配件',
          sort: 1,
          status: 1,
          createTime: '2023-12-01 10:00:00',
          updateTime: '2023-12-01 10:00:00'
        },
        {
          id: 2,
          name: '服装鞋帽',
          description: '时尚服装和配饰',
          sort: 2,
          status: 1,
          createTime: '2023-12-02 10:00:00',
          updateTime: '2023-12-02 10:00:00'
        }
      ]
      total.value = 2
    } catch (error) {
      ElMessage.error('获取分类列表失败')
    } finally {
      loading.value = false
    }
  }

  // 查询
  const handleQuery = () => {
    queryParams.pageNum = 1
    getList()
  }

  // 重置查询
  const resetQuery = () => {
    queryParams.name = ''
    queryParams.status = ''
    queryParams.pageNum = 1
    getList()
  }

  // 新增分类
  const handleAdd = () => {
    resetForm()
    dialogTitle.value = '新增分类'
    isEdit.value = false
    dialogVisible.value = true
  }

  // 编辑分类
  const handleEdit = (row: Category) => {
    resetForm()
    Object.assign(formData, row)
    dialogTitle.value = '编辑分类'
    isEdit.value = true
    dialogVisible.value = true
  }

  // 删除分类
  const handleDelete = async (row: Category) => {
    try {
      await ElMessageBox.confirm(`确定要删除分类"${row.name}"吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      // 这里应该调用删除API
      // await categoryApi.delete(row.id)

      ElMessage.success('删除成功')
      getList()
    } catch (error) {
      if (error !== 'cancel') {
        ElMessage.error('删除失败')
      }
    }
  }

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return

    try {
      await formRef.value.validate()

      // 这里应该调用新增或编辑API
      if (isEdit.value) {
        // await categoryApi.update(formData)
        ElMessage.success('编辑成功')
      } else {
        // await categoryApi.create(formData)
        ElMessage.success('新增成功')
      }

      dialogVisible.value = false
      getList()
    } catch (error) {
      ElMessage.error('操作失败')
    }
  }

  // 重置表单
  const resetForm = () => {
    formData.id = 0
    formData.name = ''
    formData.description = ''
    formData.sort = 0
    formData.status = 1

    if (formRef.value) {
      formRef.value.clearValidate()
    }
  }

  // 分页改变
  const handlePageChange = (page: number) => {
    queryParams.pageNum = page
    getList()
  }

  const handleSizeChange = (size: number) => {
    queryParams.pageSize = size
    queryParams.pageNum = 1
    getList()
  }

  onMounted(() => {
    getList()
  })
</script>

<template>
  <div class="category-container">
    <!-- 查询条件 -->
    <el-card class="search-card">
      <el-form
        :model="queryParams"
        inline
      >
        <el-form-item label="分类名称">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入分类名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="queryParams.status"
            placeholder="请选择状态"
            clearable
            style="width: 150px"
          >
            <el-option
              label="启用"
              value="1"
            />
            <el-option
              label="禁用"
              value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleQuery"
          >
            查询
          </el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮 -->
    <el-card class="table-card">
      <div class="table-header">
        <el-button
          type="primary"
          @click="handleAdd"
        >
          新增分类
        </el-button>
      </div>

      <!-- 表格 -->
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="80"
        />
        <el-table-column
          prop="name"
          label="分类名称"
        />
        <el-table-column
          prop="description"
          label="描述"
        />
        <el-table-column
          prop="sort"
          label="排序"
          width="100"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
        />
        <el-table-column
          label="操作"
          width="150"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      :before-close="() => (dialogVisible = false)"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="分类名称"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            placeholder="请输入分类名称"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
          />
        </el-form-item>
        <el-form-item
          label="排序值"
          prop="sort"
        >
          <el-input-number
            v-model="formData.sort"
            :min="0"
            :max="9999"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleSubmit"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .category-container {
    padding: 20px;
  }

  .search-card {
    margin-bottom: 20px;
  }

  .table-card {
    .table-header {
      margin-bottom: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
</style>
