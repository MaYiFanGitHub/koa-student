const router = require('koa-router')()

const userService = require('../service/user')

router.prefix('/api/user')

// 查询所有用户
router.get('/all', userService.selectAllUser)
// 添加用户
router.post('/add', userService.addUser)
// 添加多条用户
router.post('/addMore', userService.addMoreUser)
router.post('/addTeacher', userService.addMoreTeacher)
router.post('/addStudent', userService.addMoreStudent)
// 删除用户
router.get('/remove', userService.removeUser)
// 更新用户
router.post('/edit', userService.editUser)
// 查询院长身份
router.get('/findDean', userService.findDeanUser)
// 查询教师身份
router.get('/findTeacher', userService.findTeacherUser)
// 登录
router.post('/login', userService.login)
// 退出
router.get('/logout', userService.logout)
// 查询政治面貌
router.get('/queryPolitics', userService.queryPolitics)
// 修改面
router.post('/updatePassword', userService.updatePassword)
module.exports = router 