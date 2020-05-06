const db = require('../util/DB')

// 添加课程
exports.addCourse = async ctx => {
  let params = ctx.request.body
  let teacher_id = params.teacher_id
  let college_id = ctx.session.userInfo.teacher_college_id
  let sql = 'insert into t_course set ?'

  params.course_year = params.course_year_begin + '-' + params.course_year_end
  params.college_id = college_id
  params.course_id = 'o_' +
  Date.now()
    .toString()
    .substr(5, 10);
  delete params.teacher_id
  delete params.course_year_begin
  delete params.course_year_end

  await db.insert(sql, params)
  
  // // 中间表复填
  let course_id = params.course_id
  // // 进行用户表复填操作
  let courseSql = 'insert into t_teacher_score set ?'
  await db.update(courseSql, {course_id, teacher_id})
  ctx.success()
}
// 添加多个课程
exports.addMoreCourse = async ctx => {
  let obj = ctx.request.body;
  let teacher_ids = []
  let course_ids = []
  let college_id = ctx.session.userInfo.teacher_college_id

  let courseList = obj.map((course, index) => {
    course.course_id = 'o_' + Date.now().toString().substr(6, 10) + index
    course_ids.push(course.course_id)
    course.course_year = course.course_year_begin + '-' + course.course_year_end
    course.college_id = college_id
    teacher_ids.push(course.teacher_id)
    delete course.teacher_id
    delete course.course_year_begin
    delete course.course_year_end
    return Object.values(course);
  });
  console.log(courseList);
  var sql =
    'INSERT INTO t_course (course_name, course_hour, course_classroom, course_credit, course_amount, course_type, course_assess, course_info, course_id, course_year, college_id) VALUES ?';
  await db.insert(sql, [courseList]);

  let middleList = []
  courseList.forEach(item => {
    middleList.push([course_ids.pop(), teacher_ids.pop()])
  })
  console.log(middleList[0])
  console.log(middleList[1])
  let middleSql = 'insert into t_teacher_score (course_id, teacher_id) values ?'
  await db.insert(middleSql, [middleList])
  ctx.success();
};