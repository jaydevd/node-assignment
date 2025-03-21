const { Admin, User } = require("./../Models/index");
const getAllUsers = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: INTERNAL_SERVOR_ERROR,
            message: '',
            data: '',
            error: error.message()
        })
    }
}
module.exports = {
    getAllUsers
}