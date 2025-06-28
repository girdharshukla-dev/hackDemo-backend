const { getAdminId } = require("../models/groupTable")
const { addUserToGroup } = require("../models/groupMember")

//this expect a /group/:groupId/add-member ans the userId of the the person to be added , in the body
async function addGroupMember(req, resp) {
    try {
        const groupId = req.params.groupId
        if (!groupId) {
            return resp.status(404).json({ message: "No group with the given groupId found" });
        }
        const { id: userId } = req.user;
        if (!userId) {
            return resp.status(404).json({ message: "User not found " });
        }
        const adminId = await getAdminId(groupId);
        if (!adminId) {
            console.log("Admin ID = " + adminId + " ,userId = "+userId);
            return resp.status(404).json({ message: "User not admin" });
        }
        if (adminId !== userId) {
            console.log("Admin ID = " + adminId + " ,userId = "+userId);
            return resp.status(401).json({message : "User not admin "});
        }

        const { userToAddId } = req.body;

        if(!userToAddId){
            return resp.status(404).json({message : "User to be added not found "});
        }
        await addUserToGroup(groupId , userToAddId , "member");
        return resp.status(201).json({message : "User added to group"});
    } catch (err) {
        console.log("Error in adding user as group member ...", err.message);
        return resp.status(500).json({ message: "Error in adding the user as member" });
    }
}

module.exports = {
    addGroupMember,
}