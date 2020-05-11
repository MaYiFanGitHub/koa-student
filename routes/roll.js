const router = require('koa-router')()

const rollService = require('../service/roll')

router.prefix('/api/roll')

// 添加学籍异动
router.post('/add', rollService.addRoll)
// 查询个人学籍异动
router.get('/personRoll', rollService.personRoll)
// 删除个人学籍异动
router.get('/removeRoll', rollService.removeRoll)
// 教师查询学籍异动列表
router.get('/all', rollService.teacherQueryRollList)
// 分页多条件查询学籍异动
// router.get('/all', rollService.findAllRoll)
// 删除学籍异动
// router.get('/remove', rollService.removeRoll)
// 更新学籍异动
router.post('/edit', rollService.updateRoll)
// 查询所有学籍异动
// router.get('/queryList', rollService.queryRollList)
module.exports = router 