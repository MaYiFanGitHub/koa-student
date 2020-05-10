const router = require('koa-router')()

const StudentService = require('../service/student')

router.prefix('/api/student')

// 查询本学院的所有学生
router.get('/queryByCollege', StudentService.selectStudentByCollege)
// 添加成绩
router.post('/add', StudentService.addMoreScore)
// 更新成绩
router.post('/updateScore', StudentService.updateScore)
// 成绩异议更新
router.post('/applyScore', StudentService.applyScore)
// 删除成绩
router.get('/deleteScore', StudentService.deleteScore)
// 分页多条件查询成绩
router.get('/all', StudentService.teacherQueryScoreList)
// 查询学生的个人成绩
router.get('/queryPersonScore', StudentService.queryPersonScore)
// 查询学生的个人信息
router.get('/queryStudentInfo', StudentService.queryStudentInfo)
// 成绩异议查询
router.get('/queryApplyList', StudentService.applyScoreList)
// 查询个人资料
router.get('/queryPersonInfo', StudentService.queryPersonInfo)
// 上传文件
router.post('/uploadFile', StudentService.uploadFile)
// 添加教育背景
router.post('/addEdu', StudentService.addEduList)
// 添加家庭成员
router.post('/addFamily', StudentService.addFamilyList)
// 添加政治面貌信息
router.post('/addPolitics', StudentService.addPolitics)
// 删除班级
// router.get('/remove', StudentService.removeStudent)
// 更新班级
// router.post('/edit', StudentService.updateStudent)
// 查询所有班级
// router.get('/queryList', StudentService.queryStudentList)
module.exports = router 