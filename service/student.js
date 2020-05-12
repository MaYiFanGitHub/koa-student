
const fs = require('fs')
const path = require('path')
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

// 学生个人资料
exports.queryPersonInfo = async ctx => {
  let params = ctx.query
  console.log(params)
  let sql = `
    SELECT
    t_user.student_id as new_student_id,
    t_student_info.*,
    t_role.role_name,
    t_user.*,
    t_college.college_name,
    t_college.college_id,
    t_specialty.specialty,
    t_class.class_id,
    t_specialty.specialty_name,
    t_class.class_name,
    t_teacher_info.teacher_title,
    t_edu.*,
    t_family.*,
    t_politics_status_info.*,
    t_file.*,
    t_politics_status.politics_status_id
  FROM
    t_user
  LEFT JOIN t_student_info ON t_user.student_id = t_student_info.student_id
  LEFT JOIN t_teacher_info ON t_user.teacher_id = t_teacher_info.teacher_id
  LEFT JOIN t_class ON t_class.class_id = t_student_info.class_id
  LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
  LEFT JOIN t_college ON t_user.college_id = t_college.college_id
  LEFT JOIN t_role ON t_user.role_id = t_role.role_id
  LEFT JOIN t_edu ON t_student_info.student_id = t_edu.student_id
  LEFT JOIN t_family ON t_family.student_id = t_student_info.student_id
  LEFT JOIN t_politics_status_info ON t_student_info.politics_status_info_id = t_politics_status_info.politics_status_info_id
  LEFT JOIN t_file ON t_file.politics_status_info_id = t_politics_status_info.politics_status_info_id
  LEFT JOIN t_politics_status ON t_politics_status.politics_status_id=t_student_info.politics_status_id
  WHERE
    t_user.user_id = ${params.user_id}
  `
  let res = await db.query(sql)
  function fn(obj, key, value) {
    return !obj.find(item => item[key] === value)
  }
  let eduList = []
  let familyList = []
  let fileList = []
  // 结果去重
  res.forEach( item => {
    let eduFlag
    let familyFlag
    let fileFlag
    if (item.edu_id) {
      eduFlag = fn(eduList, 'edu_id', item.edu_id)
    }
    if (item.family_id) {
      familyFlag = fn(familyList, 'family_id', item.family_id)
    }
    if (item.file_id) {
      fileFlag = fn(fileList, 'file_id', item.file_id)
    }

    
    if (eduFlag) {
      eduList.push({
        edu_id: item.edu_id,
        edu_begin_time: item.edu_begin_time,
        edu_end_time: item.edu_end_time,
        edu_roll_name: item.edu_roll_name,
        edu_person: item.edu_person,
        edu_person_tel: item.edu_person_tel,
      })
    }
    if (familyFlag) {
      familyList.push({
        family_id: item.family_id,
        family_name: item.family_name,
        family_sex: item.family_sex,
        family_age: item.family_age,
        family_relation: item.family_relation,
        family_job: item.family_job,
      })
    }
    if (fileFlag) {
      fileList.push({
        file_id: item.file_id,
        file_url: item.file_url,
        name: item.file_url ? item.file_url.substring(item.file_url.lastIndexOf('/') + 1) : ''
      })
    }
  })
  let obj = res[0] || {}
  obj.student_id = obj.new_student_id
  let baseInfo = {
    base: obj,
    fileList
  }
  ctx.success({
    eduList,
    familyList,
    baseInfo
  })
}

