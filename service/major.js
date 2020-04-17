const db = require('../util/DB');

// 添加专业
exports.addMajor = async ctx => {
  let obj = ctx.request.body;
  let sql = 'insert into t_specialty set ?';
  obj.specialty = Date.now()
    .toString()
    .substr(3, 10);
  console.log(obj);
  await db.insert(sql, obj);
  ctx.success();
};

// 分页多条件查询专业
exports.findAllMajor = async ctx => {
  let params = ctx.query;
  const { currentPage, pageSize, specialty_name, college_id } = params;
  console.log(params);
  let sql =
    'SELECT t_specialty.*,t_college.college_name from t_specialty LEFT JOIN t_college ON t_specialty.college_id=t_college.college_id where t_specialty.is_delete=0';
  let countSql =
    'SELECT count(*) as count from t_specialty LEFT JOIN t_college ON t_specialty.college_id=t_college.college_id where t_specialty.is_delete=0';

  if (college_id != -1 && college_id) {
    sql += ' and t_college.college_id = ' + college_id;
    countSql += ' and t_college.college_id = ' + college_id;
  }
  if (specialty_name) {
    sql += ' and t_specialty.specialty_name like "%' + specialty_name  + '%"';
    countSql += ' and t_specialty.specialty_name like "%' + specialty_name  + '%"';
  }
  sql += ' limit ' + (currentPage - 1) * pageSize + ',' + pageSize;
  console.log(sql);
  const result = await db.query(sql);
  const countResult = await db.query(countSql);
  ctx.success({
    majorList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  });
};

// 删除专业

// 更新专业
