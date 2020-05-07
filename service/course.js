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

// 查询所有开课学年
exports.queryCourseYear = async ctx => {
  let sql = 'SELECT DISTINCT(course_year) FROM t_course WHERE is_delete=0'
  let res = await db.query(sql)
  ctx.success(res)
}
// 分页多条件查询课程
exports.findAllCourse = async ctx => {
  let params = ctx.query;
  const { currentPage, pageSize, college_id, course_year, course_type, course_assess, course_name, user_name } = params;
  let sql =
    'SELECT t_course.*, t_college.college_name, t_teacher_score.teacher_id, t_user.user_id, t_user.user_name FROM t_course LEFT JOIN t_college ON t_course.college_id=t_college.college_id LEFT JOIN t_teacher_score ON t_teacher_score.course_id=t_course.course_id LEFT JOIN t_teacher_info ON t_teacher_info.teacher_id=t_teacher_score.teacher_id LEFT JOIN t_user ON t_teacher_info.user_id=t_user.user_id  WHERE t_course.is_delete=0';
  let countSql =
    'SELECT count(*) as count FROM t_course LEFT JOIN t_college ON t_course.college_id=t_college.college_id LEFT JOIN t_teacher_score ON t_teacher_score.course_id=t_course.course_id LEFT JOIN t_teacher_info ON t_teacher_info.teacher_id=t_teacher_score.teacher_id LEFT JOIN t_user ON t_teacher_info.user_id=t_user.user_id  WHERE t_course.is_delete=0';

  if (college_id && college_id != 'all') {
    sql += ' and t_college.college_id = ' + college_id;
    countSql += ' and t_college.college_id = ' + college_id;
  }
  if (course_year && course_year != 'all') {
    sql += ' and t_course.course_year = "' + course_year + '"';
    countSql += ' and t_course.course_year = "' + course_year + '"';
  }
  if (course_type && course_type != 'all') {
    sql += ' and t_course.course_type = "' + course_type + '"';
    countSql += ' and t_course.course_type = "' + course_type + '"';
  }
  if (course_assess && course_assess != 'all') {
    sql += ' and t_course.course_assess = "' + course_assess + '"';
    countSql += ' and t_course.course_assess = "' + course_assess + '"';
  }
  if (course_name) {
    sql += ' and t_course.course_name like "%' + course_name + '%"';
    countSql += ' and t_course.course_name like "%' + course_name + '%"';
  }
  if (user_name) {
    sql += ' and t_user.user_name like "%' + user_name + '%"';
    countSql += ' and t_user.user_name like "%' + user_name + '%"';
  }
  

  sql += ' limit ' + (currentPage - 1) * pageSize + ',' + pageSize;
  console.log(sql)
  const result = await db.query(sql);
  const countResult = await db.query(countSql);
  ctx.success({
    courseList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  });
};
// 修改课程
exports.updateCourse = async ctx => {
  let params = ctx.request.body

  let sql = 'update t_course set course_name = ?, course_hour = ?, course_classroom = ?, course_credit = ?, course_year = ?, course_info = ?,  course_amount = ?, course_type = ? , course_assess = ? , college_id = ? where course_id = ?'
  await db.update(sql, [params.course_name, params.course_hour, params.course_classroom, params.course_credit, params.course_year, params.course_info, params.course_amount, params.course_type, params.course_assess, params.college_id, params.course_id])

  let midSql = 'update t_teacher_score set teacher_id = ? where course_id = ?'
  await db.update(midSql, [params.teacher_id, params.course_id])
  ctx.success()
}
// 删除学院
exports.removeCourse = async ctx => {
  let params = ctx.query
  let sql = 'update t_course set is_delete = 1 where course_id = ?'
  await db.query(sql, [params.course_id])
  ctx.success()
}
