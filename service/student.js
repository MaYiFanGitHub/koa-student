
const db = require('../util/DB');
// 查询本学院的所有学生
exports.selectStudentByCollege = async ctx => {
  let college_id = ctx.session.userInfo.college_id
  let sql = 'select t_specialty.college_id, t_user.user_name, t_student_info.student_id FROM t_student_info LEFT JOIN t_user ON t_student_info.user_id=t_user.user_id LEFT JOIN t_class ON t_student_info.class_id=t_class.class_id LEFT JOIN t_specialty ON t_specialty.specialty=t_class.specialty WHERE t_specialty.college_id=?'
  let res = await db.query(sql, [college_id])
  ctx.success(res)
}
// 添加多个成绩
exports.addMoreScore = async ctx => {
  let obj = ctx.request.body;

  let scoreList = obj.map((score) => {
    return Object.values(score);
  });
  console.log(scoreList);
  var sql =
    'INSERT INTO t_score (course_id, student_id, score, score_desc, score_type) VALUES ?';
  await db.insert(sql, [scoreList]);
  ctx.success();
};

// 更新成绩
exports.updateScore = async ctx => {
  let obj = ctx.request.body;
  var sql =`
    UPDATE t_score
    SET score =?, score_desc =?, score_type =?
    WHERE
      course_id = ?
    AND student_id = ?
  `;

  await db.update(sql, [obj.score, obj.score_desc, obj.score_type,obj.course_id,obj.student_id])
  ctx.success({})
}
// 删除成绩
exports.deleteScore = async ctx => {
  let obj = ctx.query;
  var sql =`delete from t_score WHERE course_id = ? AND student_id = ?`;

  await db.update(sql, [obj.course_id, obj.student_id])
  ctx.success({})
}
// 教秘或教师查看-全部学生成绩列表
exports.teacherQueryScoreList = async ctx =>{
  let params = ctx.query;
  const { currentPage, pageSize,class_id, specialty } = params;
  let sql = `SELECT t_user.user_id,t_student_info.student_id,t_course.course_id,t_college.college_id,t_specialty.specialty,t_class.class_id,t_user.user_name,t_user.user_sex,t_college.college_name,t_specialty.specialty_name,t_class.class_name,AVG(t_score.score) AS avg_score,SUM(t_course.course_credit) AS sum_credit FROM t_student_info LEFT JOIN t_user ON t_user.user_id = t_student_info.user_id LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty LEFT JOIN t_college ON t_college.college_id = t_specialty.college_id LEFT JOIN t_score ON t_score.student_id = t_student_info.student_id LEFT JOIN t_course ON t_score.course_id = t_course.course_id WHERE t_student_info.is_delete = 0 and t_college.college_id=` + ctx.session.userInfo.college_id
  let countSql =
    `
    SELECT
      COUNT(DISTINCT t_user.user_id) as count
    FROM
      t_student_info
    LEFT JOIN t_user ON t_user.user_id = t_student_info.user_id
    LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
    LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
    LEFT JOIN t_college ON t_college.college_id = t_specialty.college_id
    LEFT JOIN t_score ON t_score.student_id = t_student_info.student_id
    LEFT JOIN t_course ON t_score.course_id = t_course.course_id
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
  sql += ' GROUP BY t_student_info.student_id limit ' + (currentPage - 1) * pageSize + ',' + pageSize;
  
  console.log(sql)
  
  const result = await db.query(sql);
  const countResult = await db.query(countSql);
  ctx.success({
    scoreList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  });
}

// 学生个人成绩查询
exports.queryPersonScore = async ctx => {
  let params = ctx.query
  let sql = `
  SELECT
    t_user.user_id,
    t_student_info.student_id,
    t_course.course_id,
    t_college.college_id,
    t_specialty.specialty,
    t_class.class_id,
    t_user.user_name,
    t_user.user_sex,
    t_college.college_name,
    t_specialty.specialty_name,
    t_class.class_name,
    t_course.course_year,
    t_course.course_id,
    t_course.course_name,
    t_course.course_type,
    t_course.course_credit,
    t_score.*
  FROM
    t_student_info
  LEFT JOIN t_user ON t_user.user_id = t_student_info.user_id
  LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
  LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
  LEFT JOIN t_college ON t_college.college_id = t_specialty.college_id
  LEFT JOIN t_score ON t_score.student_id = t_student_info.student_id
  LEFT JOIN t_course ON t_score.course_id = t_course.course_id
  WHERE
    t_student_info.is_delete = 0
  AND t_score.score > 0
  AND t_student_info.student_id = ${params.student_id}
  `
  if (ctx.session.userInfo.college_id) {
    sql += `AND t_college.college_id = ${ctx.session.userInfo.college_id}`
  }
  if (params.course_year && params.course_year != 'all') {
    sql += ' and t_course.course_year = "' + params.course_year + '" ';
  }
  if (params.course_type && params.course_type != 'all') {
    sql += ' and t_course.course_type = "' + params.course_type + '" ';
  }
  console.log(sql)
  let res = await db.query(sql)
  ctx.success(res)
}

// 获取学生信息
exports.queryStudentInfo = async ctx => {
  let params = ctx.query
  let sql = `
  SELECT
    t_user.user_id,
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
  WHERE
    t_student_info.is_delete = 0
  AND t_student_info.student_id = ${params.student_id}
  `
  let res = await db.query(sql)
  ctx.success(res[0])
}

// 成绩异议提交
exports.applyScore = async ctx => {
  let obj = ctx.request.body;
  var sql =`
    UPDATE t_score
    SET score_dissent_type =?, type_stu_desc =?, type_begin_time =?, type_end_time=?, type_tea_desc=?, score=?
    WHERE
      course_id = ?
    AND student_id = ?
  `;

  await db.update(sql, [obj.score_dissent_type, obj.type_stu_desc, obj.type_begin_time, obj.type_end_time || null, obj.type_tea_desc, obj.score, obj.course_id, obj.student_id])
  ctx.success({})
}
// 成绩异议列表
exports.applyScoreList = async ctx => {
  let params = ctx.query;
  const { currentPage, pageSize, class_id, specialty, apply_type } = params;
  let sql = `
    SELECT
      t_user.user_id,
      t_student_info.student_id,
      t_course.course_id,
      t_course.course_name,
      t_college.college_id,
      t_specialty.specialty,
      t_class.class_id,
      t_user.user_name,
      t_user.user_sex,
      t_college.college_name,
      t_specialty.specialty_name,
      t_class.class_name,
      t_score.*
    FROM
      t_student_info
    LEFT JOIN t_user ON t_user.user_id = t_student_info.user_id
    LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
    LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
    LEFT JOIN t_college ON t_college.college_id = t_specialty.college_id
    LEFT JOIN t_score ON t_score.student_id = t_student_info.student_id
    LEFT JOIN t_course ON t_score.course_id = t_course.course_id
    WHERE
      t_student_info.is_delete = 0
    AND NOT t_score.score_dissent_type IS NULL
    AND t_college.college_id = ${ctx.session.userInfo.college_id}
    `
  let countSql =`
    SELECT
      count(*) as count
    FROM
      t_student_info
    LEFT JOIN t_user ON t_user.user_id = t_student_info.user_id
    LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
    LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
    LEFT JOIN t_college ON t_college.college_id = t_specialty.college_id
    LEFT JOIN t_score ON t_score.student_id = t_student_info.student_id
    LEFT JOIN t_course ON t_score.course_id = t_course.course_id
    WHERE
      t_student_info.is_delete = 0
    AND NOT t_score.score_dissent_type IS NULL
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
  if (apply_type == 1) {
    sql += ' and t_score.type_end_time is null';
    countSql += ' and t_score.type_end_time is null';
  }
  if (apply_type == 2) {
    sql += ' and  not t_score.type_end_time is null';
    countSql += ' and  not t_score.type_end_time is null';
  }
  sql += ' limit ' + (currentPage - 1) * pageSize + ',' + pageSize;
  
  console.log(sql)
  
  const result = await db.query(sql);
  const countResult = await db.query(countSql);
  ctx.success({
    scoreList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  });
}