import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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
        {profile !== null ? (<Fragment>Profile Exists</Fragment>) : (<Fragment>No profile</Fragment>)}
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
