const express = require('express');
const router = express.Router();
const auth = require('./../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//  @route GET api/profile/me @desc Get current users profile @access PRIVATE
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile
            .findOne({user: req.user.id})
            .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res
                .status(400)
                .json({msg: 'There is no profile for this user'})
        }
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res
            .status(500)
            .send('Server Error');
    }
});

//  @route Post api/profile @desc Create or update user profile @access PRIVATE
router.post('/', [
    auth,
    [
        check('status', 'Status is required')
            .not()
            .isEmpty(),
        check('skills', 'Skills is required')
            .not()
            .isEmpty()
    ]
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array()
            });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build profile object
    const profileFields = {
        user: req.user.id
    };
    if (company) 
        profileFields.company = company;
    if (website) 
        profileFields.website = website;
    if (location) 
        profileFields.location = location;
    if (bio) 
        profileFields.bio = bio;
    if (status) 
        profileFields.status = status;;
    if (githubusername) 
        profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills
            .split(",")
            .map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) 
        profileFields.social.youtube = youtube;
    if (facebook) 
        profileFields.social.facebook = facebook;
    if (twitter) 
        profileFields.social.twitter = twitter;
    if (instagram) 
        profileFields.social.instagram = instagram;
    if (linkedin) 
        profileFields.social.linkedin = linkedin;
    
    try {
        let profile = await Profile.findOne({user: req.user.id});
        // Update if profile is existed
        if (profile) {
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {new: true});
            return res.json(profile);
        }
        // Create a profile if it is not existed
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res
            .status(500)
            .send('Server Error');
    }

});

//  @route Get api/profile @desc Get all profiles  @access PUBLIC
router.get('/', async(req, res) => {
    try {
        const profiles = await Profile
            .find()
            .populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res
            .status(500)
            .send('Server Error');
    }
});

//  @route Get api/profile/user/:user_id @desc Get  profile by user id  @access
// PUBLIC
router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await Profile
            .findOne({user: req.params.user_id})
            .populate('user', ['name', 'avatar']);
        if (!profile) 
            return res.status(400).json({msg: 'Profile not found'});
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res
                .status(400)
                .json({msg: 'Profile not found'});
        }
        res
            .status(500)
            .send('Server Error');
    }
});

//  @route Delete api/profile @desc Delete profile, user & posts  @access PRIVATE
router.delete('/', auth, async(req, res) => {
    try {
        //  @todo - remove users Posts Remove Profile
        await Profile.findOneAndRemove({user: req.user.id});
        // Remove User
        await User.findOneAndRemove({user: req.user.id});

        res.json({msg: 'User deleted successfully'});
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res
                .status(400)
                .json({msg: 'Profile not found'});
        }
        res
            .status(500)
            .send('Server Error');
    }
});

//  @route Put api/profile/experience @desc Add profile Experience, user & posts  @access PRIVATE
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {title,company,location,from,to,current,description} = req.body;
    const newExp = {title,company,location,from,to,current,description};
    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;