/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50639
Source Host           : localhost:3306
Source Database       : student_test1_blank

Target Server Type    : MYSQL
Target Server Version : 50639
File Encoding         : 65001

Date: 2020-05-11 22:27:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_class
-- ----------------------------
DROP TABLE IF EXISTS `t_class`;
CREATE TABLE `t_class` (
  `class_id` char(10) NOT NULL COMMENT '�༶���',
  `teacher_id` char(10) DEFAULT NULL COMMENT '��ʦid',
  `specialty` char(10) DEFAULT NULL COMMENT 'רҵid',
  `is_delete` tinyint(1) DEFAULT '0',
  `class_name` char(50) DEFAULT NULL COMMENT '�༶����',
  PRIMARY KEY (`class_id`),
  KEY `FK_Relationship_18` (`teacher_id`),
  KEY `FK_Relationship_22` (`specialty`),
  CONSTRAINT `FK_Relationship_18` FOREIGN KEY (`teacher_id`) REFERENCES `t_teacher_info` (`teacher_id`),
  CONSTRAINT `FK_Relationship_22` FOREIGN KEY (`specialty`) REFERENCES `t_specialty` (`specialty`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='�༶��';

-- ----------------------------
-- Records of t_class
-- ----------------------------
INSERT INTO `t_class` VALUES ('c_36585507', '6526805', '8933859426', '0', '学院3专业1班级1');
INSERT INTO `t_class` VALUES ('c_36753407', '6701448', '8933859426', '0', '学院3专业1班级2');
INSERT INTO `t_class` VALUES ('c_36821036', '6703338', '8933919917', '0', '学院3专业2班级3');
INSERT INTO `t_class` VALUES ('c_36827205', '6701427', '8933919917', '0', '学院3专业2班级4');
INSERT INTO `t_class` VALUES ('c_37866549', '7707536', '8937720073', '0', '学院1专业1班级1');
INSERT INTO `t_class` VALUES ('c_37872254', '7702863', '8937720073', '0', '学院1专业1班级2');
INSERT INTO `t_class` VALUES ('c_37879355', '7707479', '8937720073', '0', '学院1专业1班级3');
INSERT INTO `t_class` VALUES ('c_37884981', '7702898', '8937726945', '0', '学院1专业2班级4');
INSERT INTO `t_class` VALUES ('c_37893186', '7703006', '8937726945', '0', '学院1专业2班级5');

-- ----------------------------
-- Table structure for t_college
-- ----------------------------
DROP TABLE IF EXISTS `t_college`;
CREATE TABLE `t_college` (
  `college_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ѧԺid',
  `user_id` int(11) DEFAULT NULL COMMENT '�û�id',
  `college_name` char(50) DEFAULT NULL COMMENT 'ѧԺ����',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '�Ƿ�ɾ��',
  `college_desc` text COMMENT 'ѧԺ����',
  `college_email` char(30) DEFAULT NULL COMMENT 'ѧԺ����',
  `college_room` char(30) DEFAULT NULL COMMENT 'ѧԺ�칫��',
  `college_tel` char(11) DEFAULT NULL COMMENT 'ѧԺ�绰',
  PRIMARY KEY (`college_id`),
  KEY `FK_Relationship_13` (`user_id`),
  CONSTRAINT `FK_Relationship_13` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='ѧԺ��';

-- ----------------------------
-- Records of t_college
-- ----------------------------
INSERT INTO `t_college` VALUES ('18', '9495129', '测试学院1', '0', '学院描述111', '123@qq.com', 'A312', '110');
INSERT INTO `t_college` VALUES ('19', '9502873', '测试学院2', '0', '测试学院1测试学院1测试学院1测试学院1测试学院1测试学院1测试学院1测试学院1测试学院1测试学院1', '123@qq.com', 'A532', '1111');
INSERT INTO `t_college` VALUES ('20', '9850889', '测试学院3', '0', '测试学院3测试学院3测试学院3测试学院3测试学院3', '111@qq.com', '312', '111');

-- ----------------------------
-- Table structure for t_course
-- ----------------------------
DROP TABLE IF EXISTS `t_course`;
CREATE TABLE `t_course` (
  `course_id` char(10) NOT NULL COMMENT '�γ̺�',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '�Ƿ�ɾ��',
  `course_name` char(10) DEFAULT NULL COMMENT '�γ�����',
  `course_hour` float DEFAULT NULL COMMENT '��ʱ',
  `course_classroom` char(20) DEFAULT NULL COMMENT '�Ͽεص�',
  `course_credit` float DEFAULT NULL COMMENT 'ѧ��',
  `course_year` char(30) DEFAULT NULL COMMENT '����ѧ��',
  `course_info` text COMMENT '�γ̼��',
  `course_amount` int(11) DEFAULT NULL COMMENT '������',
  `course_type` char(30) DEFAULT NULL COMMENT '�γ�����',
  `course_assess` char(10) DEFAULT NULL COMMENT '���˷�ʽ',
  `college_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='�γ̱�';

-- ----------------------------
-- Records of t_course
-- ----------------------------
INSERT INTO `t_course` VALUES ('o_22821130', '0', '课程1', '32', 'A615', '0.5', '2020-2021', '这是简介1', '100', '限制性选修课', '考查', '20');
INSERT INTO `t_course` VALUES ('o_22821131', '0', '课程2', '33', 'A616', '1.5', '2022-2023', '这是简介2', '101', '非限制性选修课', '考试', '20');
INSERT INTO `t_course` VALUES ('o_22821132', '0', '课程3', '34', 'A617', '2.5', '2024-2025', '这是简介3', '102', '公共必修课', '考查', '20');
INSERT INTO `t_course` VALUES ('o_22821133', '0', '课程4', '35', 'A618', '3.5', '2026-2027', '这是简介4', '103', '公共选修课', '考试', '20');
INSERT INTO `t_course` VALUES ('o_22821134', '0', '课程5', '36', 'A619', '4.5', '2028-2029', '这是简介5', '104', '公共选修课', '考试', '20');
INSERT INTO `t_course` VALUES ('o_22821135', '0', '课程6', '37', 'A620', '5.5', '2030-2031', '这是简介6', '105', '限制性选修课', '考查', '20');
INSERT INTO `t_course` VALUES ('o_22821136', '0', '课程7', '38', 'A621', '6.5', '2032-2033', '这是简介7', '106', '非限制性选修课', '考试', '20');
INSERT INTO `t_course` VALUES ('o_22821137', '0', '课程8', '39', 'A622', '7.5', '2034-2035', '这是简介8', '107', '公共选修课', '考查', '20');
INSERT INTO `t_course` VALUES ('o_25609770', '0', '课程9', '32', 'A622', '1.5', '2020-2021', '这是简介9', '100', '限制性选修课', '考查', '18');
INSERT INTO `t_course` VALUES ('o_25609771', '0', '课程10', '33', 'A623', '1.5', '2022-2023', '这是简介10', '101', '非限制性选修课', '考试', '18');
INSERT INTO `t_course` VALUES ('o_25609772', '0', '课程11', '34', 'A624', '1.5', '2024-2025', '这是简介11', '102', '公共必修课', '考查', '18');
INSERT INTO `t_course` VALUES ('o_25609773', '0', '课程12', '35', 'A625', '1.5', '2026-2027', '这是简介12', '103', '公共选修课', '考试', '18');
INSERT INTO `t_course` VALUES ('o_25609774', '0', '课程13', '36', 'A626', '1.5', '2028-2029', '这是简介13', '104', '公共选修课', '考试', '18');
INSERT INTO `t_course` VALUES ('o_25609775', '0', '课程14', '37', 'A627', '2', '2030-2031', '这是简介14', '105', '限制性选修课', '考查', '18');
INSERT INTO `t_course` VALUES ('o_25609776', '0', '课程15', '38', 'A628', '3', '2032-2033', '这是简介15', '106', '非限制性选修课', '考试', '18');
INSERT INTO `t_course` VALUES ('o_25609777', '0', '课程16', '39', 'A629', '4', '2034-2035', '这是简介16', '107', '公共选修课', '考查', '18');
INSERT INTO `t_course` VALUES ('o_42141247', '0', '测试课程11', '35', 'A891', '2.5', '2020-2021', '简介简介', '120', '限制性选修课', '考查', '20');

-- ----------------------------
-- Table structure for t_edu
-- ----------------------------
DROP TABLE IF EXISTS `t_edu`;
CREATE TABLE `t_edu` (
  `edu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '��������id',
  `student_id` char(10) DEFAULT NULL COMMENT 'ѧ��id',
  `edu_begin_time` date DEFAULT NULL COMMENT '��ʼʱ��',
  `edu_end_time` date DEFAULT NULL COMMENT '����ʱ��',
  `edu_roll_name` char(50) DEFAULT NULL COMMENT 'ѧУ����',
  `edu_person` char(10) DEFAULT NULL COMMENT '֤����',
  `edu_person_tel` char(11) DEFAULT NULL COMMENT '֤������ϵ��ʽ',
  PRIMARY KEY (`edu_id`),
  KEY `FK_Relationship_6` (`student_id`),
  CONSTRAINT `FK_Relationship_6` FOREIGN KEY (`student_id`) REFERENCES `t_student_info` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='����������';

-- ----------------------------
-- Records of t_edu
-- ----------------------------
INSERT INTO `t_edu` VALUES ('22', '0778788', '2020-05-13', '2020-05-13', '1', '1', '1');
INSERT INTO `t_edu` VALUES ('23', '0778788', '2020-05-13', '2020-05-20', '3', '3', '3');
INSERT INTO `t_edu` VALUES ('24', null, '2020-05-13', '2020-05-12', '1', '1', '1');
INSERT INTO `t_edu` VALUES ('25', null, '2020-05-13', '2020-05-19', '2', '2', '2');
INSERT INTO `t_edu` VALUES ('26', '0778712', '2020-05-14', '2020-05-14', '12', '12', '12');
INSERT INTO `t_edu` VALUES ('27', '0778712', '2020-05-07', '2020-05-19', '34', '34', '34');

-- ----------------------------
-- Table structure for t_family
-- ----------------------------
DROP TABLE IF EXISTS `t_family`;
CREATE TABLE `t_family` (
  `family_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '��ͥ��Աid',
  `student_id` char(10) DEFAULT NULL COMMENT 'ѧ��id',
  `family_name` char(10) DEFAULT NULL COMMENT '����',
  `family_sex` char(2) DEFAULT NULL COMMENT '�Ա�',
  `family_age` int(11) DEFAULT NULL COMMENT '����',
  `family_relation` char(20) DEFAULT NULL COMMENT '��ϵ',
  `family_job` char(20) DEFAULT NULL COMMENT '������λ��ְ��',
  PRIMARY KEY (`family_id`),
  KEY `FK_Relationship_9` (`student_id`),
  CONSTRAINT `FK_Relationship_9` FOREIGN KEY (`student_id`) REFERENCES `t_student_info` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='��ͥ��Ա';

-- ----------------------------
-- Records of t_family
-- ----------------------------
INSERT INTO `t_family` VALUES ('14', '0778788', '1', '男', '12', '12', '12');
INSERT INTO `t_family` VALUES ('15', '0778788', '2', '女', '23', '23', '23');
INSERT INTO `t_family` VALUES ('16', '0778712', '1', '男', '1', '1', '1');
INSERT INTO `t_family` VALUES ('17', '0778712', '2', '女', '2', '2', '2');

-- ----------------------------
-- Table structure for t_file
-- ----------------------------
DROP TABLE IF EXISTS `t_file`;
CREATE TABLE `t_file` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '�ļ�id',
  `politics_status_info_id` int(11) DEFAULT NULL COMMENT '������ò��Ϣid',
  `honor_id` int(11) DEFAULT NULL COMMENT '����id',
  `job_id` int(11) DEFAULT NULL COMMENT '��ҵid',
  `file_url` char(100) DEFAULT NULL COMMENT '�ļ���ַ',
  `file_type` int(11) DEFAULT NULL COMMENT '�ļ�����',
  PRIMARY KEY (`file_id`),
  KEY `FK_Relationship_10` (`politics_status_info_id`),
  KEY `FK_Relationship_11` (`honor_id`),
  KEY `FK_Relationship_12` (`job_id`),
  CONSTRAINT `FK_Relationship_10` FOREIGN KEY (`politics_status_info_id`) REFERENCES `t_politics_status_info` (`politics_status_info_id`),
  CONSTRAINT `FK_Relationship_11` FOREIGN KEY (`honor_id`) REFERENCES `t_honor` (`honor_id`),
  CONSTRAINT `FK_Relationship_12` FOREIGN KEY (`job_id`) REFERENCES `t_job` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8 COMMENT='�ļ��ֵ��';

-- ----------------------------
-- Records of t_file
-- ----------------------------
INSERT INTO `t_file` VALUES ('1', null, null, null, '//localhost:3000/upload/政治_1589090483484.xlsx', null);
INSERT INTO `t_file` VALUES ('2', null, null, null, '//localhost:3000/upload/政治_1589090506958.xlsx', null);
INSERT INTO `t_file` VALUES ('3', null, null, null, '//localhost:3000/upload/政治_1589091117020.xlsx', null);
INSERT INTO `t_file` VALUES ('4', null, null, null, '//localhost:3000/upload/政治_1589091596089.xlsx', null);
INSERT INTO `t_file` VALUES ('5', null, null, null, '//localhost:3000/upload/政治_1589091598461.xlsx', null);
INSERT INTO `t_file` VALUES ('6', null, null, null, '//localhost:3000/upload/政治_1589091601933.xlsx', null);
INSERT INTO `t_file` VALUES ('7', null, null, null, '//localhost:3000/upload/政治_1589091703313.xlsx', null);
INSERT INTO `t_file` VALUES ('8', null, null, null, '//localhost:3000/upload/政治_1589091706041.xlsx', null);
INSERT INTO `t_file` VALUES ('9', null, null, null, '//localhost:3000/upload/政治_1589091708978.xlsx', null);
INSERT INTO `t_file` VALUES ('10', null, null, null, '//localhost:3000/upload/政治_1589091777731.xlsx', null);
INSERT INTO `t_file` VALUES ('11', null, null, null, '//localhost:3000/upload/政治_1589091780944.xlsx', null);
INSERT INTO `t_file` VALUES ('12', null, null, null, '//localhost:3000/upload/政治_1589091784381.xlsx', null);
INSERT INTO `t_file` VALUES ('17', null, null, null, '//localhost:3000/upload/政治_1589092449179.xlsx', null);
INSERT INTO `t_file` VALUES ('18', null, null, null, '//localhost:3000/upload/政治_1589092461744.xlsx', null);
INSERT INTO `t_file` VALUES ('25', null, null, null, '//localhost:3000/upload/政治_1589092623716.xlsx', null);
INSERT INTO `t_file` VALUES ('26', null, null, null, '//localhost:3000/upload/政治_1589092626920.xlsx', null);
INSERT INTO `t_file` VALUES ('27', null, null, null, '//localhost:3000/upload/政治_1589092631225.xlsx', null);
INSERT INTO `t_file` VALUES ('28', '4', null, null, '//localhost:3000/upload/政治_1589092623716.xlsx', null);
INSERT INTO `t_file` VALUES ('29', '4', null, null, '//localhost:3000/upload/政治_1589092626920.xlsx', null);
INSERT INTO `t_file` VALUES ('30', '4', null, null, '//localhost:3000/upload/政治_1589092631225.xlsx', null);
INSERT INTO `t_file` VALUES ('31', null, null, null, '//localhost:3000/upload/政治_1589092744402.xlsx', null);
INSERT INTO `t_file` VALUES ('32', '5', null, null, '//localhost:3000/upload/政治_1589092744402.xlsx', null);
INSERT INTO `t_file` VALUES ('33', '5', null, null, '//localhost:3000/upload/政治_1589092623716.xlsx', null);
INSERT INTO `t_file` VALUES ('34', '5', null, null, '//localhost:3000/upload/政治_1589092626920.xlsx', null);
INSERT INTO `t_file` VALUES ('35', '5', null, null, '//localhost:3000/upload/政治_1589092631225.xlsx', null);
INSERT INTO `t_file` VALUES ('36', null, null, null, '//localhost:3000/upload/政治_1589092804973.xlsx', null);
INSERT INTO `t_file` VALUES ('37', null, null, null, '//localhost:3000/upload/政治_1589092928254.xlsx', null);
INSERT INTO `t_file` VALUES ('38', null, null, null, '//localhost:3000/upload/政治_1589092931754.xlsx', null);
INSERT INTO `t_file` VALUES ('39', null, null, null, '//localhost:3000/upload/政治_1589092938635.xlsx', null);
INSERT INTO `t_file` VALUES ('40', '6', null, null, '//localhost:3000/upload/政治_1589092928254.xlsx', null);
INSERT INTO `t_file` VALUES ('41', '6', null, null, '//localhost:3000/upload/政治_1589092938635.xlsx', null);
INSERT INTO `t_file` VALUES ('42', null, null, null, '//localhost:3000/upload/政治_1589093309778.xlsx', null);
INSERT INTO `t_file` VALUES ('43', null, null, null, '//localhost:3000/upload/政治_1589093312865.xlsx', null);
INSERT INTO `t_file` VALUES ('48', null, null, null, '//localhost:3000/upload/政治_1589095629090.xlsx', null);
INSERT INTO `t_file` VALUES ('53', null, null, null, '//localhost:3000/upload/政治_1589099440379.xlsx', null);
INSERT INTO `t_file` VALUES ('54', null, null, null, '//localhost:3000/upload/政治_1589099442887.xlsx', null);
INSERT INTO `t_file` VALUES ('55', null, null, null, '//localhost:3000/upload/政治_1589099446222.xlsx', null);
INSERT INTO `t_file` VALUES ('56', '9', null, null, '//localhost:3000/upload/政治_1589099446222.xlsx', null);
INSERT INTO `t_file` VALUES ('57', '9', null, null, '//localhost:3000/upload/政治_1589099440379.xlsx', null);
INSERT INTO `t_file` VALUES ('58', '9', null, null, '//localhost:3000/upload/政治_1589099442887.xlsx', null);
INSERT INTO `t_file` VALUES ('59', null, null, null, '//localhost:3000/upload/政治_1589185810678.xlsx', null);
INSERT INTO `t_file` VALUES ('60', null, null, null, '//localhost:3000/upload/政治_1589185814436.xlsx', null);
INSERT INTO `t_file` VALUES ('61', '10', null, null, '//localhost:3000/upload/政治_1589185810678.xlsx', null);
INSERT INTO `t_file` VALUES ('62', '10', null, null, '//localhost:3000/upload/政治_1589185814436.xlsx', null);
INSERT INTO `t_file` VALUES ('63', null, null, null, '//localhost:3000/upload/文件_1589200706080.xlsx', null);
INSERT INTO `t_file` VALUES ('64', null, null, null, '//localhost:3000/upload/文件_1589200736540.xlsx', null);
INSERT INTO `t_file` VALUES ('65', null, null, null, '//localhost:3000/upload/文件_1589200740780.xlsx', null);
INSERT INTO `t_file` VALUES ('66', null, null, null, '//localhost:3000/upload/文件_1589201438900.xlsx', null);
INSERT INTO `t_file` VALUES ('67', null, null, null, '//localhost:3000/upload/文件_1589201833820.xlsx', null);
INSERT INTO `t_file` VALUES ('68', null, null, null, '//localhost:3000/upload/文件_1589201837348.xlsx', null);
INSERT INTO `t_file` VALUES ('69', null, null, null, '//localhost:3000/upload/文件_1589201840673.xlsx', null);
INSERT INTO `t_file` VALUES ('70', null, null, null, '//localhost:3000/upload/文件_1589201881446.xlsx', null);
INSERT INTO `t_file` VALUES ('71', null, null, null, '//localhost:3000/upload/文件_1589201884297.xlsx', null);
INSERT INTO `t_file` VALUES ('74', null, null, null, '//localhost:3000/upload/文件_1589201923105.xlsx', null);
INSERT INTO `t_file` VALUES ('78', null, null, null, '//localhost:3000/upload/文件_1589205894442.xlsx', null);
INSERT INTO `t_file` VALUES ('79', null, null, null, '//localhost:3000/upload/文件_1589205896795.xlsx', null);
INSERT INTO `t_file` VALUES ('81', null, null, null, '//localhost:3000/upload/文件_1589205989022.xlsx', null);
INSERT INTO `t_file` VALUES ('82', null, null, null, '//localhost:3000/upload/文件_1589205992191.xlsx', null);
INSERT INTO `t_file` VALUES ('84', null, null, null, '//localhost:3000/upload/文件_1589206342953.xlsx', null);
INSERT INTO `t_file` VALUES ('86', null, null, null, '//localhost:3000/upload/文件_1589206433530.xlsx', null);
INSERT INTO `t_file` VALUES ('87', null, null, null, '//localhost:3000/upload/文件_1589206478700.xlsx', null);
INSERT INTO `t_file` VALUES ('88', null, null, null, '//localhost:3000/upload/文件_1589206559323.xlsx', null);
INSERT INTO `t_file` VALUES ('89', null, null, null, '//localhost:3000/upload/文件_1589206562163.xlsx', null);
INSERT INTO `t_file` VALUES ('90', null, null, null, '//localhost:3000/upload/文件_1589206609468.xlsx', null);
INSERT INTO `t_file` VALUES ('91', null, null, null, '//localhost:3000/upload/文件_1589206612213.xlsx', null);
INSERT INTO `t_file` VALUES ('94', null, null, null, '//localhost:3000/upload/文件_1589206972978.xlsx', null);
INSERT INTO `t_file` VALUES ('95', null, null, null, '//localhost:3000/upload/文件_1589206975203.xlsx', null);
INSERT INTO `t_file` VALUES ('96', null, null, null, '//localhost:3000/upload/文件_1589206977184.xlsx', null);
INSERT INTO `t_file` VALUES ('97', null, '4', null, '//localhost:3000/upload/文件_1589206975203.xlsx', null);
INSERT INTO `t_file` VALUES ('98', null, '4', null, '//localhost:3000/upload/文件_1589206972978.xlsx', null);
INSERT INTO `t_file` VALUES ('99', null, '4', null, '//localhost:3000/upload/文件_1589206977184.xlsx', null);
INSERT INTO `t_file` VALUES ('100', null, null, null, '//localhost:3000/upload/文件_1589206989140.xlsx', null);
INSERT INTO `t_file` VALUES ('101', null, '5', null, '//localhost:3000/upload/文件_1589206989140.xlsx', null);

-- ----------------------------
-- Table structure for t_honor
-- ----------------------------
DROP TABLE IF EXISTS `t_honor`;
CREATE TABLE `t_honor` (
  `honor_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '����id',
  `student_id` char(10) DEFAULT NULL COMMENT 'ѧ��id',
  `honor_type` tinyint(1) DEFAULT NULL COMMENT '��������',
  `honor_time` date DEFAULT NULL COMMENT '����ʱ��',
  `honor_name` char(30) DEFAULT NULL COMMENT '��������',
  `honor_rank` char(30) DEFAULT NULL COMMENT '���ͼ���',
  `honor_status` int(11) DEFAULT NULL COMMENT '�����봦�ֵ�����״̬',
  `honor_status_desc` text COMMENT '��������',
  `honor_tea_desc` text COMMENT '��ʦ���',
  PRIMARY KEY (`honor_id`),
  KEY `FK_Relationship_7` (`student_id`),
  CONSTRAINT `FK_Relationship_7` FOREIGN KEY (`student_id`) REFERENCES `t_student_info` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='���������';

-- ----------------------------
-- Records of t_honor
-- ----------------------------
INSERT INTO `t_honor` VALUES ('4', '0778788', '1', '2020-05-12', '1', '国家级', null, null, null);
INSERT INTO `t_honor` VALUES ('5', '0778788', '1', '2020-05-12', '1', '省级', null, null, null);
INSERT INTO `t_honor` VALUES ('6', '0778788', '0', '2020-05-07', '21', '省级', null, null, null);

-- ----------------------------
-- Table structure for t_job
-- ----------------------------
DROP TABLE IF EXISTS `t_job`;
CREATE TABLE `t_job` (
  `job_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '��ҵid',
  `student_id` char(10) DEFAULT NULL COMMENT 'ѧ��id',
  `job_name` char(50) DEFAULT NULL COMMENT '��λ����',
  `job_code` char(30) DEFAULT NULL COMMENT '������ô���',
  `job_address` char(100) DEFAULT NULL COMMENT '��ַ',
  `job_person` char(20) DEFAULT NULL COMMENT '��λ��ϵ��',
  `job_tel` char(11) DEFAULT NULL COMMENT '��ϵ�˵绰',
  `job_content` text COMMENT '��������',
  PRIMARY KEY (`job_id`),
  KEY `FK_Relationship_8` (`student_id`),
  CONSTRAINT `FK_Relationship_8` FOREIGN KEY (`student_id`) REFERENCES `t_student_info` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='��ҵ��';

-- ----------------------------
-- Records of t_job
-- ----------------------------

-- ----------------------------
-- Table structure for t_politics_status
-- ----------------------------
DROP TABLE IF EXISTS `t_politics_status`;
CREATE TABLE `t_politics_status` (
  `politics_status_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '������òid',
  `politics_status` char(20) DEFAULT NULL COMMENT '������ò',
  PRIMARY KEY (`politics_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='������ò�ֵ��';

-- ----------------------------
-- Records of t_politics_status
-- ----------------------------
INSERT INTO `t_politics_status` VALUES ('1', '中共党员');
INSERT INTO `t_politics_status` VALUES ('2', '中共预备党员');
INSERT INTO `t_politics_status` VALUES ('3', '民主党派');
INSERT INTO `t_politics_status` VALUES ('4', '共青团员');
INSERT INTO `t_politics_status` VALUES ('5', '群众');

-- ----------------------------
-- Table structure for t_politics_status_info
-- ----------------------------
DROP TABLE IF EXISTS `t_politics_status_info`;
CREATE TABLE `t_politics_status_info` (
  `politics_status_info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '������ò��Ϣid',
  `volunteer` tinyint(1) DEFAULT NULL COMMENT '����־Ը��',
  `ideo_iden` text COMMENT '����˼�����',
  `ideo_person` char(20) DEFAULT NULL COMMENT '������',
  `unity` text COMMENT '��֧�����',
  `unity_person` char(20) DEFAULT NULL COMMENT '�����',
  `begin_time` date DEFAULT NULL COMMENT '�뵳ʱ��',
  `member_time` date DEFAULT NULL COMMENT '����ʱ��',
  PRIMARY KEY (`politics_status_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='������ò���ϱ�';

-- ----------------------------
-- Records of t_politics_status_info
-- ----------------------------
INSERT INTO `t_politics_status_info` VALUES ('4', '0', '个人思想鉴定:2', '鉴定人:1', '同意', '123123', '2020-05-05', '2020-05-07');
INSERT INTO `t_politics_status_info` VALUES ('5', '0', '个人思想鉴定:2', '鉴定人:1', '同意', '123123', '2020-05-05', '2020-05-07');
INSERT INTO `t_politics_status_info` VALUES ('6', '0', '123', '123', '不同意', '123', '2020-05-13', '2020-05-15');
INSERT INTO `t_politics_status_info` VALUES ('8', '0', '123', '123', '不同意', '123', '2020-05-13', '2020-05-15');
INSERT INTO `t_politics_status_info` VALUES ('9', '0', '1233', '1234', '同意', '1234', '2020-05-26', '2020-05-20');
INSERT INTO `t_politics_status_info` VALUES ('10', '0', '2', '3', '同意', '4', '2020-05-05', '2020-05-13');

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '��ɫid',
  `role_name` char(20) DEFAULT NULL COMMENT '��ɫ����',
  `role_rank` text COMMENT '��Χ',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '�Ƿ�ɾ��',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='��ɫ��';

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('0', '管理员', '[\"/welcome\",\"/role\",\"/user\",\"/user/userAdd\",\"/user/userList\",\"/college\",\"/college/add\",\"/college/list\",\"/major\",\"/major/add\",\"/major/list\",\"/class\",\"/class/add\",\"/class/list\"]', '0');
INSERT INTO `t_role` VALUES ('1', '院长', '[\"/welcome\",\"/role\",\"/user\",\"/user/userAdd\",\"/user/userList\",\"/college\",\"/college/add\",\"/college/list\",\"/major\",\"/major/add\",\"/major/list\",\"/class\",\"/class/add\",\"/class/list\",\"/person\",\"/person/add\",\"/person/password\"]', '0');
INSERT INTO `t_role` VALUES ('2', '教师', '[\"/welcome\",\"/role\",\"/user/userAdd\",\"/college/list\",\"/major\",\"/major/add\",\"/major/list\",\"/class/add\"]', '0');
INSERT INTO `t_role` VALUES ('3', '学生', '[\"/welcome\",\"/role\",\"/user/userAdd\",\"/college/list\",\"/major/list\",\"/course/list\",\"/score/studentList\",\"/person\",\"/person/add\",\"/person/password\",\"/roll/add\",\"/roll/person\",\"/honor/query\"]', '0');
INSERT INTO `t_role` VALUES ('4', '教秘', '[\"/role\",\"/user\",\"/user/userAdd\",\"/user/userList\",\"/college\",\"/college/add\",\"/college/list\",\"/major\",\"/major/add\",\"/major/list\",\"/class\",\"/class/add\",\"/class/list\",\"/course\",\"/course/add\",\"/course/list\",\"/score/add\",\"/score/list\",\"/score/examine\",\"/person\",\"/person/add\",\"/person/password\",\"/roll/list\",\"/honor\",\"/honor/add\",\"/honor/list\",\"/job\",\"/job/add\",\"/job/list\",\"/studentInfo/list\"]', '0');
INSERT INTO `t_role` VALUES ('5', '测试', '[\"/welcome\",\"/role\",\"/user\",\"/user/userAdd\",\"/user/userList\",\"/college\",\"/college/add\",\"/college/list\",\"/major\",\"/major/add\",\"/major/list\",\"/class\",\"/class/add\",\"/class/list\",\"/course\",\"/course/add\",\"/course/list\"]', '0');

-- ----------------------------
-- Table structure for t_roll
-- ----------------------------
DROP TABLE IF EXISTS `t_roll`;
CREATE TABLE `t_roll` (
  `roll_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ѧ���춯id',
  `student_id` char(10) DEFAULT NULL COMMENT 'ѧ��id',
  `roll_type` char(10) DEFAULT NULL COMMENT 'ѧ���춯����',
  `roll_desc` text COMMENT '����',
  `roll_audit` char(20) DEFAULT NULL COMMENT '��������',
  `roll_auditor` char(20) DEFAULT NULL COMMENT '������',
  `roll_begin_time` datetime DEFAULT NULL COMMENT '��ʼʱ��',
  `roll_end_time` date DEFAULT NULL COMMENT '����ʱ��',
  PRIMARY KEY (`roll_id`),
  KEY `FK_Relationship_3` (`student_id`),
  CONSTRAINT `FK_Relationship_3` FOREIGN KEY (`student_id`) REFERENCES `t_student_info` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='ѧ���춯��';

-- ----------------------------
-- Records of t_roll
-- ----------------------------
INSERT INTO `t_roll` VALUES ('3', '0778788', '退学', '1111', 'ok', '教秘1', '2020-05-10 19:08:58', '2020-05-11');
INSERT INTO `t_roll` VALUES ('4', '0778788', '当兵入伍', '123', null, null, '2020-05-11 09:17:14', null);
INSERT INTO `t_roll` VALUES ('5', '0209454', '复学', '123', null, null, '2020-05-11 10:41:29', null);
INSERT INTO `t_roll` VALUES ('6', '0209454', '其他', '123123123', null, null, '2020-05-11 10:41:31', null);
INSERT INTO `t_roll` VALUES ('7', '8619439', '复学', '123', null, null, '2020-05-11 15:30:16', null);
INSERT INTO `t_roll` VALUES ('8', '8619439', '退学', '123213', null, null, '2020-05-11 15:30:32', null);
INSERT INTO `t_roll` VALUES ('9', '8619439', '当兵入伍', '123123', null, null, '2020-05-11 15:30:35', null);
INSERT INTO `t_roll` VALUES ('10', '8619439', '其他', '123123', null, null, '2020-05-11 15:30:43', null);

-- ----------------------------
-- Table structure for t_score
-- ----------------------------
DROP TABLE IF EXISTS `t_score`;
CREATE TABLE `t_score` (
  `course_id` char(10) NOT NULL COMMENT '�γ̺�',
  `student_id` char(10) NOT NULL COMMENT 'ѧ��id',
  `score_dissent_type` int(11) DEFAULT NULL COMMENT '�ɼ���������',
  `type_stu_desc` text COMMENT 'ѧ��������������',
  `type_begin_time` datetime DEFAULT NULL COMMENT '���鴴��ʱ��',
  `type_end_time` datetime DEFAULT NULL COMMENT '����ر�ʱ��',
  `type_tea_desc` text COMMENT '��ʦ������',
  `score` float DEFAULT NULL COMMENT '����',
  `score_desc` text COMMENT '�ɼ���ע',
  `score_type` char(20) DEFAULT NULL,
  PRIMARY KEY (`course_id`,`student_id`),
  KEY `FK_Relationship_27` (`student_id`),
  CONSTRAINT `FK_Relationship_19` FOREIGN KEY (`course_id`) REFERENCES `t_course` (`course_id`),
  CONSTRAINT `FK_Relationship_27` FOREIGN KEY (`student_id`) REFERENCES `t_student_info` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='�ɼ���';

-- ----------------------------
-- Records of t_score
-- ----------------------------
INSERT INTO `t_score` VALUES ('o_22821130', '0770903', null, null, null, null, null, '100', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821130', '0771465', null, null, null, null, null, '71', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821130', '0772367', null, null, null, null, null, '72', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821130', '0772817', null, null, null, null, null, '73', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821130', '0778516', null, null, null, null, null, '74', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821130', '0778712', null, null, null, null, null, '75', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821130', '0778788', '1', '123123123再次', '2020-05-08 23:41:14', '2020-05-08 23:41:53', '再次修改', '80', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821130', '0779899', null, null, null, null, null, '77', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821131', '0770903', null, null, null, null, null, '78', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821131', '0771465', null, null, null, null, null, '79', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821131', '0772367', null, null, null, null, null, '80', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821131', '0772817', null, null, null, null, null, '81', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821131', '0778516', null, null, null, null, null, '82', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821131', '0778712', null, null, null, null, null, '83', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821131', '0778788', '1', '2222', '2020-05-08 22:48:33', null, null, '84', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821131', '0779899', null, null, null, null, null, '85', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821132', '0770903', null, null, null, null, null, '86', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821132', '0771465', null, null, null, null, null, '87', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821132', '0772367', null, null, null, null, null, '88', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821132', '0772817', null, null, null, null, null, '89', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821132', '0778516', null, null, null, null, null, '90', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821132', '0778712', null, null, null, null, null, '91', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821132', '0778788', '1', '成绩错误了', '2020-05-09 17:32:58', '2020-05-09 17:33:22', 'ok', '92', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821132', '0779899', null, null, null, null, null, '93', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821133', '0770903', null, null, null, null, null, '94', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821133', '0771465', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821133', '0772367', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821133', '0772817', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821133', '0778516', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821133', '0778712', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821133', '0778788', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_22821133', '0779899', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609770', '0389012', null, null, null, null, null, '90', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609770', '0392233', null, null, null, null, null, '72', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609770', '0392330', null, null, null, null, null, '71', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609770', '0393617', null, null, null, null, null, '77', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609770', '0393692', null, null, null, null, null, '70', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609770', '0396282', null, null, null, null, null, '76', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609770', '0396797', null, null, null, null, null, '73', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609770', '8619439', null, null, null, null, null, '74', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609771', '0389012', null, null, null, null, null, '83', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609771', '0392233', null, null, null, null, null, '80', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609771', '0392330', null, null, null, null, null, '79', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609771', '0393617', null, null, null, null, null, '85', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609771', '0393692', null, null, null, null, null, '78', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609771', '0396282', null, null, null, null, null, '84', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609771', '0396797', null, null, null, null, null, '81', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609771', '8619439', null, null, null, null, null, '82', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609772', '0389012', null, null, null, null, null, '91', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609772', '0392233', null, null, null, null, null, '88', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609772', '0392330', null, null, null, null, null, '87', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609772', '0393617', null, null, null, null, null, '93', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609772', '0393692', null, null, null, null, null, '86', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609772', '0396282', null, null, null, null, null, '92', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609772', '0396797', null, null, null, null, null, '89', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609772', '8619439', null, null, null, null, null, '90', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609773', '0389012', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609773', '0392233', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609773', '0392330', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609773', '0393617', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609773', '0393692', null, null, null, null, null, '94', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609773', '0396282', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609773', '0396797', null, null, null, null, null, '60', '无', '正常');
INSERT INTO `t_score` VALUES ('o_25609773', '8619439', null, null, null, null, null, '60', '无', '正常');

-- ----------------------------
-- Table structure for t_specialty
-- ----------------------------
DROP TABLE IF EXISTS `t_specialty`;
CREATE TABLE `t_specialty` (
  `specialty` char(10) NOT NULL COMMENT '专业id',
  `college_id` int(11) DEFAULT NULL COMMENT 'ѧԺid',
  `specialty_name` char(20) DEFAULT NULL COMMENT 'רҵ����',
  `is_delete` tinyint(4) DEFAULT '0',
  `specialty_desc` text COMMENT 'רҵ����',
  PRIMARY KEY (`specialty`),
  KEY `FK_Relationship_16` (`college_id`),
  CONSTRAINT `FK_Relationship_16` FOREIGN KEY (`college_id`) REFERENCES `t_college` (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='רҵ';

-- ----------------------------
-- Records of t_specialty
-- ----------------------------
INSERT INTO `t_specialty` VALUES ('8933859426', '20', '学院3专业1', '0', '学院3专业1学院3专业1学院3专业1学院3专业1');
INSERT INTO `t_specialty` VALUES ('8933919917', '20', '学院3专业2', '0', '学院3专业2学院3专业2学院3专业2学院3专业2学院3专业2');
INSERT INTO `t_specialty` VALUES ('8937720073', '18', '学院1专业1', '0', '学院1专业1学院1专业1学院1专业1学院1专业1');
INSERT INTO `t_specialty` VALUES ('8937726945', '18', '学院1专业2', '0', '学院1专业2学院1专业2学院1专业2');

-- ----------------------------
-- Table structure for t_student_info
-- ----------------------------
DROP TABLE IF EXISTS `t_student_info`;
CREATE TABLE `t_student_info` (
  `student_id` char(10) NOT NULL COMMENT 'ѧ��id',
  `user_id` int(11) DEFAULT NULL COMMENT '�û�id',
  `politics_status_id` int(11) DEFAULT NULL COMMENT '������òid',
  `politics_status_info_id` int(11) DEFAULT NULL COMMENT '������ò��Ϣid',
  `class_id` char(10) DEFAULT NULL COMMENT '�༶���',
  `is_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`student_id`),
  KEY `FK_Relationship_2` (`user_id`),
  KEY `FK_Relationship_21` (`class_id`),
  KEY `FK_Relationship_4` (`politics_status_id`),
  KEY `FK_Relationship_5` (`politics_status_info_id`),
  CONSTRAINT `FK_Relationship_2` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`),
  CONSTRAINT `FK_Relationship_21` FOREIGN KEY (`class_id`) REFERENCES `t_class` (`class_id`),
  CONSTRAINT `FK_Relationship_4` FOREIGN KEY (`politics_status_id`) REFERENCES `t_politics_status` (`politics_status_id`),
  CONSTRAINT `FK_Relationship_5` FOREIGN KEY (`politics_status_info_id`) REFERENCES `t_politics_status_info` (`politics_status_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ѧ����Ϣ��';

-- ----------------------------
-- Records of t_student_info
-- ----------------------------
INSERT INTO `t_student_info` VALUES ('0209454', '207372', '4', null, 'c_37866549', '0');
INSERT INTO `t_student_info` VALUES ('0389012', '389014', '4', null, 'c_37884981', '0');
INSERT INTO `t_student_info` VALUES ('0392233', '394372', '4', null, 'c_37866549', '0');
INSERT INTO `t_student_info` VALUES ('0392330', '393175', '4', null, 'c_37866549', '0');
INSERT INTO `t_student_info` VALUES ('0393617', '396172', '4', null, 'c_37893186', '0');
INSERT INTO `t_student_info` VALUES ('0393692', '390815', '4', null, 'c_37866549', '0');
INSERT INTO `t_student_info` VALUES ('0396282', '392406', '4', null, 'c_37884981', '0');
INSERT INTO `t_student_info` VALUES ('0396797', '394510', '4', null, 'c_37866549', '0');
INSERT INTO `t_student_info` VALUES ('0397134', '396573', '4', null, 'c_37893186', '0');
INSERT INTO `t_student_info` VALUES ('0770903', '774132', '4', null, 'c_36821036', '0');
INSERT INTO `t_student_info` VALUES ('0771465', '770504', '4', null, 'c_36753407', '0');
INSERT INTO `t_student_info` VALUES ('0772367', '777792', '4', null, 'c_36827205', '0');
INSERT INTO `t_student_info` VALUES ('0772817', '779828', '4', null, 'c_36753407', '0');
INSERT INTO `t_student_info` VALUES ('0778516', '771540', '4', null, 'c_36827205', '0');
INSERT INTO `t_student_info` VALUES ('0778712', '778189', '1', '10', 'c_36585507', '0');
INSERT INTO `t_student_info` VALUES ('0778788', '775173', '1', '9', 'c_36585507', '0');
INSERT INTO `t_student_info` VALUES ('0779899', '773422', '4', null, 'c_36821036', '0');
INSERT INTO `t_student_info` VALUES ('4029570', '4031837', '4', null, 'c_36753407', '0');
INSERT INTO `t_student_info` VALUES ('4030763', '4025007', '4', null, 'c_36827205', '0');
INSERT INTO `t_student_info` VALUES ('4033896', '4029763', '4', null, 'c_36827205', '0');
INSERT INTO `t_student_info` VALUES ('8619439', '9850894', '2', null, 'c_37866549', '0');

-- ----------------------------
-- Table structure for t_teacher_info
-- ----------------------------
DROP TABLE IF EXISTS `t_teacher_info`;
CREATE TABLE `t_teacher_info` (
  `teacher_id` char(10) NOT NULL COMMENT '��ʦid',
  `user_id` int(11) DEFAULT NULL COMMENT '�û�id',
  `college_id` int(11) DEFAULT NULL COMMENT 'ѧԺid',
  `specialty` char(10) DEFAULT NULL COMMENT 'רҵid',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '�Ƿ�ɾ��',
  `teacher_title` char(20) DEFAULT NULL COMMENT '��ʦְ��',
  PRIMARY KEY (`teacher_id`),
  KEY `FK_Relationship_14` (`user_id`),
  KEY `FK_Relationship_15` (`college_id`),
  KEY `FK_Relationship_20` (`specialty`),
  CONSTRAINT `FK_Relationship_14` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`user_id`),
  CONSTRAINT `FK_Relationship_15` FOREIGN KEY (`college_id`) REFERENCES `t_college` (`college_id`),
  CONSTRAINT `FK_Relationship_20` FOREIGN KEY (`specialty`) REFERENCES `t_specialty` (`specialty`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='��ʦ��Ϣ��';

-- ----------------------------
-- Records of t_teacher_info
-- ----------------------------
INSERT INTO `t_teacher_info` VALUES ('1914296', '9850890', '20', null, '0', '讲师');
INSERT INTO `t_teacher_info` VALUES ('2068524', '9850891', '20', null, '0', '副教授');
INSERT INTO `t_teacher_info` VALUES ('2240799', '9850892', '20', null, '0', '副教授');
INSERT INTO `t_teacher_info` VALUES ('3093417', '3091296', '20', null, '0', '助教');
INSERT INTO `t_teacher_info` VALUES ('3098043', '3098278', '20', null, '0', '讲师');
INSERT INTO `t_teacher_info` VALUES ('3099298', '3093269', '20', null, '0', '教授');
INSERT INTO `t_teacher_info` VALUES ('3304525', '3303154', '18', null, '0', '助教');
INSERT INTO `t_teacher_info` VALUES ('3305488', '3302157', '18', null, '0', '讲师');
INSERT INTO `t_teacher_info` VALUES ('3346089', '3345355', '18', null, '0', '教授');
INSERT INTO `t_teacher_info` VALUES ('3347174', '3343047', '18', null, '0', '教授');
INSERT INTO `t_teacher_info` VALUES ('3349577', '3350976', '18', null, '0', '副教授');
INSERT INTO `t_teacher_info` VALUES ('6526805', '9850893', '20', null, '0', '副教授');
INSERT INTO `t_teacher_info` VALUES ('6695723', '6703053', '20', null, '0', '副教授');
INSERT INTO `t_teacher_info` VALUES ('6698472', '6701252', '20', null, '0', '教授');
INSERT INTO `t_teacher_info` VALUES ('6701427', '6700665', '20', null, '0', '教授');
INSERT INTO `t_teacher_info` VALUES ('6701448', '6696162', '20', null, '0', '讲师');
INSERT INTO `t_teacher_info` VALUES ('6703338', '6697873', '20', null, '0', '助教');
INSERT INTO `t_teacher_info` VALUES ('7702863', '7702912', '18', null, '0', '教授');
INSERT INTO `t_teacher_info` VALUES ('7702898', '7707414', '18', null, '0', '副教授');
INSERT INTO `t_teacher_info` VALUES ('7703006', '7708114', '18', null, '0', '助教');
INSERT INTO `t_teacher_info` VALUES ('7707479', '7703701', '18', null, '0', '教授');
INSERT INTO `t_teacher_info` VALUES ('7707536', '7699335', '18', null, '0', '讲师');

-- ----------------------------
-- Table structure for t_teacher_score
-- ----------------------------
DROP TABLE IF EXISTS `t_teacher_score`;
CREATE TABLE `t_teacher_score` (
  `course_id` char(10) NOT NULL COMMENT '�γ̺�',
  `teacher_id` char(10) NOT NULL COMMENT '��ʦid',
  PRIMARY KEY (`course_id`,`teacher_id`),
  KEY `FK_Relationship_26` (`teacher_id`),
  CONSTRAINT `FK_Relationship_17` FOREIGN KEY (`course_id`) REFERENCES `t_course` (`course_id`),
  CONSTRAINT `FK_Relationship_26` FOREIGN KEY (`teacher_id`) REFERENCES `t_teacher_info` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='��ʦ�Ϳγ�֮����м��';

-- ----------------------------
-- Records of t_teacher_score
-- ----------------------------
INSERT INTO `t_teacher_score` VALUES ('o_22821134', '6526805');
INSERT INTO `t_teacher_score` VALUES ('o_22821133', '6695723');
INSERT INTO `t_teacher_score` VALUES ('o_22821132', '6698472');
INSERT INTO `t_teacher_score` VALUES ('o_22821137', '6698472');
INSERT INTO `t_teacher_score` VALUES ('o_22821131', '6701427');
INSERT INTO `t_teacher_score` VALUES ('o_22821136', '6701427');
INSERT INTO `t_teacher_score` VALUES ('o_42141247', '6701448');
INSERT INTO `t_teacher_score` VALUES ('o_22821130', '6703338');
INSERT INTO `t_teacher_score` VALUES ('o_22821135', '6703338');
INSERT INTO `t_teacher_score` VALUES ('o_25609771', '7702863');
INSERT INTO `t_teacher_score` VALUES ('o_25609773', '7702898');
INSERT INTO `t_teacher_score` VALUES ('o_25609775', '7702898');
INSERT INTO `t_teacher_score` VALUES ('o_25609774', '7703006');
INSERT INTO `t_teacher_score` VALUES ('o_25609776', '7703006');
INSERT INTO `t_teacher_score` VALUES ('o_25609772', '7707479');
INSERT INTO `t_teacher_score` VALUES ('o_25609777', '7707479');
INSERT INTO `t_teacher_score` VALUES ('o_25609770', '7707536');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '�û�id',
  `role_id` int(11) DEFAULT NULL COMMENT '��ɫid',
  `student_id` char(10) DEFAULT NULL COMMENT 'ѧ��id',
  `college_id` int(11) DEFAULT NULL COMMENT 'ѧԺid',
  `teacher_id` char(10) DEFAULT NULL COMMENT '��ʦid',
  `user_username` char(30) DEFAULT NULL COMMENT '�˺�',
  `user_password` char(30) DEFAULT NULL COMMENT '����',
  `is_delete` tinyint(1) DEFAULT '0' COMMENT '�Ƿ�ɾ��',
  `user_name` char(10) DEFAULT NULL COMMENT '����',
  `user_sex` char(2) DEFAULT NULL COMMENT '�Ա�',
  `user_age` int(11) DEFAULT NULL COMMENT '����',
  `user_address` text COMMENT '����',
  `user_nation` char(20) DEFAULT NULL COMMENT '����',
  `user_tel` char(11) DEFAULT NULL COMMENT '�ֻ�',
  `user_birthday` date DEFAULT NULL COMMENT '��������',
  `user_last_name` char(20) DEFAULT NULL COMMENT '������',
  `user_heath` char(20) DEFAULT NULL COMMENT '����״��',
  `user_culture` char(20) DEFAULT NULL COMMENT '�Ļ��̶�',
  PRIMARY KEY (`user_id`),
  KEY `FK_Relationship_1` (`role_id`),
  KEY `FK_Relationship_23` (`student_id`),
  KEY `FK_Relationship_24` (`college_id`),
  KEY `FK_Relationship_25` (`teacher_id`),
  CONSTRAINT `FK_Relationship_1` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`role_id`),
  CONSTRAINT `FK_Relationship_23` FOREIGN KEY (`student_id`) REFERENCES `t_student_info` (`student_id`),
  CONSTRAINT `FK_Relationship_24` FOREIGN KEY (`college_id`) REFERENCES `t_college` (`college_id`),
  CONSTRAINT `FK_Relationship_25` FOREIGN KEY (`teacher_id`) REFERENCES `t_teacher_info` (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9850895 DEFAULT CHARSET=utf8 COMMENT='�û���';

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '0', null, null, null, 'admin', '123456', '0', '管理员', '男', '19', null, null, null, null, null, null, null);
INSERT INTO `t_user` VALUES ('207372', '3', '0209454', '18', null, 'student2', '123456', '0', '学生2', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生2', '健康', '本科');
INSERT INTO `t_user` VALUES ('389014', '3', '0389012', '18', null, 'student9', '123456', '0', '学生9', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生9', '健康', '本科');
INSERT INTO `t_user` VALUES ('390815', '3', '0393692', '18', null, 'student5', '123456', '0', '学生5', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生5', '健康', '本科');
INSERT INTO `t_user` VALUES ('392406', '3', '0396282', '18', null, 'student7', '123456', '0', '学生7', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生7', '健康', '本科');
INSERT INTO `t_user` VALUES ('393175', '3', '0392330', '18', null, 'student6', '123456', '0', '学生6', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生6', '健康', '本科');
INSERT INTO `t_user` VALUES ('394372', '3', '0392233', '18', null, 'student3', '123456', '0', '学生3', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生3', '健康', '本科');
INSERT INTO `t_user` VALUES ('394510', '3', '0396797', '18', null, 'student4', '123456', '0', '学生4', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生4', '健康', '本科');
INSERT INTO `t_user` VALUES ('396172', '3', '0393617', '18', null, 'student10', '123456', '0', '学生10', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生10', '健康', '本科');
INSERT INTO `t_user` VALUES ('396573', '3', '0397134', '18', null, 'student8', '123456', '0', '学生8', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生8', '健康', '本科');
INSERT INTO `t_user` VALUES ('770504', '3', '0771465', '20', null, 'student14', '123456', '0', '学生14', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生14', '健康', '本科');
INSERT INTO `t_user` VALUES ('771540', '3', '0778516', '20', null, 'student18', '123456', '0', '学生18', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生18', '健康', '本科');
INSERT INTO `t_user` VALUES ('773422', '3', '0779899', '20', null, 'student16', '123456', '0', '学生16', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生16', '健康', '本科');
INSERT INTO `t_user` VALUES ('774132', '3', '0770903', '20', null, 'student15', '123456', '0', '学生15', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生15', '健康', '本科');
INSERT INTO `t_user` VALUES ('775173', '3', '0778788', '20', null, 'student11', '123456', '0', '学生11', '男', '171', '河北省邯郸市1', '汉族', '1373100286', '1998-10-13', '学生11', '健康1', '博士');
INSERT INTO `t_user` VALUES ('777792', '3', '0772367', '20', null, 'student17', '123456', '0', '学生17', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生17', '健康', '本科');
INSERT INTO `t_user` VALUES ('778189', '3', '0778712', '20', null, 'student12', '123456', '0', '学生12', '女', '21', '河北省邯郸市1', '土家族', '13731002861', '1998-10-13', '学生123', '健康1', '博士');
INSERT INTO `t_user` VALUES ('779828', '3', '0772817', '20', null, 'student13', '123456', '0', '学生13', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生13', '健康', '本科');
INSERT INTO `t_user` VALUES ('3091296', '4', null, '20', '3093417', 'jiaomi4', '123456', '0', '程晴美', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '程晴美', '健康', '本科');
INSERT INTO `t_user` VALUES ('3093269', '4', null, '20', '3099298', 'jiaomi6', '123456', '0', '张心语', '男', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '张心语', '健康', '本科');
INSERT INTO `t_user` VALUES ('3098278', '4', null, '20', '3098043', 'jiaomi5', '123456', '0', '罗玉英', '男', '18', '河北省邯郸市', '汉族', '13731002866', '1998-10-25', '罗玉英', '健康', '本科');
INSERT INTO `t_user` VALUES ('3302157', '4', null, '18', '3305488', 'jiaomi9', '123456', '0', '幸幻天', '男', '18', '河北省邯郸市', '汉族', '13731002866', '1998-10-25', '幸幻天', '健康', '本科');
INSERT INTO `t_user` VALUES ('3303154', '4', null, '18', '3304525', 'jiaomi8', '123456', '0', '邴凡阳', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '邴凡阳', '健康', '本科');
INSERT INTO `t_user` VALUES ('3343047', '4', null, '18', '3347174', 'jiaomi12', '123456', '0', '晃天蓝', '男', '21', '河北省邯郸市', '汉族', '13731002869', '1998-10-28', '晃天蓝', '健康', '本科');
INSERT INTO `t_user` VALUES ('3345355', '4', null, '18', '3346089', 'jiaomi11', '123456', '0', '闻安娜', '男', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '闻安娜', '健康', '本科');
INSERT INTO `t_user` VALUES ('3350976', '4', null, '18', '3349577', 'jiaomi10', '123456', '0', '糜依秋', '男', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '糜依秋', '健康', '本科');
INSERT INTO `t_user` VALUES ('4025007', '3', '4030763', '20', null, 'student20', '123456', '0', '学生17', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生17', '健康', '本科');
INSERT INTO `t_user` VALUES ('4029763', '3', '4033896', '20', null, 'student21', '123456', '0', '学生18', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生18', '健康', '本科');
INSERT INTO `t_user` VALUES ('4031837', '3', '4029570', '20', null, 'student19', '123456', '0', '学生14', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '学生14', '健康', '本科');
INSERT INTO `t_user` VALUES ('6696162', '2', null, '20', '6701448', 'jiaoshi3', '123456', '0', '谭运馨', '男', '18', '河北省邯郸市', '汉族', '13731002866', '1998-10-25', '谭运馨', '健康', '本科');
INSERT INTO `t_user` VALUES ('6697873', '2', null, '20', '6703338', 'jiaoshi2', '123456', '0', '能之云', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '能之云', '健康', '本科');
INSERT INTO `t_user` VALUES ('6700665', '2', null, '20', '6701427', 'jiaoshi6', '123456', '0', '孔寻菡', '男', '21', '河北省邯郸市', '汉族', '13731002869', '1998-10-28', '孔寻菡', '健康', '本科');
INSERT INTO `t_user` VALUES ('6701252', '2', null, '20', '6698472', 'jiaoshi5', '123456', '0', '詹雪翎', '男', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '詹雪翎', '健康', '本科');
INSERT INTO `t_user` VALUES ('6703053', '2', null, '20', '6695723', 'jiaoshi4', '123456', '0', '瞿睿琳', '男', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '瞿睿琳', '健康', '本科');
INSERT INTO `t_user` VALUES ('7699335', '2', null, '18', '7707536', 'jiaoshi8', '123456', '0', '贡微婉', '女', '18', '河北省邯郸市', '汉族', '13731002866', '1998-10-25', '贡微婉', '健康', '本科');
INSERT INTO `t_user` VALUES ('7702912', '2', null, '18', '7702863', 'jiaoshi10', '123456', '0', '戈文敏', '女', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '戈文敏', '健康', '本科');
INSERT INTO `t_user` VALUES ('7703701', '2', null, '18', '7707479', 'jiaoshi11', '123456', '0', '许希彤', '男', '21', '河北省邯郸市', '汉族', '13731002869', '1998-10-28', '许希彤', '健康', '本科');
INSERT INTO `t_user` VALUES ('7707414', '2', null, '18', '7702898', 'jiaoshi9', '123456', '0', '谭燕岚', '男', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '谭燕岚', '健康', '本科');
INSERT INTO `t_user` VALUES ('7708114', '2', null, '18', '7703006', 'jiaoshi7', '123456', '0', '石惠玲', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '石惠玲', '健康', '本科');
INSERT INTO `t_user` VALUES ('9472563', '0', null, null, null, 'admintest4', '123456', '1', '麴梦凡', '女', '30', '河北省邯郸市', '汉族', '13731002867', '1998-10-10', '麴梦凡', '健康', '本科');
INSERT INTO `t_user` VALUES ('9474746', '0', null, null, null, 'admintest5', '123456', '0', '叶心香', '男', '21', '河北省邯郸市', '汉族', '13731002869', '1998-10-28', '叶心香', '健康', '本科');
INSERT INTO `t_user` VALUES ('9477409', '0', null, null, null, 'admintest1', '123456', '0', '苏听南', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '苏听南', '健康', '本科');
INSERT INTO `t_user` VALUES ('9477937', '0', null, null, null, 'admintest2', '123456', '0', '籍齐敏', '女', '18', '河北省邯郸市', '汉族', '13731002866', '1998-10-25', '籍齐敏', '健康', '本科');
INSERT INTO `t_user` VALUES ('9479826', '0', null, null, null, 'admintest3', '123456', '0', '刘臻晰', '男', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '刘臻晰', '健康', '本科');
INSERT INTO `t_user` VALUES ('9495129', '1', null, '18', null, 'collegetest2', '123456', '0', '文子爱', '男', '18', '河北省邯郸市', '汉族', '13731002866', '1998-10-25', '文子爱', '健康', '本科');
INSERT INTO `t_user` VALUES ('9497316', '1', null, null, null, 'collegetest3', '123456', '1', '盖晓霞', '男', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '盖晓霞', '健康', '本科');
INSERT INTO `t_user` VALUES ('9499622', '1', null, null, null, 'collegetest5', '123456', '1', '史碧凡', '男', '21', '河北省邯郸市', '汉族', '13731002869', '1998-10-28', '史碧凡', '健康', '本科');
INSERT INTO `t_user` VALUES ('9502495', '1', null, null, null, 'collegetest1', '123456', '1', '步琼音', '男', '17', '河北省邯郸市', '汉族', '13731002865', '1998-10-24', '步琼音', '健康', '本科');
INSERT INTO `t_user` VALUES ('9502873', '1', null, '19', null, 'collegetest4', '123456', '0', '连小玉', '男', '19', '河北省邯郸市', '汉族', '13731002867', '1998-10-26', '连小玉', '健康', '本科');
INSERT INTO `t_user` VALUES ('9850888', '0', null, null, null, 'admintest', '123456', '0', '古觅海', '男', '19', '河北省邯郸市', '汉族', '13731002865', '2020-05-05', '古觅海', '健康', '初中');
INSERT INTO `t_user` VALUES ('9850889', '1', null, '20', null, 'college1', '123456', '0', '师家美', '男', '20', '河北省邯郸市', '土家族', '13731002865', '2020-05-13', '师家美', '健康1', '博士');
INSERT INTO `t_user` VALUES ('9850890', '4', null, '20', '1914296', 'jiaomi1', '123456', '0', '教秘1', '女', '34', '河北省邯郸市', '土家族', '111011', '2020-05-18', '教秘1', '健康', '博士');
INSERT INTO `t_user` VALUES ('9850891', '4', null, '20', '2068524', 'jiaomi2', '123456', '0', '教秘2', '女', '24', '河北省邯郸市', '土家族', '13731002865', '2020-05-13', '教秘2', '健康', '本科');
INSERT INTO `t_user` VALUES ('9850892', '4', null, '20', '2240799', 'jiaomi3', '123456', '0', '教秘3', '女', '24', '河北省邯郸市', '回族', '1111', '2020-04-28', '教秘3', '健康', '研究生');
INSERT INTO `t_user` VALUES ('9850893', '2', null, '20', '6526805', 'teacher1', '123456', '0', '教师1', '男', '13', '河北省邯郸市', '蒙古族', '1111111', '2020-05-14', '教师1', '健康', '高中');
INSERT INTO `t_user` VALUES ('9850894', '3', '8619439', '18', null, 'student1', '123456', '0', '学生1', '女', '19', '河北省邯郸市', '土家族', '13731002865', '2020-05-12', '学生1', '健康', '研究生');
