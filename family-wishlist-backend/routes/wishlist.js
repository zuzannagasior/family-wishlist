const router = require('express').Router();
let Gift = require('../models/gift.model');

router.route('/all/:id').get((req, res) => {
    Gift.find({ userId: req.params.id })
    .then(gifts => res.json(gifts))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const userId = req.body.userId;
    const gift = req.body.gift;
    const giftLink = req.body.giftLink;
    const whoBuysName = "";

    const newGift = new Gift({
        userId,
        gift,
        giftLink,
        whoBuysName
    });

    newGift.save()
        .then(() => res.json('Gift added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {

    Gift.findById(req.params.id)
        .then(gift => 
            {
                gift.gift = req.body.gift;
                gift.giftLink = req.body.giftLink;

                gift.save()
                    .then(() => res.json('Gift updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Gift.findByIdAndDelete(req.params.id)
        .then(() => res.json('Gift deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/who-buys').post((req, res) => {
    const giftId = req.body.giftId;
    const whoBuysName = req.body.whoBuysName;

    Gift.findById(giftId)
    .then(gift => 
        {
            gift.whoBuysName = whoBuysName;

            gift.save()
                .then(() => res.json('Person who buys gift is added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/who-buys/:id').delete((req, res) => {
    Gift.findById(req.params.id)
    .then(gift => 
        {
            gift.whoBuysName = "";

            gift.save()
                .then(() => res.json('Person who buys gift is deleted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;