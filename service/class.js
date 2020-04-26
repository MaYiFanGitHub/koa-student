const db = require('../util/DB')

// 添加班级
exports.addClass = async ctx => {
  let params = ctx.request.body
  
  let sql = 'insert into t_class set ?'
  delete params.college_id
  
  await db.insert(sql, params)
  ctx.success()
}