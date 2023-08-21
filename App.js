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

  if (device == null) return <ActivityIndicator />

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        device={device}
        style={StyleSheet.absoluteFill}
        isActive={true}
        preset="medium"
        photo={true}
        video={true}
        audio={true}
      />
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#ff3c3c',
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center'
        }
        }
        onPress={takePicture}>

      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 50,
          alignSelf: 'flex-end'
        }
        }
        onPress={recordVideo}>

      </TouchableOpacity>


      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 50,
          alignSelf: 'flex-start'
        }
        }
        onPress={stopRecording}>

      </TouchableOpacity>
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
