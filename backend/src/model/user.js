import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema({		

	// the user name of an account
	Username: {
		type: String,
		required: true
	},

	// the user email address of an account
	Email: {
		type: String,
		required: true,
		unique: true
	},

	// The account name
	Name: {
		type: String,
		required: true,
	},

	// the encrypted password of an account
	Password: {
		type: String,
		required: true,
	},

	Role: {
		type: String,
		required: true,
	},

	// personal information
	Info: {
		Birthday: Date,
		Gender: {
			type: String,
			enum: ['Male', 'Female', 'Unknown']
		},
		Phone: Number
	},

	// Available Interview Time
	Interview: {
		Avialable: [Number],
		Final: [Number]
	},

	Status: {
		type: String,
		enum: ['Admitted', 'Pending', 'Rejected', 'Admin']
	}

}, {
	collection: 'User',
	timestamps: true
})

const user = mongoose.model('user', UserSchema)

module.exports = user
