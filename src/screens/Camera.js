import { useRef, useState } from "react";
import { Text, TouchableOpacity ,View } from "react-native";
import { RNCamera } from "react-native-camera"

const Camera = ()=>{
    const cameraRef = useRef(null);
    const [capturedUri, setCapturedUri] = useState(null);
  
    const takePicture = async () => {
      console.log('cameraRef',cameraRef);
  
      if (cameraRef.current) {
        const options = { quality: 0.7, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setCapturedUri(data.uri);
      }
    };
  
    return(
        <View>
        <RNCamera
        ref={cameraRef}
        // style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false}
      />
      <TouchableOpacity onPress={takePicture}>
        <Text>openCamera</Text>
      </TouchableOpacity>
      </View>
    )
}
export default Camera