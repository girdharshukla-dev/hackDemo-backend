

//this expect a /group/:groupId/add-member
async function addGroupMember(req, resp) {
    try {
        const groupId = req.params.groupId
        if (!groupId) {
            return resp.status(404).json({ message: "No group with the given groupId found" });
        }
        const { id: userId } = req.user;
        if(!userId){
            return resp.status(404).json({message : "User not found "})
        }
        
    }catch(err){
        console.log("Error in adding group member ..." , err.message);
    }
}