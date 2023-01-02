const db = require("../config/database");

const memberSerive = function (member_information) {
	this.name = member_information.name;
	this.studuenID = member_information.studuenID;
	this.first_track = member_information.first_track;
	this.second_track = member_information.second_track;
	this.github = member_information.github;
	this.phone = member_information.phone;
	this.email = member_information.email;
}

//멤버 정보 전체 로드
memberSerive.getAll = (result) => {

	db.getConnection(function(err, connection) {
		
		if(!err) {
			let SQL_to_load_all_member = `SELECT * FROM member_board`;

			connection.query(SQL_to_load_all_member, (err, res) => {
				
				connection.release();

				if (err) {
					console.log("error: ", err);
					result(null, err);
					return;
				}

				console.log("found information: ", res);
				result(null, res);
				return;
			})
		}
		else {
			console.error('mysql connection error ' + err);
			throw err;
		}
	})
}

//studentID로 멤버 검색

//이름으로 멤버 검색

//선택 페이지마다 ? 최대 10명씩? 5명씩? FE 랑 조금 얘기해보기

//멤버 정보 생성
memberSerive.create = (data, result) => {

	let information = Object.values(data);
	console.log(information);

	db.getConnection(function(err, connection) {
		
		if(!err) {
			let SQL_to_create_member = `INSERT INTO member_board VALUES (?)`;

			connection.query(SQL_to_create_member, [information],  (err, res) => {
				connection.release();

				if (err) {
					console.log("error: ", err);
					result(null, err);
					return;
				}

				result(null, res);
				return;
			})
		}
		else {
			console.error('mysql connection error ' + err);
			throw err;
		}
	})
}

//멤버 정보 수정
memberSerive.update = (data, idx, result) => {

	let modify_member_information = Object.values(data);

	db.getConnection(function(err, connection) {
		
		if(!err) {
			let SQL_to_load_all_member = `UPDATE member_board SET name = ?, first_track = ?, second_track = ?, 
										  git_hub = ?, phone_number = ?, email = ?, graduation = ?
										  WHERE idx LIKE ${Object.values(idx)[0]}`;

			connection.query(SQL_to_load_all_member, modify_member_information, (err, res) => {
				
				connection.release();

				if (err) {
					console.log("error: ", err);
					result(null, err);
					return;
				}

				result(null, res);
				return;
			})
		}
		else {
			console.error('mysql connection error ' + err);
			throw err;
		}
	})
}

//멤버 (정보) 삭제
memberSerive.delete = (target, result) => {

	db.getConnection(function(err, connection) {
		
		if(!err) {
			let SQL_to_delete_selected_member = `DELETE FROM member_board WHERE idx = ${Object.values(target)[0]}`;

			connection.query(SQL_to_delete_selected_member, (err, res) => {
				
				connection.release();

				if (err) {
					console.log("error: ", err);
					result(null, err);
					return ;
				}

				result(null, res);
				return ;
			})
		}
		else {
			console.error('mysql connection error ' + err);
			throw err;
		}
	})
}

module.exports = memberSerive;