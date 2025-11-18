import React, {useState} from 'react'
import {Button, Descriptions, DescriptionsProps, Modal} from 'antd'
import {FormType} from '@/common/data_type/form/form'
import {useTranslation} from 'react-i18next';


interface IShowAccessLinkModalProps {
  isVisible: boolean
  formData: FormType
  onClose: any
  style: "basic" | "simple"
}

const ShowAccessLinkModal: React.FC<IShowAccessLinkModalProps> = ((props) => {
  const [isModalOpen, setIsModalOpen] = useState(props.isVisible);
  const {t} = useTranslation();
  let isOpen = props.isVisible
  const handleClose = () => {
    setIsModalOpen(false)
    if (props.onClose) {
      props.onClose()
    }
    return true
  }
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '访问地址',
      children: (<>
        {props.style === "simple" ? <>
          <a
            href={location.protocol + "//" + location.host + location.pathname + "#/viewForm/" + props.formData.formUuid}
            target={"_blank"}>
            {location.protocol}//{location.host + location.pathname} #/viewForm2/{props.formData.formUuid}
          </a>
        </> : <>
          <a
            href={location.protocol + "//" + location.host + location.pathname + "#/viewForm/" + props.formData.formUuid}
            target={"_blank"}>
            {location.protocol}//{location.host + location.pathname} #/viewForm/{props.formData.formUuid}
          </a>
        </>
        }

      </>),
    }
  ]
  return (
    <div>
      <Modal
        width={600}
        height={400}
        title={"查看访问链接"}
        open={isOpen}
        okText={t("common.close")}
        onOk={handleClose}
        onCancel={handleClose}
        okType={"primary"}
        footer={
          <Button type="primary" onClick={handleClose}>
            {t("common.button.close")}
          </Button>
        }

        // footer={[<Button type={'primary'} onClick={() => {
        //   isOpen = false
        //   console.debug("isOpen", isOpen)
        // }
        // }></Button>,
        //   <Button onClick={() => {
        //     isOpen = false
        //     console.debug("isOpen", isOpen)
        //   }
        //   }>
        //   </Button>]}
      >
        <Descriptions title="访问信息" layout="vertical" column={1} bordered items={items}/>
      </Modal>
    </div>
  )
})

export default ShowAccessLinkModal;
