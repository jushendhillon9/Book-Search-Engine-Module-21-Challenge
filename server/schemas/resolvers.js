const { signToken, AuthenticationError } = require("../utils/auth")
const { User } = require("../models");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            try {
                if (context.user) {
                    return await User.findOne({ _id: context.user._id });
                }
            }
            catch (err) {
                console.log(err)
                throw AuthenticationError;
            }
        }
    },
    Mutation: {
        saveBook: async (parent, { book }, context) => {
            try {
                //use findOneAndUpdate() to store updated user as return value
                const user = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: {savedBooks: { ...book } } },
                    { new: true },
                )
                return user;
            }
            catch (err) {
                console.log(err);
                throw AuthenticationError;
            }
        },
        deleteBook: async (parent, { bookID }, context) => {
            try {
                const deletedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: bookID} } },
                    { new: true }
                );
                return deletedUser;
            }
            catch (err) {
                console.log(err);
                throw AuthenticationError;
            }
        },
        createUser: async (parent, { username, email, password }) => {
            try {
                const user = await User.create({username, email, password});
                const token = signToken(user);
                return {token, user}
            }
            catch (err) {
                console.log(err);
                throw AuthenticationError;
            }
        },
        login: async (parent, {email, password}, context) => {
            try {
                const user = await User.findOne({email: email})
                const correctPw = await user.isCorrectPassword(password);
                const token = signToken(user);
                if (correctPw) {
                    return {token, user};
                }
                else {
                    throw AuthenticationError;
                }
            }
            catch (err) {
                console.log(err)
                throw AuthenticationError;
            }
        }
    }
}

module.exports = resolvers;