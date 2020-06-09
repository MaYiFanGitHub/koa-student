const db = require('../util/DB')

// 添加学院
exports.addCollege = async ctx => {
  let params = ctx.request.body
  let sql = 'insert into t_college set ?'
  delete params.college_id
  const res = await db.insert(sql, params)
  
  let college_id = res.insertId
  // 进行用户表复填操作
  let userSql = 'update t_user set college_id = ' + college_id + ' where user_id = ' + params.user_id
  await db.update(userSql)
  ctx.success()
}

// 查询学院
exports.findAllCollege = async ctx => {
  let params = ctx.query;
  const { currentPage, pageSize, college_name, user_name} = params;

  let sql = 'SELECT t_college.*,t_user.user_name from t_college LEFT JOIN t_user ON t_college.user_id=t_user.user_id where t_college.is_delete=0'
  let countSql = 'SELECT count(*) as count from t_college LEFT JOIN t_user ON t_college.user_id=t_user.user_id where t_college.is_delete=0'

  if (user_name) {
    sql += ' and t_user.user_name like "%' + user_name + '%"';
    countSql += ' and t_user.user_name like "%' + user_name + '%"';
  }
  if (college_name) {
    sql += ' and t_college.college_name like "%' + college_name + '%"';
    countSql += ' and t_college.college_name like "%' + college_name + '%"';
  }
  sql +=
    ' limit ' + ((currentPage - 1) * pageSize) + ',' + pageSize;
  const result = await db.query(sql)
  const countResult = await db.query(countSql);
  console.log(countResult[0].count + '------')
  ctx.success({
    collegeList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  })
}

// 删除学院
exports.removeCollege = async ctx => {
  let params = ctx.query
  let sql = 'update t_college set is_delete = 1 where college_id = ?'
  await db.query(sql, [params.college_id])
  ctx.success()
}

// 更新学院
exports.updateCollege = async ctx => {
  let params = ctx.request.body

  let sql = 'update t_college set user_id = ?, college_name = ?, college_desc = ?, college_email = ?, college_room = ?, college_tel = ? where college_id = ?'
  await db.update(sql, [params.user_id, params.college_name, params.college_desc, params.college_email, params.college_room, params.college_tel, params.college_id])
  ctx.success()
}

// 查询所有学院
exports.selectCollege = async ctx => {
  let sql = 'SELECT t_college.*,t_user.user_name from t_college LEFT JOIN t_user ON t_college.user_id=t_user.user_id where t_college.is_delete=0'
  const result = await db.query(sql)
  ctx.success(result)
}

// 查询学院下面的专业
exports.selectByMajor = async ctx => {
  let sql = 'SELECT t_college.college_name, t_college.college_id, t_specialty.specialty_name, t_specialty.specialty FROM t_college LEFT JOIN t_specialty ON t_college.college_id=t_specialty.college_id WHERE t_college.is_delete=0 AND t_specialty.is_delete=0'
  const result = await db.query(sql)

  console.log(result)
  let responseData = []
  result.forEach(item => {
    let obj = responseData.find(data => data.college_id === item.college_id)
    if (obj) { // 有
      if (obj.majorList) {
        obj.majorList.push({
          'specialty':item.specialty,
          'specialty_name':item.specialty_name,
          'teacher_id': item.teacher_id
        })
      }
    } else {
      responseData.push({
        college_id: item.college_id,
        college_name: item.college_name,
        majorList: [{
          'specialty':item.specialty,
          'specialty_name':item.specialty_name,
          'teacher_id': item.teacher_id
        }]
      })
    }
  })
  

  ctx.success(responseData)
}