// 添加教育背景
exports.addEduList = async ctx => {
  let {eduList, student_id} = ctx.request.body;
  // eduList 里面添加学生id
  let insertList = eduList.map(item => {
    delete item.edu_id
    item.student_id = student_id
    return Object.values(item)
  })
  
  // 删除原有的教育经历
  let removeSql = 'delete from t_edu where student_id = ?'
  await db.update(removeSql, [student_id])
  
  console.log(insertList)
  // 重新添加
  let insertSql = 'insert into t_edu (edu_begin_time, edu_end_time, edu_roll_name, edu_person, edu_person_tel, student_id) values ?'
  await db.insert(insertSql, [insertList])

  ctx.success()
}
// 添加家庭成员
exports.addFamilyList = async ctx => {
  let {familyList, student_id} = ctx.request.body;
  
  // familyList 里面添加学生id
  let insertList = familyList.map(item => {
    delete item.family_id
    item.student_id = student_id
    return Object.values(item)
  })
  
  // 删除原有的家庭成员
  let removeSql = 'delete from t_family where student_id = ?'
  await db.update(removeSql, [student_id])
  
  console.log(insertList)
  // 重新添加
  let insertSql = 'insert into t_family (family_name, family_sex, family_age, family_relation, family_job, student_id) values ?'
  await db.insert(insertSql, [insertList])

  ctx.success()
}
// 添加政治面貌
exports.addPolitics = async ctx => {
  let  {politicsObj, politics_status_info_id, student_id} = ctx.request.body;
  console.log('------------------')
  console.log(politicsObj, politics_status_info_id, student_id)
  let fileList = politicsObj.fileList
  let politics_status_id = politicsObj.politics_status_id
  delete politicsObj.fileList
  delete politicsObj.politics_status_id

  // 插入政治面貌
  let politicsSql = 'insert into t_politics_status_info set ?'
  let res = await db.insert(politicsSql, politicsObj)

  // 插入文件表
  fileList.forEach(async item => {
    let sql = 'insert into t_file set ?'
    await db.update(sql, {
      politics_status_info_id: res.insertId,
      file_url: item.url
    })
  })
  
  // 更新学生表
  let stuSql = 'update t_student_info set politics_status_info_id = ?, politics_status_id = ? where student_id = ?'
  await db.update(stuSql, [res.insertId, politics_status_id, student_id])

  // 判断是否有政治面貌信息
  if (politics_status_info_id) {
    let removeSql = 'delete from t_file where politics_status_info_id = ?'
    await db.update(removeSql, [politics_status_info_id])

    removeSql = 'delete from t_politics_status_info where politics_status_info_id = ?'
    await db.update(removeSql, [politics_status_info_id])

  }

  ctx.success()
}
// 上传文件
exports.uploadFile = async ctx => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  // 写入文件名称
  let writeFileName = `文件_${Date.now() + file.name.substring(file.name.lastIndexOf('.'))}`
  // 写入路径
  let filePath = path.join(__dirname, '../', 'public/upload/') + `${writeFileName}`;
  // 访问路径
  let remotefilePath = `//localhost:3000/upload/` + `${writeFileName}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  // 写入文件表
  let sql = 'insert into t_file set ?'
  let res = await db.insert(sql, {file_url: remotefilePath})
  return ctx.body = {
      url: remotefilePath,
      name: writeFileName,
      file_id: res.insertId
  }
}
// 学生基本信息管理
exports.queryStudentInfoList = async ctx =>{
  let params = ctx.query;
  const { currentPage, pageSize,class_id, specialty } = params;
  let sql = `
    SELECT
      t_user.user_id,
      t_user.role_id,
      t_user.teacher_id,
      t_student_info.politics_status_id,
      t_student_info.politics_status_info_id,
      t_specialty.college_id,
      t_user.user_name,
      t_user.user_sex,
      t_college.college_name,
      t_specialty.specialty_name,
      t_class.class_name,
      t_student_info.student_id
    FROM
      t_student_info
    LEFT JOIN t_user ON t_student_info.user_id = t_user.user_id
    LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
    LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
    LEFT JOIN t_college ON t_college.college_id = t_user.college_id
    WHERE
      t_student_info.is_delete = 0
    AND t_specialty.college_id = ${ctx.session.userInfo.college_id}
  `
  let countSql =
    `
    SELECT
      count(*) as count
    FROM
      t_student_info
    LEFT JOIN t_user ON t_student_info.user_id = t_user.user_id
    LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
    LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
    LEFT JOIN t_college ON t_college.college_id = t_user.college_id
    WHERE
      t_student_info.is_delete = 0
    AND t_specialty.college_id = ${ctx.session.userInfo.college_id}
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
    studentList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  });
}
// 奖惩添加
exports.addHonor = async ctx => {
  let  params = ctx.request.body;
  let fileList = params.fileList
  
  delete params.fileList
  delete params.college_id

  let sql = 'insert into t_honor set ?'
  let res = await db.insert(sql, params)

  // 插入文件表
  fileList.forEach(async item => {
    let sql = 'insert into t_file set ?'
    await db.update(sql, {
      honor_id: res.insertId,
      file_url: item.url
    })
  })

  ctx.success({})
}
// 奖惩列表查询
exports.queryHonor = async ctx => {
  let params = ctx.query
  let sql = `
  SELECT
    t_user.user_id,
    t_user.user_name,
    t_honor.*
  FROM
    t_honor
  LEFT JOIN t_user ON t_user.student_id = t_honor.student_id
  WHERE t_honor.student_id = ${params.student_id}
  `
  if (params.honor_type && params.honor_type != 'all') {
    sql += ' and t_honor.honor_type = ' + params.honor_type;
  }
  let honorRes = await db.query(sql)
  for (let i = 0; i < honorRes.length; i++) {
    let fileSql = `select * from t_file where honor_id = ?`
    fileRes = await db.query(fileSql, [honorRes[i].honor_id])
    honorRes[i].fileList = fileRes
  }
  ctx.success(honorRes)
}
// 奖惩更新
exports.updateHonor = async ctx => {
  let  params = ctx.request.body;
  let fileList = params.fileList
  
  delete params.fileList
  delete params.college_id

  // 删除文件表
  let removeSql = 'delete from t_file where honor_id = ' + params.honor_id
  db.update(removeSql, [params.honor_id])
  console.log(removeSql)

  // 插入文件表
  fileList.forEach(async item => {
    let sql = 'insert into t_file set ?'
    await db.update(sql, {
      honor_id: params.honor_id,
      file_url: item.url
    })
  })

  let sql = `
  UPDATE t_honor
  SET honor_type = ${params.honor_type}, honor_time = '${params.honor_time}', honor_name = '${params.honor_name}', honor_rank = '${params.honor_rank}'
  WHERE
    honor_id = ${params.honor_id}
  `
  await db.update(sql)
  ctx.success({})
}
// 奖惩删除
exports.removeHonor = async ctx => {
  let params = ctx.query
  let removeFile = 'delete from t_file where honor_id = ?'
  await db.update(removeFile, [params.honor_id])

  let removeHonor = 'delete from t_honor where honor_id = ?'
  await db.update(removeHonor, [params.honor_id])
  ctx.success()
}
// 就业信息添加
exports.addJob = async ctx => {
  let  params = ctx.request.body;
  let fileList = params.fileList
  
  delete params.fileList
  delete params.college_id

  let sql = 'insert into t_job set ?'
  let res = await db.insert(sql, params)

  // 更新文件表
  fileList.forEach(async item => {
    let sql = 'update t_file set job_id = ? where file_id = ?'
    await db.update(sql, [
      res.insertId,
      item.file_id
    ])
  })

  ctx.success({})
}
// 就业信息删除
exports.removeJob = async ctx => {
  let params = ctx.query
  let removeFile = 'delete from t_file where job_id = ?'
  await db.update(removeFile, [params.honor_id])

  let removeJob = 'delete from t_job where job_id = ?'
  await db.update(removeJob, [params.job_id])
  ctx.success()

  ctx.success({})
}
// 就业信息更新
exports.updateJob = async ctx => {
  let  params = ctx.request.body;
  let fileList = params.fileList
  
  delete params.fileList
  delete params.college_id

  // 删除文件表
  let removeSql = 'delete from t_file where job_id = ' + params.job_id
  db.update(removeSql, [params.job_id])

  // 插入文件表
  fileList.forEach(async item => {
    let sql = 'insert into t_file set ?'
    await db.update(sql, {
      job_id: params.job_id,
      file_url: item.url
    })
  })

  let sql = `
  UPDATE t_job
  SET job_name = ?, job_code = ?, job_address = ?, job_person = ?, job_tel = ?, job_content = ?
  WHERE
    job_id = ?
  `
  await db.update(sql, [params.job_name, params.job_code, params.job_address, params.job_person, params.job_tel, params.job_content, params.job_id])
  ctx.success({})
}

