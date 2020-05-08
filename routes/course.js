const router = require('koa-router')()

const courseService = require('../service/course')

router.prefix('/api/course')

// 添加班级
router.post('/add', courseService.addCourse)
// 添加多个课程
router.post('/moreAdd', courseService.addMoreCourse)
router.get('/queryCourseYear', courseService.queryCourseYear)
// 分页多条件查询班级
router.get('/all', courseService.findAllCourse)
// 删除班级
router.get('/remove', courseService.removeCourse)
// 更新班级
router.post('/edit', courseService.updateCourse)
// 查询本学院下的所有课程
router.get('/queryList', courseService.queryCourseList)
module.exports = router 