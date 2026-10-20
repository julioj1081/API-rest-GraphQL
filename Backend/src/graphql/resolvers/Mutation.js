import Message from "../../models/Message";

const Mutation = {
    createMessage: async (_, {title, content, author}) =>{
        const newMessage = new Message({title, content, author});
        return await newMessage.save();
    },
    deleteMessage: async (_, {id}) => {
        return await Message.findByIdAndDelete(id);
    },
    updateMessage: async (_, {id, title, content, author}) => {
        return await Message.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true }
        );
    }

}

export default Mutation;