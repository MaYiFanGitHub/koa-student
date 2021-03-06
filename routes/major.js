const router = require('koa-router')()

const majorService = require('../service/major')

router.prefix('/api/major')

// 添加专业
router.post('/add', majorService.addMajor)
// 分页多条件查询专业
router.get('/all', majorService.findAllMajor)
// 删除专业
router.get('/remove', majorService.removeMajor)
// 更新专业
router.post('/edit', majorService.updateMajor)
// 查询本学院下面的专业和班级
router.get('/queryMajorAndClass', majorService.queryMajorAndClassByCollege)

module.exports = router 