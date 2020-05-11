const db = require('../util/DB');

// 添加学籍异动
exports.addRoll = async ctx => {
  let params = ctx.request.body;
  
  let obj = {
    student_id: params.student_id,
    roll_type: params.roll_type,
    roll_desc: params.roll_desc,
    roll_begin_time: params.roll_begin_time
  };
  console.log(params);
  let sql = 'insert into t_roll set ?';
  const res = await db.insert(sql, obj);

  ctx.success();
};
// 查询个人学籍异动
exports.personRoll = async ctx =>{
  let params = ctx.query
  let sql = `
  SELECT
    t_user.user_id,
    t_user.user_name,
    t_roll.*
  FROM
    t_roll
  LEFT JOIN t_user ON t_roll.student_id = t_user.student_id
  WHERE
    t_roll.student_id = ${params.student_id}
  `
  if (params.state == 0) {
    sql += ' and not roll_end_time is null'
  }
  if (params.state == 1) {
    sql += ' and roll_end_time is null'
  }
  let res = await db.query(sql)
  ctx.success(res)
}
// 查询个人学籍异动
exports.removeRoll = async ctx => {
  let params = ctx.query
  let sql = 'delete from t_roll where roll_id = ?'

  await db.update(sql, [params.roll_id])
  ctx.success()
}
// 修改个人异动
exports.updateRoll = async ctx => {
  let {roll_audit, roll_end_time, roll_id} = ctx.request.body
  let sql = 'update t_roll set roll_audit = ?, roll_auditor = ?, roll_end_time = ? where roll_id = ?'
  await db.update(sql, [roll_audit, ctx.session.userInfo.user_name, roll_end_time, roll_id])
  ctx.success({})
}
// 学籍异动列表
/* 
SELECT
    DISTINCT(t_user.user_id),
    t_student_info.student_id,
    t_college.college_id,
    t_specialty.specialty,
    t_class.class_id,
    t_user.user_name,
    t_user.user_sex,
    t_college.college_name,
    t_specialty.specialty_name,
    t_class.class_name
  FROM
    t_student_info
  LEFT JOIN t_user ON t_user.user_id = t_student_info.user_id
  LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
  LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
  LEFT JOIN t_college ON t_college.college_id = t_specialty.college_id
  INNER JOIN t_roll ON t_student_info.student_id=t_roll.student_id
  WHERE
    t_student_info.is_delete = 0
  AND t_college.college_id = 20
*/
// 教秘或教师查看-全部学生学籍异动列表
exports.teacherQueryRollList = async ctx =>{
  let params = ctx.query;
  const { currentPage, pageSize,class_id, specialty } = params;
  let sql = `
    SELECT
      DISTINCT(t_user.user_id),
      t_student_info.student_id,
      t_college.college_id,
      t_specialty.specialty,
      t_class.class_id,
      t_user.user_name,
      t_user.user_sex,
      t_college.college_name,
      t_specialty.specialty_name,
      t_class.class_name
    FROM
      t_student_info
    LEFT JOIN t_user ON t_user.user_id = t_student_info.user_id
    LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
    LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
    LEFT JOIN t_college ON t_college.college_id = t_specialty.college_id
    INNER JOIN t_roll ON t_student_info.student_id=t_roll.student_id
    WHERE
      t_student_info.is_delete = 0
    AND t_college.college_id = ${ctx.session.userInfo.college_id}
  `
  let countSql =`
    SELECT
      COUNT(DISTINCT t_user.user_id) as count
    FROM
      t_student_info
    LEFT JOIN t_user ON t_user.user_id = t_student_info.user_id
    LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
    LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
    LEFT JOIN t_college ON t_college.college_id = t_specialty.college_id
    INNER JOIN t_roll ON t_student_info.student_id=t_roll.student_id
    WHERE
      t_student_info.is_delete = 0
    AND t_college.college_id = ${ctx.session.userInfo.college_id}
    `;

  if (class_id && class_id != 'all') {
    sql += ' and t_class.class_id = "' + class_id + '"';
    countSql += ' and t_class.class_id = "' + class_id + '"';
  }
  if (specialty && specialty != 'all') {
    sql += ' and t_specialty.specialty = "' + specialty + '"';
    countSql += ' and t_specialty.specialty = "' + specialty + '"';
  }
  sql += ' limit ' + (currentPage - 1) * pageSize + ',' + pageSize;
  
  console.log(sql)
  
  const result = await db.query(sql);
  const countResult = await db.query(countSql);
  ctx.success({
    rollList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  });
}