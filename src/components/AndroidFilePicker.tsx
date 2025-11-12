import { Modal, View, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

type PickedFile = { name: string; type?: string; size?: number; dataUri?: string }
type Props = {
  visible: boolean
  onClose: () => void
  onPicked: (file: PickedFile) => void
}

const html = `<!doctype html><html><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width,initial-scale=1'/><style>html,body{height:100%;margin:0;background:transparent}input{position:absolute;inset:0;opacity:0.001}</style></head><body><input id='f' type='file' accept='.epub,.pdf,.txt'/><script>const w=window;const f=document.getElementById('f');const tryOpen=()=>{try{f.click()}catch{}};document.addEventListener('DOMContentLoaded',tryOpen);document.addEventListener('visibilitychange',()=>{if(!document.hidden)tryOpen()});document.addEventListener('pointerdown',tryOpen,{once:true});f.addEventListener('change',()=>{const file=f.files[0];if(!file){w.ReactNativeWebView.postMessage('cancel');return;}const reader=new FileReader();reader.onload=()=>{w.ReactNativeWebView.postMessage(JSON.stringify({name:file.name,type:file.type,size:file.size,dataUri:reader.result}))};reader.readAsDataURL(file)});</script></body></html>`

export function AndroidFilePicker({ visible, onClose, onPicked }: Props) {
  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.hiddenOverlay}>
        <WebView
          source={{ html }}
          onMessage={(e) => {
            try {
              if (e.nativeEvent.data === 'cancel') { onClose(); return }
              const data = JSON.parse(e.nativeEvent.data)
              onPicked(data)
              onClose()
            } catch { onClose() }
          }}
          style={styles.fullscreenWebView}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  hiddenOverlay: { flex: 1 },
  fullscreenWebView: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.02 },
})
