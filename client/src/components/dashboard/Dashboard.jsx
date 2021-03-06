import React, {useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DashboardActions from './DashboardActions';
import {getCurrentUserProfile} from './../../actions/profile';
import Spinner from './../layout/Spinner'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({
getCurrentUserProfile,
auth: {user},
profile: {
    profile,
    loading
}
}) => {

useEffect(() => {
    getCurrentUserProfile();
}, [])

return loading && profile === null
    ? <Spinner/>
    : <Fragment>
        <h1 className=" large text-primary">Dashboard</h1>
        <p className="lead"><FontAwesomeIcon icon={faUser}/>
            Welcome {user && user.name}</p>
        {profile !== null ? (<Fragment><DashboardActions /></Fragment>) : (<Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>)}
    </Fragment>
}

Dashboard.propTypes = {
getCurrentUserProfile: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({auth: state.auth, profile: state.profile});
const mapDispatchToProps = {
getCurrentUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
