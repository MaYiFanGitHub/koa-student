const router = require('koa-router')()

const classService = require('../service/class')

router.prefix('/api/class')

// 添加班级
router.post('/add', classService.addClass)
// 分页多条件查询班级
//router.get('/all', classService.findAllMajor)
// 删除班级
//router.get('/remove', classService.removeMajor)
// 更新班级
//router.post('/edit', classService.updateMajor)

module.exports = router 