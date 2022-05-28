import mongoose from "mongoose"

const Konyv = mongoose.Schema({
	title: String,
	description: String,
},{
	versionKey: false
})

export default mongoose.model('Konyv', Konyv,'Konyv')