// 就业模块查询学生列表
exports.queryJob = async ctx =>{
  let params = ctx.query;
  const { currentPage, pageSize,class_id, specialty, user_name } = params;
  let sql = `
  SELECT
    t_user.user_id,
    t_user.role_id,
    t_user.teacher_id,
    t_student_info.politics_status_id,
    t_student_info.politics_status_info_id,
    t_specialty.college_id,
    t_user.user_name,
    t_user.user_sex,
    t_college.college_name,
    t_specialty.specialty_name,
    t_class.class_name,
    t_student_info.student_id,
    t_job.job_id,
    t_job.job_name,
    t_job.job_code,
    t_job.job_address,
    t_job.job_person,
    t_job.job_tel,
    t_job.job_content
  FROM
    t_student_info
  LEFT JOIN t_user ON t_student_info.user_id = t_user.user_id
  LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
  LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
  LEFT JOIN t_college ON t_college.college_id = t_user.college_id
  LEFT JOIN t_job ON t_student_info.student_id = t_job.student_id
  WHERE
    t_student_info.is_delete = 0
  AND t_specialty.college_id = ${ctx.session.userInfo.college_id}
  `
  let countSql =
    `
    SELECT
      count(*) as count
    FROM
      t_student_info
    LEFT JOIN t_user ON t_student_info.user_id = t_user.user_id
    LEFT JOIN t_class ON t_student_info.class_id = t_class.class_id
    LEFT JOIN t_specialty ON t_specialty.specialty = t_class.specialty
    LEFT JOIN t_college ON t_college.college_id = t_user.college_id
    LEFT JOIN t_job ON t_student_info.student_id = t_job.student_id
    WHERE
      t_student_info.is_delete = 0
    AND t_specialty.college_id = ${ctx.session.userInfo.college_id}
    `;

  if (class_id && class_id != 'all') {
    sql += ' and t_class.class_id = "' + class_id + '"';
    countSql += ' and t_class.class_id = "' + class_id + '"';
  }
  if (specialty && specialty != 'all') {
    sql += ' and t_specialty.specialty = "' + specialty + '"';
    countSql += ' and t_specialty.specialty = "' + specialty + '"';
  }
  if (user_name) {
    sql += ' and t_user.user_name like "%' + user_name  + '%"';
    countSql += ' and t_user.user_name like "%' + user_name  + '%"';
  }
  sql += ' limit ' + (currentPage - 1) * pageSize + ',' + pageSize;
  
  console.log(sql)
  
  const result = await db.query(sql);
  const countResult = await db.query(countSql);

  for (let i = 0; i < result.length; i++) {
    let fileSql = `select * from t_file where job_id = ?`
    fileRes = await db.query(fileSql, [result[i].job_id])
    result[i].fileList = fileRes
  }
  ctx.success({
    jobList: result,
    page: {
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: countResult[0].count
    }
  });
}