import React, {useState, useEffect} from 'react';
import {View, Text,Image, Modal,StyleSheet, Pressable,TouchableOpacity} from 'react-native';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';


const App = () => {
  const [isRecord, setIsRecord] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [textt, setTextt] = useState('');
  const [text1, setText1] = useState(1);
  const [text2, setText2] = useState('problem');
  const buttonLabel = isRecord ? 'Stop' : 'Start';
  
    const voiceLabel = text
    ? text
    : isRecord
    ? ''
    : '';
const voiceButtonText = (text === '' && !isRecord) ? 
    'Press Start Button'
    :(text === '' && isRecord) ?
    'Say something...'
    :(text !== '' && isRecord) ?
    'Press Stop Button' : 'Press Start Button'

// const v = (text === '' && !isRecord) ? 'a':(text === '' && isRecord) ?'b':(text !== '' && isRecord) ?'c ': 'd'
Tts.setDefaultLanguage('fr-FR');
const yu = () => {
  const uu = (text1 === 1) ? 'mon nom est diarra jamila':
  (text1 === 2) ?'je suis la responssable rh de la boite': 
  (text1 === 3) ?'désoler, je ne peux pas vous aider': 
  (text1 === 4) ?'merci et bonne journée a vous':'ok'
  setTextt(uu)
  console.log("okkkkkkkk...........", textt)
}  
// if (text1 === 1) {
//     setTextt('ok')
//   } else if (text1 === 2) {
//     setTextt('problem')
//   }
  const speak = async () => {
    const result = await textt
    Tts.speak(result);
    setText1(text1 + 1)
  }

const onSpeechStart = (event) => {
    console.log('onSpeechStart');
    setText('');
  };
  const onSpeechEnd = () => {
    setIsRecord(false)
    console.log('onSpeechEnd');
  };
  const onSpeechResults = (event) => {
    console.log(' onSpeechResults', event);
    console.log('onSpeechResults');
    setText(event.value[0]);
    speak();
  };
  const onSpeechError = (event) => {
    console.log('onSpeechError');
    console.log(event.error);
  };
const onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
      setModalVisible(!modalVisible);
    } else {
      
      Voice.start('fr-FR'); // languages code e.g 'en-US'
    }
    setIsRecord(!isRecord);
  };
const onSpeechPartialResults = (event) => {
   
    console.log(event.value[0]);
    setText(event.value[0]);
    
  };
const onSpeechVolumeChanged = (event) => {
    //console.log('onSpeechVolumeChanged 3333');
    //console.log(event.value);
  };
useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged
    yu()
return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [textt, text1]);

  return (
       <View style={{flex: 1, alignItems: 'center', backgroundColor:'#ffff',justifyContent: 'center'}}>
       <View style={{flex: 0.7, width: "100%", margin: 10}}>
          <Text style={{color:'black', fontSize:20, top:0, fontWeight:'bold', textAlign: "center"}}>Voice Recognition React Native</Text>
          <View style={{justifyContent:"center", backgroundColor: "red", marginTop: "20%"}}>
            <Text style={{color:'black', textAlign: "center"}}>{voiceLabel}</Text>
          </View>
          

       </View>
       <View style={{backgroundColor: "#3FB65F", flex: 0.3, width: "100%", alignItems: "center"}}>
          <TouchableOpacity
          onPress={onRecordVoice}
            style={{marginTop: "20%"}}>
              <Text style={{color:'#ffff', marginBottom:10}}>{buttonLabel}</Text>
          
            <Image
            style={{ width: 70,
              height: 70,}}
            source={require('./src/mic-removebg-preview.png')}
          />
          </TouchableOpacity>
       </View>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
<TouchableOpacity
          style={{position:'absolute',right:0,
          margin:15}}
      onPress={() => setModalVisible(false)}
      >
          <Image
        style={{
          // alignSelf:'flex-end',
          tintColor:'white',
        height:20, width:20}}
        source={require('./src/close.png')}
      />
      </TouchableOpacity>
           
          <Text style={{color:'#ffff'}}>{voiceLabel}</Text>
<TouchableOpacity
          onPress={onRecordVoice}
        
        style={{
         
          marginTop:10
         
        }}>
        <Text style={{color:'#ffff', marginBottom:10}}>{buttonLabel}</Text>
        <Image
        style={{}}
        tintColor='red'
        source={require('./src/mic.jpg')}
      />
      </TouchableOpacity>
      <Text style={{ color:'#ffff', marginTop:5}}>{voiceButtonText}</Text>
      <Text style={{position:'absolute', bottom:15,color:'#ffff'}}>English (United States)
      </Text>
          </View>
        </View>
      </Modal>
</View>
  );
};

const styles = StyleSheet.create({
   centeredView: {
    flex: 1,
   // justifyContent: "center",
    alignItems: "center",
    //marginTop: 22

  },
  modalView: {
    //margin: 20,
    backgroundColor: "#3FB65F",
   borderRadius: 10,
   maxHeight:'100%',
   padding: 35,
    paddingBottom:100,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,
    width:'100%',
    bottom:0,
    position:'absolute',
    alignItems: "center",
 
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
