const {Sequelize} = require('sequelize');

module.exports = class E4F extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            info: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            user_id: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            text: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            classroom: {
                type: Sequelize.STRING(40),
                allowNull: false,
            }
        },{
            sequelize,
            timestamps: false,   //createdAt(생성시간), updatedAt(업데이트시간) 컬럼 추가
            underscored: false, 
            modelName: 'E4F',  //js에서의 이름
            tableName: 'e4f', //mysql테이블 이름 : e4f
            paranoid: false,     
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};