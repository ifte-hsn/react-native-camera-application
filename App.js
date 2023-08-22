import React, { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { Camera, useCameraDevices } from "react-native-vision-camera";

const App = () => {
  const camera = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState(null);
  const [mode, setMode] = useState('photo');
  const [media, setMedia] = useState(null);




  const devices = useCameraDevices()
  const device = devices.back



  useEffect(() => {
    checkPermission();
  }, []);


  const checkPermission = async () => {

    try {
      const newCameraPermission = await Camera.requestCameraPermission()
      const newMicrophonePermission = await Camera.requestMicrophonePermission()

      console.log(newCameraPermission);

    } catch (error) {
      console.log(error)
    }

  }


  const takePicture = async () => {
    const photo = await camera.current.takePhoto()
    console.log(photo.path)
  }

  const recordVideo = async () => {
    const video = camera.current.startRecording({
      flash: 'on',
      onRecordingFinished: (video) => console.log(video),
      onRecordingError: (error) => console.error(error),
    })
  }

  const stopRecording = async () => {
    camera.current.stopRecording()
  }



  const handleCaptureButtonPress = async () => {
    console.log(mode)
    if (mode === 'photo') {
      // Capture photo
      try {
        const photo = await camera.current.takePhoto();
        console.log(photo)
        setMedia(photo);
      } catch (error) {
        console.log(error);
      }
    } else if (mode === 'video') {
      try {
        if (isRecording) {
          console.log(isRecording)
          // Stop recording
          camera.current.stopRecording();
          // setMedia(videoFile);
          setIsRecording(false);
        } else {
          // Start recording
          // await camera.current.startRecording();
          // setIsRecording(true);

          const video = camera.current.startRecording({
            flash: 'on',
            onRecordingFinished: (video) => console.log(video),
            onRecordingError: (error) => console.error(error),
          })

          console.log(video)
          setIsRecording(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (device == null) return <ActivityIndicator />

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        device={device}
        style={{ flex: 1 }}
        isActive={true}
        preset="medium"
        onInitialized={() => console.log('Camera initialized!')}
        photo={mode === 'photo'}
        video={mode === 'video'}
        audio={mode === 'video'}
      />

      {mode == "photo" && (
        <Button
          title={isRecording ? 'Stop Recording' : 'Capture'}
          onPress={() => handleCaptureButtonPress(camera.current)}
        />
      )}

      {mode == "video" && (
        <Button
          title={isRecording ? 'Stop Recording' : 'Record'}
          onPress={handleCaptureButtonPress}
        />
      )}

      <Button
        title="Switch Mode"
        onPress={() => setMode((prevMode) => (prevMode === 'photo' ? 'video' : 'photo'))}
      />
    </View>
  );
};

const styles = {
  camera: {
    width: 200,
    height: 200,
  },
};

export default App;
