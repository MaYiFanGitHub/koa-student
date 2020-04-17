const router = require('koa-router')()

const collegeService = require('../service/college')

router.prefix('/api/college')

// 添加学院
router.post('/add', collegeService.addCollege)
// 查询学院
router.get('/all', collegeService.findAllCollege)
// 删除学院
router.get('/remove', collegeService.removeCollege)
// 更新学院
router.post('/edit', collegeService.updateCollege)
// 查询所有学院
router.get('/select', collegeService.selectCollege)
module.exports = router 