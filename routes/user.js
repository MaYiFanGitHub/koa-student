const router = require('koa-router')()

const userService = require('../service/user')

router.prefix('/api/user')

// 查询所有用户
router.get('/all', userService.selectAllUser)
// 添加用户
router.post('/add', userService.addUser)
// 添加多条用户
router.post('/addMore', userService.addMoreUser)
// 删除用户
router.get('/remove', userService.removeUser)
// 更新用户
router.post('/edit', userService.editUser)

module.exports = router 