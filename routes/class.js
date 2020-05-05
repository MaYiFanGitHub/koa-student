const router = require('koa-router')()

const classService = require('../service/class')

router.prefix('/api/class')

// 添加班级
router.post('/add', classService.addClass)
// 分页多条件查询班级
router.get('/all', classService.findAllClass)
// 删除班级
router.get('/remove', classService.removeClass)
// 更新班级
router.post('/edit', classService.updateClass)
// 查询所有班级
router.get('/queryList', classService.queryClassList)
module.exports = router 