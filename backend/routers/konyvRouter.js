import Konyv from "../models/konyvModel.js"
import express from "express"




const konyvRouter = express.Router()

// Get all posts
konyvRouter.get("/", async (req, res) => {
	
			const konyvek = await Konyv.find()
			res.send(konyvek)

})

konyvRouter.get("/getKonyvById", async (req, res) => {
	
	try{
	const konyv = await Konyv.findById(req.body.konyvId)
	res.send(konyv)
	}catch(error){
	if(!konyv){
		res.status(404).send("Nem található ilyen IDjű könyv!")
	}else{
		res.status(500).send(error.message)
	}
	}	
	

})

konyvRouter.post("/createKonyv", async(req,res)=>{
	const konyv = new Konyv({
			title:req.body.title,
			description:req.body.description
		});
	try {
		await konyv.save()
		res.send(konyv)
	  } catch (error) {
		res.status(500).send(error)
	  }
})

konyvRouter.delete("/deleteKonyv",async(req,res)=>{
	
	if(!req.body.konyvId){
		res.status(400).send("Nincs ID.")
	}

	try{
		await Konyv.deleteOne({ _id: req.body.konyvId })
		res.status(200).send("Könyv sikeresen törölve!")
	}catch(error){
		res.status(500).send(error.message)
	}
})

konyvRouter.patch("/updateKonyv",async(req,res)=>{

		
		Konyv.findByIdAndUpdate(req.body.konyvId, req.body, {new: true}).then((konyv) => {
			if (!konyv) {
				return res.status(404).send();
			}
			res.send(konyv);
		}).catch((error) => {
			res.status(500).send(error);
		})	

})



export default konyvRouter