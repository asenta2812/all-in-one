import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Image, message, Modal, Space, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { memo, useState } from 'react'

interface UploadImagesProps {
  fileList: UploadFile[]
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>
}

const UploadImages: React.FC<UploadImagesProps> = ({
  fileList,
  setFileList,
}) => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState('')

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const getUrlPreview = (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = URL.createObjectURL(file.originFileObj)
    }
    return file.url || (file.preview as string)
  }
  const handlePreview = (file: UploadFile) => {
    const urlPreview = getUrlPreview(file)

    setPreviewImage(urlPreview)
    setPreviewVisible(true)
  }
  const handleCancel = () => {
    setPreviewVisible(false)
  }
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const beforeUpload = (file: RcFile) => {
    if (fileList && fileList.length > 0) {
      const index = fileList.findIndex(
        (f) => f.name === file.name && f.size === file.size
      )
      if (index !== -1) {
        return false || Upload.LIST_IGNORE
      }
    }

    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('Image must smaller than 2MB!')
    }

    return (isJpgOrPng && isLt5M) || Upload.LIST_IGNORE
  }

  const MaskPreview = ({ preview, remove }: any) => (
    <Space>
      <EyeOutlined style={{ fontSize: '1.2rem' }} onClick={preview} />
      <DeleteOutlined style={{ fontSize: '1.2rem' }} onClick={remove} />
    </Space>
  )
  return (
    <>
      <Upload
        name="upload-note-images"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept=".png,.jpg,.gif,.jpeg"
        beforeUpload={beforeUpload}
        customRequest={() => null}
        multiple
        itemRender={(__, file, _, { preview, remove }) => (
          <Image
            preview={{
              visible: false,
              mask: <MaskPreview preview={preview} remove={remove} />,
            }}
            src={getUrlPreview(file)}
            alt="preview image"
            width="100%"
            height="100%"
          />
        )}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title="Preview Image"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default memo(UploadImages)
