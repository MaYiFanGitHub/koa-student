const db = require('../util/DB');

// 添加班级
exports.addClass = async ctx => {
  let obj = ctx.request.body;
  let sql = 'insert into t_class set ?';
  obj.class_id =
    'c_' +
    Date.now()
      .toString()
      .substr(5, 10);
  delete obj.college_id;
  await db.insert(sql, obj);
  ctx.success();
};

// 多条件查询班级
exports.findAllClass = async ctx => {
  let params = ctx.query;
  const { currentPage, pageSize, college_id, class_name, specialty } = params;
  let sql =
    'SELECT t_class.*, t_specialty.specialty_name , t_college.college_name,t_user.user_name, t_college.college_id from t_class, t_specialty, t_college, t_teacher_info, t_user where t_class.specialty=t_specialty.specialty AND t_specialty.college_id= t_college.college_id AND t_class.teacher_id=t_teacher_info.teacher_id AND t_teacher_info.user_id= t_user.user_id AND t_class.is_delete=0';
  let countSql =
    'SELECT count(*) as count from t_class, t_specialty, t_college, t_teacher_info, t_user where t_class.specialty=t_specialty.specialty AND t_specialty.college_id= t_college.college_id AND t_class.teacher_id=t_teacher_info.teacher_id AND t_teacher_info.user_id= t_user.user_id AND t_class.is_delete=0';

  if (class_name) {
    sql += ' and t_class.class_name like "%' + class_name + '%"';
    countSql += ' and t_class.class_name like "%' + class_name + '%"';
  }
  if (college_id && college_id != 'all') {
    sql += ' and t_college.college_id = ' + college_id;
    countSql += ' and t_college.college_id = ' + college_id;
  }
  if (specialty && specialty != 'all') {
    sql += ' and t_class.specialty = ' + specialty;
    countSql += ' and t_class.specialty = ' + specialty;
  }

  sql += ' limit ' + (currentPage - 1) * pageSize + ',' + pageSize;
  const result = await db.query(sql);
  const countResult = await db.query(countSql);
  ctx.success({
    classList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  });
};

// 更新班级
exports.updateClass = async ctx => {
  let params = ctx.request.body
  let sql = 'update t_class set  teacher_id = ?, specialty = ?, class_name = ? where class_id = ?'
  await db.update(sql, [params.teacher_id, params.specialty, params.class_name, params.class_id])
  ctx.success()
}

// 删除班级
exports.removeClass = async ctx => {
  let params = ctx.query
  let sql = 'update t_class set is_delete = 1 where class_id = ?'
  await db.query(sql, [params.class_id])
  ctx.success()
}
