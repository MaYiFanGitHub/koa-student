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

// 更新专业
exports.updateMajor = async ctx => {
  let params = ctx.request.body;
  let sql = 'update t_specialty set college_id = ?, specialty_name = ?, specialty_desc = ?  where specialty = ?';
  await db.update(sql, [params.college_id, params.specialty_name, params.specialty_desc,  params.specialty]);
  ctx.success();
};

// 删除专业
exports.removeMajor = async ctx => {
  let params = ctx.query
  let sql = 'update t_specialty set is_delete = 1 where specialty = ?'
  console.log(sql)
  console.log(params)
  await db.query(sql, [params.specialty])
  ctx.success()
}

// 查询本学院下面的专业和班级
exports.queryMajorAndClassByCollege = async ctx => {
  let sql = `
  SELECT
    t_specialty.specialty,
    t_class.class_id,
    t_specialty.specialty_name,
    t_class.class_name
  FROM
    t_specialty
  LEFT JOIN t_class ON t_specialty.specialty = t_class.specialty
  WHERE
    t_specialty.is_delete = 0
  AND t_class.is_delete = 0
  AND t_specialty.college_id = 
  `
  sql += ctx.session.userInfo.college_id
  const result = await db.query(sql)

  let responseData = []
  result.forEach(item => {
    let obj = responseData.find(data => data.specialty === item.specialty)
    if (obj) { // 有
      if (obj.classList) {
        obj.classList.push({
          'class_id':item.class_id,
          'class_name':item.class_name
        })
      }
    } else {
      responseData.push({
        specialty: item.specialty,
        specialty_name: item.specialty_name,
        classList: [{
          'class_id':item.class_id,
          'class_name':item.class_name
        }]
      })
    }
  })
  

  ctx.success(responseData)
}
