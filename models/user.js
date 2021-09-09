const {Sequelize} = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            user_id: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            major: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            student_id: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            belong: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            classroom: {
                type: Sequelize.STRING(20),
                allowNull: true,
                defaultValue: false,
            },
            show: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
        },{
            sequelize,
            timestamps: true,   //createdAt(생성시간), updatedAt(업데이트시간) 컬럼 추가
            underscored: false, //_문자 false
            modelName: 'User',  //js에서의 이름
            tableName: 'users', //mysql테이블 이름 : users
            paranoid: true,     //deletedAt(삭제시간) 컬럼추가
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};