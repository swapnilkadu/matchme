import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import * as MatchmakerActions from '../actions/matchmaker';
export const fields = ['first_name', 'last_name', 'gender', 'gender_preference', 'age_min', 'age_max', 'favoriteColor', 'employed', 'description', 'image_url', 'bday', 'status'];

class ProfileForm extends Component {


  // componentWillUnmount() {
  //   if (this.props.pristine) this.props.destroyForm();
  // }
  videoError(e) {
    console.log('error with video intialization', e);
  }

   takePicture() {
    // http://matthewschrager.com/2013/05/25/how-to-take-webcam-pictures-from-browser-and-store-server-side/
    let canvas = document.querySelector("#picDisplay");
    let video = document.querySelector("#videoElement");
    canvas.width = 624;
    canvas.height = 468;
    canvas.getContext('2d').drawImage(video,0,0);
  
    let imgData = canvas.toDataURL("img/webp");
    // extract data in base 64 encoded webp format
    imgData = imgData.replace('data:image/webp;base64,','');
    let postData = JSON.stringify({imgData: imgData});
    // post to server 
      // ASYNC:
      // writeFile to profilePics
      // 
  };

  uploadPicture() {
    console.log('UPLOAD PIC')
    let reader = new FileReader();
    let canvas = document.querySelector("#picDisplay");
    let background = new Image();
    background.src = "https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg";

    canvas.width = 624;
    canvas.height = 468;

    canvas.getContext('2d').drawImage(background,0,0);
    
  };

  componentDidMount(){
    // http://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm
    let video = document.querySelector("#videoElement");
    function handleVideo(stream) {
      // comment this out and then uncomment to see
      video.src = window.URL.createObjectURL(stream);
    };
    
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
   
    if (navigator.getUserMedia) {       
        navigator.getUserMedia({video: true}, handleVideo, this.videoError);
    }
  };

  render() {
    const videoElementStyle = {
      width: 200,
      height: 'auto',
      // paddingBottom: 50,
      // backgroundColor: '#eee',
      clear: 'all'
    }

    const displayElementStyle = {
      width: 200,
      // height: 200,
      // backgroundColor: '#eee',

      clear: 'all'
    }

    const picButtonStyle = {

      borderRadius: 5,
      float: 'left',
      clear: 'all'
    }

    const formStyle = {

      clear: 'all'

    }

    const {
      fields: {first_name, last_name, gender, gender_preference, age_min, age_max, favoriteColor, employed, description, image_url, bday, status},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <div>
      <div>

        <h4>Option 1. Choose from your existing photos</h4>

          <p>Insert clickable image previews here</p>

        <h4>Option 2. Upload a picture</h4>

          <input type="file" id="myFile" onchange={ () => this.uploadPicture()} />

        <h4>Option 3. Snap the perfect shot now using your device camera!</h4>

          <div>
            <video style={videoElementStyle} autoPlay="true" id="videoElement"></video>
            <canvas style={displayElementStyle} id="picDisplay"></canvas>
          </div>

          <button type="button" style={picButtonStyle} onClick={() => {this.takePicture()}}>Take a new Profile Picture</button>
          <button type="button" style={picButtonStyle} onClick={() => {console.log('clicked')}}>Use as Profile Picture</button>
        
        <br></br>
        <br></br>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div>
          <label>Profile Picture</label>
          <div>
          <img src={image_url.value} />
          </div>
        </div>
        <div>
          <label>First Name</label>
          <div>
            <input type="text" placeholder="First Name" {...first_name} disabled={true}/>
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input type="text" placeholder="Last Name" {...last_name} disabled/>
          </div>
        </div>
        <div>
          <label>Gender</label>
          <div>
            <label>
              <input type="radio" {...gender} value="male" checked={gender.value === 'male'}/> Male
            </label>
            <label>
              <input type="radio" {...gender} value="female" checked={gender.value === 'female'}/> Female
            </label>
          </div>
        </div>
        <div>
          <label>Birthday</label>
          <input type="date" name="bday" max="1997-01-01" {...bday} />
        </div>
        <div>
          <label>Gender Preference</label>
          <div>
            <label>
              <input type="radio" {...gender_preference} value="male" checked={gender_preference.value === 'male'}/> Male
            </label>
            <label>
              <input type="radio" {...gender_preference} value="female" checked={gender_preference.value === 'female'}/> Female
            </label>
            <label>
              <input type="radio" {...gender_preference} value="none" checked={gender_preference.value === 'none' || gender_preference.value === null}/> None
            </label>
          </div>
        </div>
        <div>
          <label>Age Preference</label>
          <div>
            <input type="number" min="18"  {...age_min} placeholder="Min Age" />
            to
            <input type="number" max="100" {...age_max} placeholder="Max Age" />
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <select

              {...favoriteColor}
              value={favoriteColor.value || ''}  // required syntax for reset form to work
                                                 // undefined will not change value to first empty option
                                                 // when resetting
              >
              <option></option>
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </select>
          </div>
        </div>
        <div>
          <label>
            <input type="checkbox" {...status} checked={status.value}/> Want to be Matched?
          </label>
        </div>
        <div>
          <label>Description</label>
          <div>
            <textarea
              {...description}
              value={description.value || ''} // required for reset form to work (only on textarea's)
                                        // see: https://github.com/facebook/react/issues/2533
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'profile',
  fields
},
state => ({ // mapStateToProps
  initialValues: state.user.userInfo, // will pull state into form's initialValues
}),
{}      // mapDispatchToProps (will bind action creator to dispatch)
)(ProfileForm);