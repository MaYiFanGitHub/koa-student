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
// 学生基本信息查询
router.get('/queryStudentInfoList', StudentService.queryStudentInfoList)
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
// 添加奖惩信息
router.post('/addHonor', StudentService.addHonor)
// 查询个人奖惩信息
router.get('/queryHonor', StudentService.queryHonor)
// 更新奖惩信息
router.post('/updateHonor', StudentService.updateHonor)
// 删除奖惩信息
router.get('/removeHonor', StudentService.removeHonor)
// 删除就业信息
router.get('/removeJob', StudentService.removeJob)
// 添加就业信息
router.post('/addJob', StudentService.addJob)
// 更新就业信息
router.post('/updateJob', StudentService.updateJob)
// 多条件分页查询就业情况列表
router.get('/queryJob', StudentService.queryJob)

module.exports = router 