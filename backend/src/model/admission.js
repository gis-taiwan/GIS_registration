import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AdmissionSchema = Schema({		

	// the user name of an account
	Username: {
		type: String,
		required: true
	},

    // the URL to the answer of the sheet
    responseAddr: {
        type: String,
        required: true
    },

    // The grade of response
    Grading: {
        Paper: [{
            User: String,
            Score: Number
        }],

        Oral: [{
            User: String,
            Score: Number
        }]
    }

}, {
	collection: 'Admission',
	timestamps: true
})

const admission = mongoose.model('admission', AdmissionSchema)

module.exports = admission
