const router = require('koa-router')()

const roleService = require('../service/role')

router.prefix('/api/role')

// 查询所有角色
router.get('/all', roleService.selectAllRole)
// 添加角色
router.post('/add', roleService.addRole)
// 删除角色
router.get('/remove', roleService.removeRole)
// 更新角色
router.post('/edit', roleService.editRole)

module.exports = router 