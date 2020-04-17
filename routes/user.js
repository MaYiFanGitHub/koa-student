const router = require('koa-router')()

const userService = require('../service/user')

router.prefix('/api/user')

// 查询所有角色
// router.get('/all', roleService.selectAllRole)
// 添加用户
router.post('/add', userService.addUser)
// 添加多条用户
router.post('/addMore', userService.addMoreUser)
// 删除角色
// router.get('/remove', roleService.removeRole)
// 更新角色
// router.post('/edit', roleService.editRole)

module.exports = router 