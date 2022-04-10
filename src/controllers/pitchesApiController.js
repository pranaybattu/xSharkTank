const Pitches = require("../models/pitches.model");
const Offers = require("../models/offers.model");

//  1
exports.createNewPitch = async(req,res) => {
    console.log("Request body: ", req.body);
    console.log("request made to api 1");
    if(req.body.equity > 100) {
        return res.status(400)
    }
    else {
        let newPitch = {
            entrepreneur: req.body.entrepreneur,

            pitchTitle: req.body.pitchTitle,
            
            pitchIdea: req.body.pitchIdea,
            
            askAmount: req.body.askAmount,
            
            equity: req.body.equity
        };

        Pitches.create(newPitch, (err, newlyCreated) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                console.log("New Pitch", newlyCreated);
                res.status(201).send({id: newlyCreated._id});
            }
        })
    }
};

// 2
exports.postOfferToPitch = async (req, res) => {
    console.log("request made to api 2");
    const id = req.params.id;
    
        await Pitches.findById(id).exec( async (err, pitchRelated) => {
            if(err) {
                return res.status(400).json({error: err})
            }
            // console.log(pitchRelated)
            if(pitchRelated === null) {
                // console.log(pitchRelated)
                return res.status(404).send({err: "id not present"})
            }
            else {
                if(req.body.equity > 100) {
                    return res.status(400)
                }
                const newOffer = new Offers({
                    investor: req.body.investor,
                    amount: req.body.amount,
                    equity: req.body.equity,
                    comment: req.body.comment,
                    pitch: id
                })

                await newOffer.save();
                console.log("new Offer saved")
                await pitchRelated.offers.push(newOffer);

                
                await pitchRelated.save(function(err) {
                    if(err) {
                        console.log(err)
                        res.status(500).send();
                    } else {
                        console.log("offer created Successfully");
                        res.status(201).send({id: newOffer._id});
                    }
                })
            }
        })
};

//3
exports.getAllPitches = async (req,res) => {
    console.log("request made to api 3");
    await Pitches.find({}, {_id: 0})
            .populate('offers','id investor amount equity comment')
            .select('id entrepreneur pitchTitle pitchIdea askAmount equity offers')
            .sort({ date: -1 })
            .exec((err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                }
                // res.json(data);
                res.status(200).send(data);
            })
};

//4
exports.getRequiredPitch = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const isPitchPresent = Pitches.exists({_id: id});
    console.log("request made to api 4");
    await Pitches.findById(id,{_id: 0})
                .populate('offers', '-_id id investor amount equity comment')
                .select('id entrepreneur pitchTitle pitchIdea askAmount equity offers')
                .exec((err, data) => {
                    if(err) {
                        console.log(err);
                        return res.status(400).json({error: err})
                    }
                    else if(!data) {
                        console.log("Pitch Not Found");
                        res.status(404).send({err: "id not present"});
                    }
                    else {
                        // const modifiedData = {
                        //     id: data._id,
                        //     entrepreneur: data.entrepreneur,
                        //     pitchTitle: data.pitchTitle,
                        //     pitchIdea: data.pitchIdea,
                        //     askAmount: data.askAmount,
                        //     equity: data.equity,
                        //     offers: data.offers
                        // }
                        res.status(200).send(data);
                    }
                })
};

