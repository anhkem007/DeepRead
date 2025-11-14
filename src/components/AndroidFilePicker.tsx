import { Modal } from 'react-native'
import { useEffect } from 'react'
import DocumentPicker, { isCancel, types } from 'react-native-document-picker'


type PickedFile = { name: string; type?: string; ext?: string; base64?: string; size?: number; dataUri?: string; uri?: string; fileCopyUri?: string }
type Props = {
  visible: boolean
  onClose: () => void
  onPicked: (file: PickedFile) => void
}

export function AndroidFilePicker({ visible, onClose, onPicked }: Props) {
  useEffect(() => {
    const run = async () => {
      try {
        const res = await DocumentPicker.pickSingle({
          type: [types.pdf, types.plainText, 'application/epub+zip', types.allFiles],
          presentationStyle: 'fullScreen',
          copyTo: 'cachesDirectory',
        })
        const name = res.name || ''
        const ext = name.toLowerCase().split('.').pop()
        onPicked({ name: res.name || 'Unknown', type: res.type ?? '', ext, size: res.size as any, uri: res.uri, fileCopyUri: res.fileCopyUri || undefined })
        onClose()
      } catch (e) {
        if (isCancel(e)) { onClose(); return }
        onClose()
      }
    }
    if (visible) run()
  }, [visible, onClose, onPicked])

  return <Modal visible={visible} transparent onRequestClose={onClose} />
}
