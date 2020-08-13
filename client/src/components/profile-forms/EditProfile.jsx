import React, {Fragment, useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {createProfile, getCurrentUserProfile} from './../../actions/profile';
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

const EditProfile = ({history}) => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const loading = useSelector(state => state.profile.loading);

    const [formData,
        setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs,
        toggleSocialInputs] = useState(false);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        dispatch(createProfile(formData, history, true))
    }

    useEffect(() => {
        dispatch(getCurrentUserProfile());
        setFormData({
            company: loading || !profile.company
                ? ''
                : profile.company,
            website: loading || !profile.website
                ? ''
                : profile.website,
            location: loading || !profile.location
                ? ''
                : profile.location,
            status: loading || !profile.status
                ? ''
                : profile.status,
            skills: loading || !profile.skills
                ? ''
                : profile.skills,
            githubusername: loading || !profile.githubusername
                ? ''
                : profile.githubusername,
            bio: loading || !profile.bio
                ? ''
                : profile.bio,
            twitter: loading || !profile.twitter
                ? ''
                : profile.twitter,
            facebook: loading || !profile.facebook
                ? ''
                : profile.facebook,
            linkedin: loading || !profile.linkedin
                ? ''
                : profile.linkedin,
            youtube: loading || !profile.youtube
                ? ''
                : profile.youtube,
            instagram: loading || !profile.instagram
                ? ''
                : profile.instagram
        })
    }, [loading]);

    return (
        <Fragment>
            <h1 className="large text-primary">
                Edit Your Profile
            </h1>
            <p className="lead">
                <FontAwesomeIcon icon="fas fa-user"/>
                Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <select name="status" value={status} onChange={(e) => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={company}
                        onChange={onChange}/>
                    <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={website}
                        onChange={onChange}/>
                    <small className="form-text">Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={onChange}/>
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        value={skills}
                        onChange={onChange}/>
                    <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={onChange}/>
                    <small className="form-text">If you want your latest repos and a Github link, include your username
                    </small>
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        onChange={onChange}
                        value={bio}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type="button"
                        className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && (
                    <Fragment>
                        <div className="form-group social-input">
                            <FontAwesomeIcon icon="fab fa-twitter fa-2x"/>
                            <input
                                onChange={onChange}
                                value={twitter}
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"/>
                        </div>

                        <div className="form-group social-input">
                            <FontAwesomeIcon icon="fab fa-facebook fa-2x"/>
                            <input
                                type="text"
                                onChange={onChange}
                                value={facebook}
                                placeholder="Facebook URL"
                                name="facebook"/>
                        </div>

                        <div className="form-group social-input">
                            <FontAwesomeIcon icon="fab fa-youtube fa-2x"/>
                            <input
                                type="text"
                                onChange={onChange}
                                value={youtube}
                                placeholder="YouTube URL"
                                name="youtube"/>
                        </div>

                        <div className="form-group social-input">
                            <FontAwesomeIcon icon="fab fa-linkedin fa-2x"/>
                            <input placeholder="Linkedin URL" type="text" onChange ={onChange} value={linkedin} name="linkedin"/>
                        </div>

                        <div className="form-group social-input">
                            <FontAwesomeIcon icon="fab fa-instagram fa-2x"/>
                            <input placeholder="Instagram URL" type="text" onChange={onChange} value={instagram} name="instagram"/>
                        </div>
                    </Fragment>
                )}
                <button type="submit" className="btn btn-primary my-1"> Submit</button>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

export default withRouter(EditProfile);
